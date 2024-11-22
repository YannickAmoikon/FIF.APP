"use client";

import {useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Toaster} from "@/components/ui/toaster";
import {SearchInput} from "@/components/app/SearchInput";
import {ElectionTable} from "@/components/features/election/ElectionTable";
import CreateElectionDialog from "@/components/features/election/CreateElectionDialog";
import FilterButton from "@/components/app/FilterButton";
import ExportButton from "@/components/app/ExportButton";
import {useGetElectionsQuery} from "@/services/election.services";
import {useToast} from "@/hooks/use-toast";
import {Loader} from "@/components/app/Loader";
import {NoDataContent} from "@/components/app/NoDataContent";
import * as XLSX from "xlsx";
import {jsPDF} from "jspdf";
import "jspdf-autotable";

// Interfaces pour une élection
interface Election {
    id: number;
    date_time_start: string;
    date_time_end: string;
    title: string;
    description: string;
    type_id: number;
    statut: "coming" | "in_progress" | "ended";
    type: "Private" | "Public" | "Mixt";
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

interface ElectionResponse {
    message: string;
    data: Election[];
    totalElections: number;
    page: number;
    totalPages: number;
}

export default function ElectionPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    //@ts-ignore
    const {data, isLoading} = useGetElectionsQuery<ElectionResponse>(currentPage);
    const {toast} = useToast();

    const filterOptions = [
        {label: "Tous", value: "all", onClick: () => setActiveFilter(null)},
        {label: "Privé", value: "Private", onClick: () => setActiveFilter("Private")},
        {label: "Public", value: "Public", onClick: () => setActiveFilter("Public")},
        {label: "Mixte", value: "Mixt", onClick: () => setActiveFilter("Mixt")},
    ];

    // Appliquer la recherche et le filtre
    //@ts-ignore
    const filteredElections = data?.data.filter((election) => {
        const matchesSearch = searchTerm
            ? election.title.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

        const matchesFilter = activeFilter
            ? election.type === activeFilter
            : true;

        return matchesSearch && matchesFilter;
    }) || [];

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleExportExcel = () => {
        try {
            if (!filteredElections.length) return;
//@ts-ignore
            const exportData = filteredElections.map((election) => ({
                ID: election.id,
                Titre: election.title,
                Type: election.type,
                "Date de début": new Date(election.date_time_start).toLocaleString(),
                "Date de fin": new Date(election.date_time_end).toLocaleString(),
                Statut: election.statut,
                Description: election.description,
            }));

            const ws = XLSX.utils.json_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Elections");
            XLSX.writeFile(wb, "elections.xlsx");

            toast({
                title: "Succès",
                description: "Export Excel réussi",
                className: "bg-green-600 text-white",
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Erreur lors de l'export Excel",
                variant: "destructive",
            });
        }
    };

    const handleExportPDF = () => {
        try {
            if (!filteredElections.length) return;

            const doc = new jsPDF();

            const tableColumn = ["ID", "Titre", "Type", "Date début", "Date fin", "Statut"];
            //@ts-ignore
            const tableRows = filteredElections.map((election) => [
                election.id,
                election.title,
                election.type,
                new Date(election.date_time_start).toLocaleString(),
                new Date(election.date_time_end).toLocaleString(),
                election.statut,
            ]);
//@ts-ignore
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
            });

            doc.save("elections.pdf");

            toast({
                title: "Succès",
                description: "Export PDF réussi",
                className: "bg-green-600 text-white",
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Erreur lors de l'export PDF",
                variant: "destructive",
            });
        }
    };

    return (
        <main className="flex flex-1 h-full">
            <Toaster/>
            <Card className="flex-1 bg-secondary rounded-none shadow-none border-0 flex flex-col">
                <CardHeader className="border-b-2">
                    <CardTitle className="uppercase">Élections</CardTitle>
                    <CardDescription>Gestion des élections</CardDescription>
                </CardHeader>

                <CardContent className="p-6 flex-1 space-y-10">
                    <div className="flex items-center justify-between mb-4">
                        <SearchInput
                            onChange={handleSearch}
                            value={searchTerm}
                            placeholder="Rechercher une élection..."
                        />
                        <div className="flex space-x-2">
                            <FilterButton options={filterOptions}/>
                            <ExportButton onExportExcel={handleExportExcel} onExportPDF={handleExportPDF}/>
                            <CreateElectionDialog/>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-[400px]">
                            <Loader/>
                        </div>
                    ) : filteredElections.length === 0 ? (
                        <div className="">
                            <NoDataContent type="élections" searchValue={searchTerm}/>
                        </div>
                    ) : (
                        <ElectionTable data={filteredElections}/>
                    )}
                </CardContent>

                {
                    //@ts-ignore
                    data?.totalElections > 0 && (
                        <CardFooter className="mt-auto border-t py-4 px-6">
                            <div className="w-full flex justify-between items-center">
                                <div className="text-sm text-muted-foreground">
                                    Affichage de {filteredElections.length} sur {
                                    //@ts-ignore
                                    data.totalElections} élections
                                </div>
                                {/* Pagination */}
                                {/* Pagination buttons */}
                            </div>
                        </CardFooter>
                    )}
            </Card>
        </main>
    );
}

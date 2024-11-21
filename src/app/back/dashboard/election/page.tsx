"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Toaster} from '@/components/ui/toaster';
import {SearchInput} from '@/components/app/SearchInput';
import {ElectionTable} from '@/components/features/election/ElectionTable';
import CreateElectionDialog from "@/components/features/election/CreateElectionDialog";
import {useState} from "react";
import FilterButton from "@/components/app/FilterButton";
import ExportButton from "@/components/app/ExportButton";
import {useGetElectionsQuery} from "@/services/election.services";
import {useToast} from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader } from "@/components/app/Loader";
import { NoDataContent } from '@/components/app/NoDataContent';

// Interface pour une élection individuelle
interface Election {
    id: number;
    date_time_start: string;
    date_time_end: string;
    title: string;
    description: string;
    type_id: number;
    statut: 'coming' | 'in_progress' | 'ended';
    type: 'Private' | 'Public' | 'Mixt';
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

// Interface pour la réponse de l'API
interface ElectionResponse {
    message: string;
    data: Election[];
    totalElections: number;
    page: number;
    totalPages: number;
}

export default function ElectionPage() {
    const [currentPage, setCurrentPage] = useState(1);
    //@ts-ignore
    const { data, isLoading } = useGetElectionsQuery<ElectionResponse>(currentPage);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const {toast} = useToast();
//@ts-ignore
    const elections: Election[] = data?.data || [];

    const filterOptions = [
        {
            label: "Tous",
            value: "all",
            onClick: () => {
                setActiveFilter(null);
                setCurrentPage(1);
            }
        },
        {
            label: "Privé",
            value: "Private",
            onClick: () => {
                setActiveFilter("Private");
                setCurrentPage(1);
            }
        },
        {
            label: "Public",
            value: "Public",
            onClick: () => {
                setActiveFilter("Public");
                setCurrentPage(1);
            }
        },
        {
            label: "Mixte",
            value: "Mixt",
            onClick: () => {
                setActiveFilter("Mixt");
                setCurrentPage(1);
            }
        }
    ];

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleExportExcel = () => {
        try {
            //@ts-ignore
            if (!data?.data) return;
            //@ts-ignore
            const exportData = data.data.map(election => ({
                ID: election.id,
                Titre: election.title,
                Type: election.type,
                "Date de début": new Date(election.date_time_start).toLocaleString(),
                "Date de fin": new Date(election.date_time_end).toLocaleString(),
                Statut: election.statut,
                Description: election.description
            }));

            const ws = XLSX.utils.json_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Elections");
            XLSX.writeFile(wb, "elections.xlsx");

            toast({
                title: "Succès",
                description: "Export Excel réussi",
                className: "bg-green-600"
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Erreur lors de l'export Excel",
                variant: "destructive"
            });
        }
    };

    const handleExportPDF = () => {
        try {
            //@ts-ignore
            if (!data?.data) return;

            const doc = new jsPDF();
            
            const tableColumn = ["ID", "Titre", "Type", "Date début", "Date fin", "Statut"];
            //@ts-ignore
            const tableRows = data.data.map(election => [
                election.id,
                election.title,
                election.type,
                new Date(election.date_time_start).toLocaleString(),
                new Date(election.date_time_end).toLocaleString(),
                election.statut
            ]);

            // @ts-ignore
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
            });

            doc.save('elections.pdf');

            toast({
                title: "Succès",
                description: "Export PDF réussi",
                className: "bg-green-600"
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Erreur lors de l'export PDF",
                variant: "destructive"
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

                <CardContent className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <SearchInput 
                            onChange={handleSearch}
                            value={searchTerm}
                            placeholder="Rechercher une élection..."
                        />
                        <div className="flex space-x-2">
                            <FilterButton options={filterOptions} />
                            <ExportButton 
                                onExportExcel={handleExportExcel}
                                onExportPDF={handleExportPDF}
                            />
                            <CreateElectionDialog/>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-[400px]">
                            <Loader />
                        </div>
                    ) : (!elections.length) ? (
                        <NoDataContent 
                            type="élections"
                            searchValue={searchTerm}
                        />
                    ) : (
                        //@ts-ignore
                        <ElectionTable data={elections} />
                    )}
                </CardContent>

                {!isLoading && elections.length > 0 && (
                    <CardFooter className="mt-auto border-t py-4 px-6">
                        <div className="w-full flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                                Affichage de {elections.length} sur {
                                    //@ts-ignore
                                data?.totalElections} élections

                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 rounded-sm hover:bg-secondary border hover:text-gray-900 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Préc
                                </Button>

                                <div className="flex items-center gap-1">
                                    {Array.from({
                                        //@ts-ignore
                                         length: data.totalPages }, (_, i) => i + 1).map((pageNum) => (
                                        <Button
                                            key={pageNum}
                                            variant={pageNum === currentPage ? "default" : "secondary"}
                                            size="sm"
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-8 h-8 p-0 rounded-sm ${
                                                pageNum === currentPage 
                                                    ? "bg-secondary border hover:bg-secondary text-gray-900" 
                                                    : "hover:bg-secondary hover:text-secondary"
                                            }`}
                                        >
                                            {pageNum}
                                        </Button>
                                    ))}
                                </div>

                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={
                                        //@ts-ignore
                                        currentPage >= data.totalPages}
                                    className="px-4 rounded-sm hover:bg-secondary border hover:text-gray-900 transition-colors"
                                >
                                    Suiv
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </main>
    );
}
"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Toaster} from '@/components/ui/toaster';
import {SearchInput} from '@/components/app/SearchInput';
import {ElectionTable} from '@/components/features/election/ElectionTable';
import {Pagination} from '@/components/ui/pagination';
import CreateElectionDialog from "@/components/features/election/CreateElectionDialog";
import {useState, useMemo} from "react";
import FilterButton from "@/components/app/FilterButton";
import ExportButton from "@/components/app/ExportButton";
import {useGetElectionsQuery} from "@/services/election.services";
import {useToast} from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { BookMarked, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader } from "@/components/app/Loader";

export default function ElectionPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;
    const { data, isLoading } = useGetElectionsQuery();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const {toast} = useToast();

    // Options de filtrage
    const filterOptions = [
        {
            label: "Tous",
            value: "all",
            onClick: () => setActiveFilter(null)
        },
        {
            label: "Privé",
            value: "Private",
            onClick: () => setActiveFilter("Private")
        },
        {
            label: "Public",
            value: "Public",
            onClick: () => setActiveFilter("Public")
        },
        {
            label: "Mixte",
            value: "Mixt",
            onClick: () => setActiveFilter("Mixt")
        }
    ];

    // Filtrer les données
    const filteredData = useMemo(() => {
        if (!data?.data) return [];
        
        let filtered = [...data.data];
        
        // Appliquer le filtre de recherche
        if (searchTerm) {
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Appliquer le filtre de type
        if (activeFilter) {
            filtered = filtered.filter(item => item.type === activeFilter);
        }

        return filtered;
    }, [data?.data, searchTerm, activeFilter]);

    // Calculer les éléments de la page courante
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage]);

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    // Gestionnaire de changement de page
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Fonctions d'export
    const handleExportExcel = () => {
        try {
            if (!data?.data) return;
            
            const exportData = data.data.map(election => ({
                ID: election.id,
                Titre: election.title,
                Type: election.type,
                "Date de début": new Date(election.dateTimeStart).toLocaleString(),
                "Date de fin": new Date(election.dateTimeEnd).toLocaleString(),
                Statut: election.status,
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
            if (!data?.data) return;

            const doc = new jsPDF();
            
            const tableColumn = ["ID", "Titre", "Type", "Date début", "Date fin", "Statut"];
            const tableRows = data.data.map(election => [
                election.id,
                election.title,
                election.type,
                new Date(election.dateTimeStart).toLocaleString(),
                new Date(election.dateTimeEnd).toLocaleString(),
                election.status
            ]);
            //@ts-ignore
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

    // Gestionnaire de recherche
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1); // Réinitialiser la page lors d'une nouvelle recherche
    };

    const NoDataContent = () => (
        <div className="bg-secondary border border-gray-200 p-6 rounded-sm">
            <div className="flex items-center justify-center flex-col text-center">
                <BookMarked className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium mb-2">
                    {searchTerm || activeFilter 
                        ? "Aucune élection ne correspond à vos critères de recherche."
                        : "Aucune élection n'est disponible."}
                </p>
                <p className="text-sm text-gray-500">
                    {searchTerm || activeFilter 
                        ? "Essayez de modifier vos filtres ou votre recherche"
                        : "Cliquez sur le bouton + pour créer une nouvelle élection"}
                </p>
            </div>
        </div>
    );

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
                    ) : (!data?.data || filteredData.length === 0) ? (
                        <NoDataContent />
                    ) : (
                        <ElectionTable data={currentItems} />
                    )}
                </CardContent>

                {!isLoading && data?.data && filteredData.length > 0 && (
                    <CardFooter className="mt-auto border-t py-4 px-6">
                        <div className="w-full flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                                Affichage de {currentItems.length} sur {filteredData.length} élections
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
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                        <Button
                                            key={pageNum}
                                            variant={pageNum === currentPage ? "default" : "secondary"}
                                            size="sm"
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-8 h-8 p-0 rounded-sm ${
                                                pageNum === currentPage 
                                                    ? "bg-orange-500 hover:bg-green-600 text-primary-foreground" 
                                                    : "hover:bg-green-500 hover:text-green-500"
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
                                    disabled={currentPage >= totalPages}
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
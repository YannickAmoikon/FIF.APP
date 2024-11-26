"use client";
import { Toaster } from "@/components/ui/toaster";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchInput } from "@/components/app/SearchInput";
import ExportButton from "@/components/app/ExportButton";
import CreatePollDialog from "@/components/features/poll/CreatePollDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FilterButton from "@/components/app/FilterButton";
import { PollTable } from "@/components/features/poll/PollTable";
import { useGetPollsQuery } from "@/services/poll.services";
import { Loader } from "@/components/app/Loader";
import { NoDataContent } from "@/components/app/NoDataContent";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { PollResponse, PollType } from "@/types/poll.types";

export default function PollsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  //@ts-ignore
  const { data, isLoading } = useGetPollsQuery<PollResponse>(currentPage);
  const { toast } = useToast();

  const filterOptions = [
    { label: "Tous", value: "all", onClick: () => setActiveFilter(null) },
    {
      label: "Privé",
      value: "Private",
      onClick: () => setActiveFilter("Private"),
    },
    {
      label: "Public",
      value: "Public",
      onClick: () => setActiveFilter("Public"),
    },
    { label: "Mixte", value: "Mixt", onClick: () => setActiveFilter("Mixt") },
  ];

  // Appliquer la recherche et le filtre
  const filteredPolls =
    //@ts-ignore
    data?.data.filter((poll: PollType) => {
      const matchesSearch = searchTerm
        ? poll.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesFilter = activeFilter ? poll.type === activeFilter : true;

      return matchesSearch && matchesFilter;
    }) || [];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleExportExcel = () => {
    try {
      if (!filteredPolls.length) return;

      const exportData = filteredPolls.map((poll: PollType) => ({
        ID: poll.id,
        Titre: poll.title,
        "Date de début": new Date(poll.dateDebut).toLocaleString(),
        "Date de fin": new Date(poll.dateFin).toLocaleString(),
        Statut: poll.is_active ? "Actif" : "Terminé",
        Description: poll.description,
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sondages");
      XLSX.writeFile(wb, "sondages.xlsx");

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
      if (!filteredPolls.length) return;

      const doc = new jsPDF();

      const tableColumn = ["ID", "Titre", "Date début", "Date fin", "Statut"];

      const tableRows = filteredPolls.map((poll: PollType) => [
        poll.id,
        poll.title,
        new Date(poll.dateDebut).toLocaleString(),
        new Date(poll.dateFin).toLocaleString(),
        poll.is_active ? "Actif" : "Terminé",
      ]);
      //@ts-ignore
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
      });

      doc.save("sondages.pdf");

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
      <Toaster />
      <Card className="flex-1 bg-secondary rounded-none shadow-none border-0 flex flex-col">
        <CardHeader className="border-b-2">
          <CardTitle className="uppercase">Sondages</CardTitle>
          <CardDescription>Gestion des sondages</CardDescription>
        </CardHeader>

        <CardContent className="p-6 flex-1 space-y-10">
          <div className="flex items-center justify-between mb-4">
            <SearchInput
              onChange={handleSearch}
              value={searchTerm}
              placeholder="Rechercher un sondage..."
            />
            <div className="flex space-x-2">
              <FilterButton options={filterOptions} />
              <ExportButton
                onExportExcel={handleExportExcel}
                onExportPDF={handleExportPDF}
              />
              <CreatePollDialog />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-[400px]">
              <Loader />
            </div>
          ) : filteredPolls.length === 0 ? (
            <NoDataContent type="sondages" searchValue={searchTerm} />
          ) : (
            <PollTable data={filteredPolls} />
          )}
        </CardContent>
        {
          //@ts-ignore
          data?.totalSondages > 0 && (
            <CardFooter className="mt-auto border-t py-4 px-6">
              <div className="w-full flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Affichage de {filteredPolls.length} sur sondages{" "}
                  {
                    //@ts-ignore
                    data.totalSondages
                  }{" "}
                  sondages
                </div>
                {/* Pagination - to be implemented */}
              </div>
            </CardFooter>
          )
        }
      </Card>
    </main>
  );
}

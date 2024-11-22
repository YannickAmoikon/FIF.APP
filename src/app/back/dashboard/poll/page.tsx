"use client"

import {Toaster} from "@/components/ui/toaster";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {SearchInput} from "@/components/app/SearchInput";
import ExportButton from "@/components/app/ExportButton";
import CreatePollDialog from "@/components/features/poll/CreatePollDialog";
import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import FilterButton from "@/components/app/FilterButton";
import {PollTable} from "@/components/features/poll/PollTable";


export default function PollsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const {toast} = useToast();


    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    function handleExportExcel() {

    }

    function handleExportPDF() {

    }


    return (
        <main className="flex flex-1 bg-secondary  h-full">
            <Toaster/>
            <Card className="flex-1 bg-secondary  rounded-none shadow-none border-0">
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
                            <FilterButton options={[]}/>
                            <ExportButton onExportExcel={handleExportExcel} onExportPDF={handleExportPDF}/>
                            <CreatePollDialog/>
                        </div>
                    </div>
                    <PollTable data={[]}/>
                </CardContent>
            </Card>
        </main>
    )
}
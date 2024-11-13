"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';
import { SearchInput } from '@/components/app/SearchInput';
import { ElectionTable } from '@/components/features/election/ElectionTable';
import { Pagination } from '@/components/ui/pagination';
import CreateElectionDialog from "@/components/features/election/CreateElectionDialog";
import {useState} from "react";
import ExportElection from "@/components/features/election/ExportElection";
import FilterElection from "@/components/features/election/FilterElection";

export default function ElectionPage() {
    const [searchTerm, setSearchTerm] = useState("")
    return (
        <main className="flex flex-1 h-full">
            <Toaster />
            <Card className="flex-1 bg-secondary  rounded-none shadow-none border-0">
                <CardHeader className="border-b-2">
                    <CardTitle className="uppercase">Élections</CardTitle>
                    <CardDescription>Gestion des élections</CardDescription>
                </CardHeader>

                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">

                        <SearchInput onChange= {searchTerm} value={searchTerm} />
                       <div className="flex space-x-2">
                           <FilterElection/>
                           <ExportElection/>
                           <CreateElectionDialog/>
                       </div>
                    </div>

                    <ElectionTable />
                </CardContent>

                <CardFooter className="flex justify-between items-center border-t py-4">
                    <div className="text-sm text-muted-foreground">
                        Affichage des élections
                    </div>
                    <Pagination />
                </CardFooter>
            </Card>
        </main>
    );
}
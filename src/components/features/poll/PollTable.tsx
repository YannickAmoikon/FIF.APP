import React from 'react';
import {Table, TableBody, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {PollRow} from "@/components/features/poll/PollRow";

interface PollTableProps {
    data: [];
}

export const PollTable: React.FC<PollTableProps> = ({data = []}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left w-[10%]">#ID</TableHead>
                    <TableHead className="text-left w-[30%]">Titre</TableHead>
                    <TableHead className="text-left w-[10%]">Type</TableHead>
                    <TableHead className="text-left w-[15%]">Date début</TableHead>
                    <TableHead className="text-left w-[15%]">Date fin</TableHead>
                    <TableHead className="text-center w-[10%]">Statut</TableHead>
                    <TableHead className="text-right w-[10%]">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <PollRow
                    //@ts-ignore
                    polls={data}/>
            </TableBody>
        </Table>
    );
};
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ElectionRow } from '@/components/features/election/ElectionRow';
import { ElectionTypes } from '@/types/election.types';

interface ElectionTableProps {
    data: ElectionTypes[];
}

export const ElectionTable: React.FC<ElectionTableProps> = ({ data = [] }) => {
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
                <ElectionRow
                //@ts-ignore
                 elections={data} />
            </TableBody>
        </Table>
    );
};
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ElectionRow } from '@/components/features/election/ElectionRow';

export const ElectionTable = () => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[10%] text-left">ID</TableHead>
                <TableHead className="w-[30%] text-left">Titre</TableHead>
                <TableHead className="w-[10%] text-left">Type</TableHead>
                <TableHead className="w-[15%] text-left">Date début</TableHead>
                <TableHead className="w-[15%] text-left">Date fin</TableHead>
                <TableHead className="w-[10%] text-left">Statut</TableHead>
                <TableHead className="w-[10%] text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <ElectionRow />
        </TableBody>
    </Table>
);
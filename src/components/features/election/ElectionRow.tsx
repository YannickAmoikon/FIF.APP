"use client"

import React from "react";
import {TableCell, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {FilePenLine, MoreHorizontal, Settings2, Trash} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {useDeleteElectionMutation, useGetElectionsQuery} from "@/services/election.services";
import {ElectionTypes} from "@/types/election.types";

const getStatusBadge = (status: string) => {
    const statusStyles = {
        'coming': 'flex justify-center border text-red-400 border-red-400 w-20',
        'in progress': 'flex justify-center border text-gray-600 border-gray-600 w-20 animate-pulse border',
        'finished': 'flex justify-center border text-green-600 border-green-600 w-20'
    };
    return statusStyles[status as keyof typeof statusStyles];
};

export const ElectionRow = () => {
    const {data, isLoading, isError} = useGetElectionsQuery();
    const [deleteElection] = useDeleteElectionMutation();

    const handleDelete = async (id: string) => {
        try {
            await deleteElection(Number(id));
        } catch (error) {
            console.error('Erreur lors de la suppression', error);
        }
    };

    const elections = data?.data || [];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            {elections.map((election) => (
                <TableRow key={election.id}>
                    <TableCell className="text-left w-[10%]">{election.id}</TableCell>
                    <TableCell className="text-left font-medium w-[30%]">{election.title}</TableCell>
                    <TableCell className="text-left w-[10%]">{election.type === "Private" ? "Privé" : election.type === "Public" ? "Public" : election.type === "Mixt" ? "Mixte" : election.type}</TableCell>
                    <TableCell className="text-left w-[15%]">
                        {formatDate(election.date_time_start)}
                    </TableCell>
                    <TableCell className="text-left w-[15%]">
                        {formatDate(election.date_time_end)}
                    </TableCell>
                    <TableCell className="text-center w-[10%]">
                        <Badge
                            variant="secondary"
                            className={`${getStatusBadge(election.statut)} rounded-sm cursor-pointer`}
                        >
                            {election.statut === 'coming' ? 'À venir' : 
              election.statut === 'in progress' ? 'En cours' : 
              election.statut === 'finished' ? 'Terminé' : election.statut}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right w-[10%]">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <FilePenLine className="mr-1" size={14}/>
                                    Modifier
                                </DropdownMenuItem>
                                <Link href={`/dashboard/election/${election.id}?title=${election.title}`}>
                                    <DropdownMenuItem>
                                        <Settings2 className="mr-1" size={14}/>
                                        Organiser
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDelete(election.id.toString())}
                                >
                                    <Trash className="mr-1" size={14}/>
                                    Supprimer
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};
"use client"

import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {TableCell, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {FilePenLine, MoreHorizontal, Settings2, Trash} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {useDeleteElectionMutation} from "@/services/election.services";
import {useToast} from "@/hooks/use-toast";

// Interface pour une élection individuelle
interface Election {
    id: number;
    date_time_start: string;
    date_time_end: string;
    title: string;
    description: string;
    type_id: number;
    statut: 'coming' | 'in progress' | 'finished';
    type: 'Private' | 'Public' | 'Mixt';
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

interface ElectionRowProps {
    elections: Election[];
}

const getStatusBadge = (status: string) => {
    const statusStyles = {
        'coming': 'flex justify-center border text-gray-900 border-gray-900 w-20',
        'in progress': 'flex justify-center border text-green-600 border-grenn-600 w-20 animate-pulse border',
        'finished': 'flex justify-center border text-green-600 border-green-600 w-20'
    };
    return statusStyles[status as keyof typeof statusStyles];
};

export const ElectionRow: React.FC<ElectionRowProps> = ({ elections = [] }) => {
    const [deleteElection] = useDeleteElectionMutation();
    const {toast} = useToast();

    const handleDelete = async (id: string) => {
        try {
            await deleteElection(Number(id)).unwrap();
            toast({
                title: "Succès",
                description: "Élection supprimée avec succès",
                className: "bg-green-600",
            });
        } catch (error) {
            console.error('Erreur lors de la suppression', error);
            toast({
                title: "Erreur",
                description: "Erreur lors de la suppression de l'élection",
                variant: "destructive",
            });
        }
    };

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

    // Vérifier si elections existe et n'est pas vide
    if (!elections || elections.length === 0) {
        return null;
    }

    // Utiliser un Set pour éliminer les doublons basés sur l'ID
    const uniqueElections = Array.from(
        new Map(elections.map(election => [election.id, election])).values()
    );

    return (
        <>
            {uniqueElections.map((election) => (
                <TableRow key={election.id}>
                    <TableCell className="text-left w-[10%]">{election.id}</TableCell>
                    <TableCell className="text-left font-medium w-[30%]">{election.title}</TableCell>
                    <TableCell className="text-left w-[10%]">
                        {election.type === "Private" ? "Privé" : 
                         election.type === "Public" ? "Public" : 
                         election.type === "Mixt" ? "Mixte" : election.type}
                    </TableCell>
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
                                <Link href={`/back/dashboard/election/${election.id}?title=${election.title}&status=${election.statut}`}>
                                    <DropdownMenuItem>
                                        <Settings2 className="mr-1" size={14}/>
                                        Organiser
                                    </DropdownMenuItem>
                                </Link>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem
                                            className="text-red-600"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Trash className="mr-1" size={14}/>
                                            Supprimer
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Cette action est irréversible. Cela supprimera définitivement l'élection
                                                "{election.title}" et toutes les données associées.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="bg-red-600 hover:bg-red-700"
                                                onClick={() => handleDelete(election.id.toString())}
                                            >
                                                Supprimer
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};
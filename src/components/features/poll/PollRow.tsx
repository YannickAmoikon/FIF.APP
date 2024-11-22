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
import {FilePenLine, Loader, MoreHorizontal, Settings2, Trash} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {useToast} from "@/hooks/use-toast";

// Interface pour un sondage individuel
interface Poll {
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

interface PollRowProps {
    polls: Poll[];
}

const getStatusBadge = (status: string) => {
    const statusStyles = {
        'coming': 'flex justify-center border text-gray-900 border-gray-900 w-20',
        'in progress': 'flex justify-center items-center border text-green-600 border-green-600 w-20',
        'finished': 'flex justify-center border text-green-600 border-green-600 w-20'
    };
    return statusStyles[status as keyof typeof statusStyles];
};

export const PollRow: React.FC<PollRowProps> = ({polls = []}) => {
    const {toast} = useToast();

    const handleDelete = async (id: string) => {
        try {
            // Placeholder for delete logic
            toast({
                title: "Succès",
                description: "Sondage supprimé avec succès",
                className: "bg-green-600",
            });
        } catch (error) {
            console.error('Erreur lors de la suppression', error);
            toast({
                title: "Erreur",
                description: "Erreur lors de la suppression du sondage",
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

    if (!polls || polls.length === 0) {
        return null;
    }

    return (
        <>
            {polls.map((poll) => (
                <TableRow key={poll.id}>
                    <TableCell className="text-left w-[10%]">{poll.id}</TableCell>
                    <TableCell className="text-left font-medium w-[30%]">{poll.title}</TableCell>
                    <TableCell className="text-left w-[10%]">
                        {poll.type === "Private" ? "Privé" :
                            poll.type === "Public" ? "Public" :
                                poll.type === "Mixt" ? "Mixte" : poll.type}
                    </TableCell>
                    <TableCell className="text-left w-[15%]">
                        {formatDate(poll.date_time_start)}
                    </TableCell>
                    <TableCell className="text-left w-[15%]">
                        {formatDate(poll.date_time_end)}
                    </TableCell>
                    <TableCell className="text-center w-[10%]">
                        <Badge
                            variant="secondary"
                            className={`${getStatusBadge(poll.statut)} rounded-sm cursor-pointer`}
                        >
                            {poll.statut === 'coming' ? 'À venir' :
                                poll.statut === 'in progress' ? (
                                        <div className="flex items-center justify-center">
                                            <Loader className="mr-1 h-4 w-4 animate-spin"/>
                                            En cours
                                        </div>
                                    ) :
                                    poll.statut === 'finished' ? 'Terminé' : poll.statut}
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
                                <Link
                                    href={`/back/dashboard/poll/${poll.id}?title=${poll.title}&status=${poll.statut}`}>
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
                                                Cette action est irréversible. Cela supprimera définitivement le sondage
                                                "{poll.title}" et toutes les données associées.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="bg-red-600 hover:bg-red-700"
                                                onClick={() => handleDelete(poll.id.toString())}
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
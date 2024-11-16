import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    MoreHorizontal,
    Settings2,
    FilePenLine, Trash, Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const mockElections = [
    {
        id: "EL001",
        titre: "Élection Présidentielle FIF 2024",
        type: "Public",
        dateDebut: "2024-05-01 08:00",
        dateFin: "2024-05-01 18:00",
        statut: "En cours"
    },
    {
        id: "EL002",
        titre: "Élection des Membres du Comité Exécutif",
        type: "Mixte",
        dateDebut: "2024-04-15 09:00",
        dateFin: "2024-04-15 17:00",
        statut: "En cours"
    },
    {
        id: "EL003",
        titre: "Élection des Représentants Régionaux",
        type: "Privé",
        dateDebut: "2024-03-01 08:00",
        dateFin: "2024-03-01 16:00",
        statut: "Terminée"
    },
    {
        id: "EL004",
        titre: "Vote Commission Technique",
        type: "Mixte",
        dateDebut: "2024-06-10 10:00",
        dateFin: "2024-06-10 15:00",
        statut: "Bientôt"
    },
    {
        id: "EL005",
        titre: "Élection Commission des Arbitres",
        type: "Privé",
        dateDebut: "2024-02-15 09:00",
        dateFin: "2024-02-15 17:00",
        statut: "Terminée"
    },
    {
        id: "EL006",
        titre: "Élection du Conseil de Discipline",
        type: "Privé",
        dateDebut: "2024-07-20 09:00",
        dateFin: "2024-07-20 16:00",
        statut: "Bientôt"
    },
    {
        id: "EL007",
        titre: "Vote Commission Marketing",
        type: "Public",
        dateDebut: "2024-08-05 08:00",
        dateFin: "2024-08-05 17:00",
        statut: "Bientôt"
    },
    {
        id: "EL008",
        titre: "Élection Commission des Jeunes",
        type: "Mixte",
        dateDebut: "2024-04-01 09:00",
        dateFin: "2024-04-01 18:00",
        statut: "Terminée"
    },
    {
        id: "EL009",
        titre: "Vote Commission Médicale",
        type: "Privé",
        dateDebut: "2024-09-15 10:00",
        dateFin: "2024-09-15 16:00",
        statut: "Bientôt"
    },
];
const getStatusBadge = (status: string) => {
    const statusStyles = {
        'Bientôt': 'flex justify-center border text-red-400 border-red-400 w-20',
        'En cours': 'flex justify-center border text-gray-600 border-gray-600 w-20 animate-pulse border',
        'Terminée': 'flex justify-center border text-green-600 border-green-600 w-20'
    };
    return statusStyles[status as keyof typeof statusStyles];
};

export const ElectionRow = () => {
    return (
        <>
            {mockElections.map((election) => (
                <TableRow key={election.id}>
                    <TableCell className="text-left w-[10%]">{election.id}</TableCell>
                    <TableCell className="text-left font-medium w-[30%]">{election.titre}</TableCell>
                    <TableCell className="text-left w-[10%]">{election.type}</TableCell>
                    <TableCell className="text-left w-[15%]">{election.dateDebut}</TableCell>
                    <TableCell className="text-left w-[15%]">{election.dateFin}</TableCell>
                    <TableCell className="text-center w-[10%]">
                        <Badge variant="secondary" className={`${getStatusBadge(election.statut)} rounded-sm cursor-pointer`}>
                            {election.statut}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right w-[10%]">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <FilePenLine className="mr-1" size={14} />
                                    Modifier
                                </DropdownMenuItem>
                                <Link href={`/dashboard/election/${election.id}?title=${election.titre}`}>
                                    <DropdownMenuItem>
                                        <Settings2 className="mr-1" size={14} />
                                        Organiser
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-1" size={14} />
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
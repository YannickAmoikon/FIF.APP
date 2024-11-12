import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2Icon, CheckIcon, X, Pencil, Eye } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { Election as ElectionType } from "@/types/election";
import UpdateElectionDialog from "./UpdateElectionDialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const formSchema = z.object({
    titre: z.string().min(1, { message: "Le titre est requis" }),
    description: z.string().min(1, { message: "La description est requise" }),
    dateDebut: z.string().min(1, { message: "La date de début est requise" }),
    dateFin: z.string().min(1, { message: "La date de fin est requise" }),
    type: z.string().min(1, { message: "Le type est requis" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ElectionRowProps {
    election: ElectionType;
    onDelete: (id: string) => void;
    triggerRefresh: (action: string) => void;
}

export const ElectionRow: React.FC<ElectionRowProps> = ({ election, onDelete, triggerRefresh }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const { toast } = useToast();

    const handleElectionEdited = (success: boolean, message: string) => {
        if (success) {
            triggerRefresh('update');
        }
    };

    const handleDelete = () => {
        onDelete(election.id.toString());
        triggerRefresh('delete');
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            'À venir': 'bg-blue-100 text-blue-800',
            'En cours': 'bg-green-100 text-green-800',
            'Terminée': 'bg-gray-100 text-gray-800'
        };
        return (
            <Badge className={`${statusStyles[status as keyof typeof statusStyles]} rounded-sm`}>
                {status}
            </Badge>
        );
    };

    return (
        <TableRow>
            <TableCell className="text-left">{election.id}</TableCell>
            <TableCell className="text-left font-medium">{election.titre}</TableCell>
            <TableCell className="text-left">{election.type}</TableCell>
            <TableCell className="text-left">
                {format(new Date(election.dateDebut), 'dd/MM/yyyy HH:mm', { locale: fr })}
            </TableCell>
            <TableCell className="text-left">
                {format(new Date(election.dateFin), 'dd/MM/yyyy HH:mm', { locale: fr })}
            </TableCell>
            <TableCell className="text-center">
                {getStatusBadge(election.statut)}
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Eye className="mr-1" size={14} />
                            Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                            <Pencil className="mr-1" size={14} />
                            Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => setIsDeleteDialogOpen(true)}
                            className="text-red-600"
                        >
                            <Trash2Icon className="mr-1" size={14} />
                            Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <UpdateElectionDialog
                    election={election}
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                    onElectionEdited={handleElectionEdited}
                />

                {/* Dialog de suppression */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmation de suppression</DialogTitle>
                            <DialogDescription>
                                Êtes-vous sûr de vouloir supprimer cette élection ?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setIsDeleteDialogOpen(false)}
                            >
                                <X className="mr-1" size={14} />
                                Annuler
                            </Button>
                            <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => {
                                    handleDelete();
                                    setIsDeleteDialogOpen(false);
                                }}
                            >
                                <CheckIcon className="mr-1" size={14} />
                                Confirmer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
};
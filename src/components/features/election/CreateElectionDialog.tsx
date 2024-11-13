"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Loader2, Save } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// Schéma de validation Zod
const formSchema = z.object({
    titre: z.string().min(1, { message: "Le titre est requis" }),
    description: z.string().min(1, { message: "La description est requise" }),
    dateDebut: z.string().min(1, { message: "La date de début est requise" }),
    dateFin: z.string().min(1, { message: "La date de fin est requise" }),
    type: z.string().min(1, { message: "Le type est requis" }),
});

// Types
type FormValues = z.infer<typeof formSchema>;

interface CreateElectionDialogProps {
    onElectionCreated?: (success: boolean, message: string) => void;
}

export default function CreateElectionDialog({ onElectionCreated }: CreateElectionDialogProps) {
    // États
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    // Configuration du formulaire
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titre: "",
            description: "",
            dateDebut: "",
            dateFin: "",
            type: "",
        },
    });

    // Gestionnaires d'événements
    const resetForm = () => {
        form.reset({
            titre: "",
            description: "",
            dateDebut: "",
            dateFin: "",
            type: "",
        });
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            resetForm();
        }
    };

    // Soumission du formulaire
    const onSubmit = async (values: FormValues) => {
        // Logique de soumission à implémenter
        console.log(values);
    };

    // Rendu
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="rounded-sm border">
                    <Plus className="mr-1" size={14} />
                    Nouvelle Élection
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-secondary  w-full">
                <DialogHeader>
                    <DialogTitle>Créer une nouvelle élection</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations pour créer une nouvelle élection
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Type */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type d'élection</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selectionnez un type d'élection" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel className=" bg-gray-500 text-white">Types d'élection</SelectLabel>
                                                    <SelectItem value="mixed">Mixte</SelectItem>
                                                    <SelectItem value="public">Public</SelectItem>
                                                    <SelectItem value="private">Privé</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Titre */}
                        <FormField
                            control={form.control}
                            name="titre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre de l'élection</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: Élection présidentielle 2024"
                                            {...field}
                                            className="w-full rounded-sm"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="dateDebut"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date de début</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                {...field}
                                                className="w-full rounded-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dateFin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date de fin</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                {...field}
                                                className="w-full rounded-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Décrivez l'élection..."
                                            {...field}
                                            className="w-full rounded-sm resize-none h-24"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="submit"
                                size="sm"
                                className="bg-green-600 text-white hover:bg-green-600 rounded-sm"
                            >
                                <Save className="mr-1" size={14} />
                                Enregistrer
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
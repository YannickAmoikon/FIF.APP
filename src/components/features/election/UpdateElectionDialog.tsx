"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useToast} from "@/hooks/use-toast";
import {Pencil} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {ElectionTypes} from "@/types/election.types";

const formSchema = z.object({
    titre: z.string().min(1, {message: "Le titre est requis"}),
    description: z.string().min(1, {message: "La description est requise"}),
    dateDebut: z.string().min(1, {message: "La date de début est requise"}),
    dateFin: z.string().min(1, {message: "La date de fin est requise"}),
    type: z.string().min(1, {message: "Le type est requis"}),
});

type FormValues = z.infer<typeof formSchema>;

interface UpdateElectionDialogProps {
    election: ElectionTypes;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onElectionEdited?: (success: boolean, message: string) => void;
}

// @ts-ignore
export default function UpdateElectionDialog({
                                                 election,
                                                 open,
                                                 onOpenChange,
                                                 onElectionEdited
                                             }: UpdateElectionDialogProps) {
    const {toast} = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titre: election.titre,
            description: election.description,
            dateDebut: election.dateDebut,
            dateFin: election.dateFin,
            type: election.type,
        },
    });

    const handleOpenChange = (newOpen: boolean) => {
        onOpenChange(newOpen);
        if (!newOpen) {
            form.reset({
                titre: election.titre,
                description: election.description,
                dateDebut: election.dateDebut,
                dateFin: election.dateFin,
                type: election.type,
            });
        }
    };

    const onSubmit = async (values: FormValues) => {

    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px] w-full">
                <DialogHeader>
                    <DialogTitle>Modifier l'élection</DialogTitle>
                    <DialogDescription>
                        Modifiez les informations de l'élection
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="titre"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Titre de l'élection</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: Élection présidentielle 2024"
                                            {...field}
                                            className="w-full rounded-sm"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Décrivez l'élection..."
                                            {...field}
                                            className="w-full rounded-sm resize-none h-24"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="dateDebut"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Date de début</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                {...field}
                                                className="w-full rounded-sm"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dateFin"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Date de fin</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                {...field}
                                                className="w-full rounded-sm"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="type"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Type d'élection</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: Présidentielle, Municipale..."
                                            {...field}
                                            className="w-full rounded-sm"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="submit"
                                size="sm"
                                className="bg-green-600 text-white hover:bg-green-700 rounded-sm"
                            >

                                <Pencil className="mr-1" size={14}/>
                                Modifier
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
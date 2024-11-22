"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useToast} from "@/hooks/use-toast";
import {Plus, Save} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// Zod validation schema
const formSchema = z.object({
    title: z.string().min(1, {message: "Le titre est requis"}),
    description: z.string().min(1, {message: "La description est requise"}),
    dateTimeStart: z.string().min(1, {message: "La date de début est requise"}),
    dateTimeEnd: z.string().min(1, {message: "La date de fin est requise"}),
    type: z.string().min(1, {message: "Le type est requis"}),
});

// Types
type FormValues = z.infer<typeof formSchema>;

export default function CreatePollDialog() {
    const {toast} = useToast();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            dateTimeStart: "",
            dateTimeEnd: "",
            type: "",
        },
    });

    const onSubmit = (values: FormValues) => {
        // Placeholder for submission logic
        console.log(values);
        toast({
            title: "Succès",
            description: "Données soumises",
            className: "bg-green-600 text-white"
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="rounded-sm border">
                    <Plus className="mr-1" size={14}/>
                    Nouveau sondage
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-secondary w-full">
                <DialogHeader>
                    <DialogTitle>Créer un nouveau sondage</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations pour créer un nouveau sondage
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Type */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Type de sondage</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selectionnez un type de sondage"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel className="bg-gray-500 text-white">Types
                                                        de sondage</SelectLabel>
                                                    <SelectItem value="public">Public</SelectItem>
                                                    <SelectItem value="private">Privé</SelectItem>
                                                    <SelectItem value="mixt">Mixte</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Titre */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Titre du sondage</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: Âge de retraite des arbitres "
                                            {...field}
                                            className="w-full rounded-sm"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="dateTimeStart"
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
                                name="dateTimeEnd"
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

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Décrivez le sondage..."
                                            {...field}
                                            className="w-full rounded-sm resize-none h-24"
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
                                className="bg-green-600 text-white hover:bg-green-600 rounded-sm"
                            >
                                <Save className="mr-1" size={14}/>
                                Enregistrer
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
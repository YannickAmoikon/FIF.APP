"use client";

import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {Plus, MoreVertical, Trash, Save, Users2, Vote} from "lucide-react";
import {Card} from "@/components/ui/card";
import {SearchInput} from "@/components/app/SearchInput";
import {useState} from "react";
import {useCreateVoterMutation, useDeleteVoterMutation} from "@/services/voter.services";
import {useGetCategoriesQuery} from "@/services/category.services";
import {Loader} from "@/components/app/Loader";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useToast} from "@/hooks/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetElectionByIdQuery } from "@/services/election.services";
import { NoDataContent } from '@/components/app/NoDataContent';

const formSchema = z.object({
    name: z.string().min(1, { message: "Le nom est requis" }),
    last_name: z.string().min(1, { message: "Le prénom est requis" }),
    email: z.string().email({ message: "Email invalide" }),
    phone: z.string().min(1, { message: "Le téléphone est requis" }),
    categorie: z.string().min(1, { message: "La catégorie est requise" }),
    dateStart: z.string().min(1, { message: "La date de début est requise" }),
    dateEnd: z.string().min(1, { message: "La date de fin est requise" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ElectionDetailsVotersProps {
    electionId: string;
}

export default function ElectionDetailsVoters({ electionId }: ElectionDetailsVotersProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const {toast} = useToast();
    const {data: categories} = useGetCategoriesQuery();
    const [createVoter] = useCreateVoterMutation();
    const [deleteVoter] = useDeleteVoterMutation();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [voterToDelete, setVoterToDelete] = useState<any>(null);

    // Récupération des données de l'élection avec le refetch
    const {data: electionData, isLoading, refetch} = useGetElectionByIdQuery(Number(electionId));
    
    // Filtrer d'abord les électeurs actifs, puis appliquer les autres filtres
    const activeAndFilteredVoters = electionData?.data?.votants
        ?.filter(voter => voter.is_active) // Filtre des électeurs actifs
        ?.filter((voter) =>
            `${voter.name} ${voter.last_name}`
                .toLowerCase()
                .includes(searchValue.toLowerCase())
        ) || [];

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            last_name: "",
            email: "",
            phone: "",
            categorie: "",
            dateStart: "",
            dateEnd: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            const selectedCategory = categories?.data.find(
                category => category.id.toString() === values.categorie
            );

            await createVoter({
                body: {
                    ...values,
                    categorie: selectedCategory?.title || '',
                    election_id: Number(electionId) // Ajout de l'election_id
                },
                electionId: electionId
            }).unwrap();

            // Refetch des données après la création
            await refetch();

            toast({
                title: "Succès",
                description: "Électeur créé avec succès",
                className: "bg-green-600 text-white",
            });
            setIsCreateOpen(false);
            form.reset();
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Impossible de créer l'électeur",
                variant: "destructive",
            });
        }
    };

    const handleDelete = (voter: any) => {
        setVoterToDelete(voter);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!voterToDelete) return;
        
        try {
            await deleteVoter(voterToDelete.id.toString()).unwrap();
            await refetch();
            
            toast({
                title: "Succès",
                description: "Électeur supprimé avec succès",
                className: "bg-green-600 text-white",
            });
            setIsDeleteDialogOpen(false);
            setVoterToDelete(null);
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Impossible de supprimer l'électeur",
                variant: "destructive",
            });
        }
    };

    if (isLoading) return <Loader />;

    return (
        <ScrollArea className="h-full p-2">
            <div className="mb-6 flex flex-col">
                <h3 className="font-semibold border-b pb-2">Liste des électeurs</h3>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <SearchInput
                        value={searchValue}
                        onChange={(e) => setSearchValue(e)}
                        placeholder="Rechercher un électeur..."
                    />
                    <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-sm border"
                        onClick={() => setIsCreateOpen(true)}
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Nouvel électeur
                    </Button>
                </div>

                {activeAndFilteredVoters?.length === 0 ? (
                    <NoDataContent 
                        type="électeurs" 
                        searchValue={searchValue}
                    />
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {activeAndFilteredVoters?.map((voter) => (
                            <Card key={voter.id} className="p-4 rounded-sm bg-secondary">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-secondary border-2 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium">
                                                {voter.name.charAt(0).toUpperCase()}
                                                {voter.last_name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">
                                                {voter.name} {voter.last_name}
                                            </h4>
                                            <p className="text-sm text-gray-500">{voter.email}</p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() => handleDelete(voter)}
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Supprimer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouvel électeur</DialogTitle>
                        <DialogDescription>
                            Ajoutez un nouvel électeur à l'élection
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Doe" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prénoms</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="John" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" placeholder="john.doe@example.com" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Téléphone</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="+225 0123456789" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categorie"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Catégorie</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionnez une catégorie" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories?.data.map((category) => (
                                                    <SelectItem 
                                                        key={category.id} 
                                                        value={category.id.toString()}
                                                    >
                                                        {category.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="dateStart"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date de début</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="date" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="dateEnd"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date de fin</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="date" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter>
                                <Button size="sm" type="submit" className="bg-green-600 hover:bg-green-700">
                                <Save className="w-4 h-4 mr-1"/>
                                    Enregistrer
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-red-600 flex items-center gap-2">
                            <Trash className="h-5 w-5" />
                            Confirmer la suppression
                        </DialogTitle>
                        <DialogDescription>
                            Êtes-vous sûr de vouloir supprimer l'électeur{" "}
                            <span className="font-semibold">
                                {voterToDelete?.name} {voterToDelete?.last_name}
                            </span>
                            ? Cette action est irréversible.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex justify-end gap-3 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setIsDeleteDialogOpen(false);
                                setVoterToDelete(null);
                            }}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            className="gap-2"
                            onClick={confirmDelete}
                        >
                            <Trash className="h-4 w-4" />
                            Supprimer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </ScrollArea>
    );
}
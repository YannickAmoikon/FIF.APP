"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MoreVertical,
  Trash,
  FilePenLine,
  Save,
  Phone,
  Calendar as CalendarIcon,
  FileText,
  Check,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { SearchInput } from "@/components/app/SearchInput";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/app/Loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useCreateCandidateMutation,
  useDeleteCandidateMutation,
  useGetCandidatesByElectionQuery,
} from "@/services/candidate.services";
import { CandidateTypes } from "@/types/candidate.types";
// Correction : Importation de NoDataContent depuis le bon emplacement
import { NoDataContent } from "@/components/app/NoDataContent";
import { useGetElectionByIdQuery } from "@/services/election.services";
import { Textarea } from "@/components/ui/textarea";

// Schéma de validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Le prénom est requis" }),
  last_name: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  phone: z.string().min(1, { message: "Le téléphone est requis" }),
  birth_date: z.date().refine((date) => date < new Date(), {
    message: "La date de naissance doit être dans le passé",
  }),
  bio: z.string().min(2, { message: "La bio du candidat est requise" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ElectionDetailsCandidatesProps {
  electionId: string;
}

// Fonction pour normaliser le texte (enlever les accents et mettre en minuscules)
const normalizeText = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

export default function ElectionDetailsCandidates({
  electionId,
}: ElectionDetailsCandidatesProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();
  const [createCandidate] = useCreateCandidateMutation();
  const [deleteCandidate] = useDeleteCandidateMutation();
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateTypes | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] =
    useState<CandidateTypes | null>(null);

  // Récupération des données de l'élection avec le refetch
  const {
    data: electionData,
    isLoading,
    refetch,
  } = useGetElectionByIdQuery(Number(electionId));

  // Filtrer d'abord les candidats actifs, puis appliquer les autres filtres
  const activeAndFilteredCandidates =
    electionData?.data?.candidats
      ?.filter((candidate) => candidate.is_active) // Filtre des candidats actifs
      ?.filter((candidate) =>
        `${candidate.name} ${candidate.last_name}`
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      ) || [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      phone: "",
      birth_date: new Date(),
      bio: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await createCandidate({
        body: {
          ...values,
          birth_date: values.birth_date.toISOString().split("T")[0],
          election_id: Number(electionId),
        },
        electionId: electionId,
      }).unwrap();

      // Refetch des données après la création
      await refetch();

      toast({
        title: "Succès",
        description: "Candidat créé avec succès",
        className: "bg-green-600 text-white",
      });
      setIsCreateOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le candidat",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (candidate: CandidateTypes) => {
    setCandidateToDelete(candidate);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!candidateToDelete) return;

    try {
      await deleteCandidate(candidateToDelete.id.toString()).unwrap();
      await refetch();

      toast({
        title: "Succès",
        description: "Candidat supprimé avec succès",
        className: "bg-green-600 text-white",
      });
      setIsDeleteDialogOpen(false);
      setCandidateToDelete(null);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le candidat",
        variant: "destructive",
      });
    }
  };

  return (
    <ScrollArea className="h-full p-2">
      <div className="mb-6 flex flex-col">
        <h3 className="font-semibold border-b pb-2">Liste des candidats</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e)}
            placeholder="Rechercher un candidat..."
          />
          <Button
            size="sm"
            variant="secondary"
            className="rounded-sm border"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Nouveau candidat
          </Button>
        </div>

        {/* État de chargement initial */}
        {!electionData && (
          <div className="flex justify-center items-center py-8">
            <Loader />
          </div>
        )}

        {/* Affichage des candidats */}
        {electionData && (
          <>
            {activeAndFilteredCandidates.length === 0 ? (
              <NoDataContent type="candidates" searchValue={searchValue} />
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {activeAndFilteredCandidates.map((candidate) => (
                  <Card
                    key={candidate.id}
                    className="p-4 rounded-sm bg-secondary"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-secondary border-2 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {candidate.last_name?.charAt(0).toUpperCase() || ""}
                            {candidate.name?.charAt(0).toUpperCase() || ""}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {candidate.last_name} {candidate.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {candidate.email}
                          </p>
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
                            onClick={() => {
                              //@ts-ignore
                              setSelectedCandidate(candidate);
                              setIsDetailsOpen(true);
                            }}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Détails
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            //@ts-ignore
                            onClick={() => handleDelete(candidate)}
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
          </>
        )}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau candidat</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau candidat à l'élection
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Nom et Prénoms côte à côte */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="last_name"
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
                  name="name"
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
              </div>

              {/* Email et Téléphone côte à côte */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john.doe@example.com"
                        />
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
              </div>

              {/* Date de naissance */}
              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="w-full rounded-sm"
                        value={
                          field.value
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Biographie */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biographie</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Entrez la biographie du candidat..."
                        className="resize-none"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-600"
                  type="submit"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails du candidat</DialogTitle>
          </DialogHeader>

          {selectedCandidate && (
            <div className="space-y-4">
              {/* En-tête avec avatar */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white border-2 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium">
                    {selectedCandidate.last_name.charAt(0).toUpperCase()}
                    {selectedCandidate.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">
                    {selectedCandidate.last_name} {selectedCandidate.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedCandidate.email}
                  </p>
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{selectedCandidate.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span>
                    {new Date(selectedCandidate.birth_date).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
              </div>

              {/* Biographie complète */}
              {selectedCandidate.bio && (
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    Biographie
                  </h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {selectedCandidate.bio}
                  </p>
                </div>
              )}
            </div>
          )}
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
              Êtes-vous sûr de vouloir supprimer le candidat{" "}
              <span className="font-semibold">
                {candidateToDelete?.name} {candidateToDelete?.last_name}
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
                setCandidateToDelete(null);
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

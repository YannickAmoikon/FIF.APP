"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save } from "lucide-react";
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
  SelectValue,
} from "@/components/ui/select";
import { useCreateElectionMutation } from "@/services/election.services";
import { useGetTypesQuery } from "@/services/type.services";
import { TypeTypes } from "@/types/type.types";

// Zod validation schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  dateTimeStart: z.string().min(1, { message: "La date de début est requise" }),
  dateTimeEnd: z.string().min(1, { message: "La date de fin est requise" }),
  type: z.string().min(1, { message: "Le type est requis" }),
});

// Types
type FormValues = z.infer<typeof formSchema>;

interface CreateElectionDialogProps {
  onElectionCreated?: (success: boolean, message: string) => void;
}

export default function CreateElectionDialog({
  onElectionCreated,
}: CreateElectionDialogProps) {
  const { data, isLoading } = useGetTypesQuery();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [createElection] = useCreateElectionMutation();

  // Form configuration
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

  // Event handlers
  const resetForm = () => {
    form.reset({
      title: "",
      description: "",
      dateTimeStart: "",
      dateTimeEnd: "",
      type: "",
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      resetForm();
    }
  };

  // Form submission
  const onSubmit = async (values: FormValues) => {
    try {
      // Fonction pour formater la date
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return (
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0") +
          " " +
          String(date.getHours()).padStart(2, "0") +
          ":" +
          String(date.getMinutes()).padStart(2, "0")
        );
      };

      // Trouver le type correspondant à l'ID sélectionné
      const selectedType = types.find(
        (type: TypeTypes) => type.id.toString() === values.type,
      );

      const formattedValues = {
        title: values.title,
        description: values.description,
        dateTimeStart: formatDate(values.dateTimeStart),
        dateTimeEnd: formatDate(values.dateTimeEnd),
        type: selectedType?.name, // Utiliser le nom du type au lieu de l'ID
      };

      // Appeler l'API pour créer l'élection
      //@ts-ignore
      const response = await createElection(formattedValues).unwrap();

      // Notification de succès
      toast({
        title: "Succès",
        description: "Élection créée avec succès",
        className: "bg-green-600 text-white",
      });

      // Callback et fermeture
      onElectionCreated?.(true, "Élection créée avec succès");
      setOpen(false);
      resetForm();
    } catch (error) {
      // Handle error
      onElectionCreated?.(false, "Erreur lors de la création de l'élection");

      toast({
        title: "Erreur",
        description: "Impossible de créer l'élection",
        variant: "destructive",
      });
    }
  };

  // Safely handle types from query
  //@ts-ignore
  const types = data?.data || [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="rounded-sm border hover:bg-green-600 hover:text-white duration-500"
        >
          <Plus className="mr-1" size={14} />
          Nouvelle élection
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-secondary w-full">
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selectionnez un type d'élection" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="bg-gray-500 text-white">
                            Types d'élection
                          </SelectLabel>
                          {isLoading ? (
                            <SelectItem disabled value="loading">
                              Chargement...
                            </SelectItem>
                          ) : (
                            types.map((type: TypeTypes) => (
                              <SelectItem
                                key={type.id}
                                value={type.id.toString()}
                              >
                                {type.name === "Private"
                                  ? "Privé"
                                  : type.name === "Public"
                                    ? "Public"
                                    : type.name === "Mixt"
                                      ? "Mixte"
                                      : type.name}
                              </SelectItem>
                            ))
                          )}
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
              name="title"
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
                name="dateTimeStart"
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
                name="dateTimeEnd"
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

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useCreatePollMutation } from "@/services/poll.services";
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
import { useGetTypesQuery } from "@/services/type.services";
import { TypeTypes } from "@/types/type.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod validation schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  dateDebut: z.string().min(1, { message: "La date de début est requise" }),
  dateFin: z.string().min(1, { message: "La date de fin est requise" }),
  type: z.string().min(1, { message: "Le type est requis" }),
});

// Types
type FormValues = z.infer<typeof formSchema>;

interface CreatePollDialogProps {
  onPollCreated?: (success: boolean, message: string) => void;
}

export default function CreatePollDialog({
  onPollCreated,
}: CreatePollDialogProps) {
  const { data, isLoading } = useGetTypesQuery();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [createPoll] = useCreatePollMutation();

  // Form configuration
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dateDebut: "",
      dateFin: "",
      type: "",
    },
  });

  // Event handlers
  const resetForm = () => {
    form.reset({
      title: "",
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

  // Safely handle types from query
  const types = data?.data || [];

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
        dateDebut: formatDate(values.dateDebut),
        dateFin: formatDate(values.dateFin),
        type: selectedType?.name, // Utiliser le nom du type au lieu de l'ID
      };

      // Appeler l'API pour créer le sondage
      const response = await createPoll(formattedValues).unwrap();

      // Notification de succès
      toast({
        title: "Succès",
        description: "Sondage créé avec succès",
        className: "bg-green-600 text-white",
      });

      // Callback et fermeture
      onPollCreated?.(true, "Sondage créé avec succès");
      setOpen(false);
      resetForm();
    } catch (error) {
      // Handle error
      onPollCreated?.(false, "Erreur lors de la création du sondage");

      toast({
        title: "Erreur",
        description: "Impossible de créer le sondage",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="rounded-sm border hover:bg-green-600 hover:text-white duration-500"
        >
          <Plus className="mr-1" size={14} />
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de sondage</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selectionnez un type de sondage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="bg-gray-500 text-white">
                            Types de sondage
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
                  <FormLabel>Titre du sondage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Satisfaction des membres"
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
                      placeholder="Décrivez le sondage..."
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

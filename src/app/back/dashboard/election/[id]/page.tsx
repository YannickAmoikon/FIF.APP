"use client";

import { useState } from "react";
import { useGetElectionByIdQuery } from "@/services/election.services";
import { Toaster } from "@/components/ui/toaster";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/app/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ArrowLeft,
  ChartLine,
  Check,
  MoreVertical,
  ThumbsUp,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ElectionDetailsOverViews from "@/components/features/electionDetails/ElectionDetailsOverViews";
import ElectionDetailsCandidates from "@/components/features/electionDetails/ElectionDetailsCandidates";
import ElectionDetailsVoters from "@/components/features/electionDetails/ElectionDetailsVoters";
import ElectionDetailsResults from "@/components/features/electionDetails/ElectionDetailsResults";
import { Loader } from "@/components/app/Loader";

const tabs = [
  { title: "informations générales", value: "overview" },
  { title: "liste des candidats", value: "candidates" },
  { title: "liste des électeurs", value: "voters" },
  { title: "Apercu des vôtes", value: "results" },
];

// Interface pour un candidat
interface Candidate {
  id: number;
  name: string;
  last_name: string;
  is_active: boolean;
  // ... autres propriétés des candidats si nécessaire
}

// Interface pour un électeur
interface Voter {
  id: number;
  name: string;
  last_name: string;
  is_active: boolean;
  // ... autres propriétés des électeurs si nécessaire
}

// Interface pour une élection
interface Election {
  id: number;
  date_time_start: string;
  date_time_end: string;
  title: string;
  description: string;
  type_id: number;
  statut: "coming" | "in progress" | "finished";
  type: "Private" | "Public" | "Mixt";
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

// Interface pour la réponse de l'API
interface ElectionDetailResponse {
  message: string;
  data: {
    election: Election;
    candidats: Candidate[];
    votants: Voter[];
  };
}

export default function ElectionDetailsPage() {
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const electionId = params?.id as string;
  const activeTab = searchParams.get("tab") || "overview";

  const {
    data: election,
    //@ts-ignore
    isLoading,
    //@ts-ignore
    isError,
  } = useGetElectionByIdQuery<ElectionDetailResponse>(Number(electionId));

  const handleTabChange = (value: string) => {
    router.push(`/back/dashboard/election/${electionId}?tab=${value}`);
  };

  const handleStartElection = () => {
    toast({
      title: "Élection démarrée",
      description: "L'élection a été démarrée avec succès.",
      className: "bg-green-600 text-white",
    });
    setIsStartDialogOpen(false);
  };

  // Calcul des totaux pour les candidats et électeurs actifs
  //@ts-ignore
  const totalActiveCandidates =
    //@ts-ignore
    election?.data?.candidats?.filter(
      //@ts-ignore
      (candidate) => candidate.is_active,
    ).length || 0;
  const totalActiveVoters =
    //@ts-ignore
    election?.data?.votants?.filter(
      //@ts-ignore
      (voter) => voter.is_active,
    ).length || 0;

  if (isLoading) {
    return (
      <main className="flex bg-secondary flex-1 h-full">
        <Card className="flex-1 bg-secondary rounded-none shadow-none border-0">
          <CardContent className="h-full flex items-center justify-center">
            <Loader />
          </CardContent>
        </Card>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex bg-secondary flex-1 h-full">
        <Card className="flex-1 bg-secondary rounded-none shadow-none border-0">
          <CardContent className="h-full flex items-center justify-center">
            <div className="text-red-500">
              Erreur lors du chargement des données
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex bg-secondary flex-1 h-full">
      <Toaster />
      <Card className="flex-1 bg-secondary rounded-none shadow-none border-0">
        <CardHeader className="border-b-2 flex flex-row items-center justify-between p-6">
          <div className="flex flex-col space-y-1.5">
            <CardTitle className="uppercase">
              {
                //@ts-ignore
                election?.data?.election?.title
              }
            </CardTitle>
            <CardDescription>
              Informations générales et statistiques
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className="border rounded-sm"
                >
                  <MoreVertical size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[230px]">
                <DropdownMenuItem onClick={() => setIsStartDialogOpen(true)}>
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  <span>Démarrer l'élection</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              variant="secondary"
              className="border rounded-sm"
              onClick={() => router.push("/back/dashboard/election")}
            >
              <ArrowLeft className="mr-1" size={14} />
              Retour
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 h-[calc(100vh-7rem)] flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <StatCard
              title="Total candidats"
              value={totalActiveCandidates.toString()}
              icon={<User size={24} />}
            />
            <StatCard
              title="Total électeurs"
              value={totalActiveVoters.toString()}
              icon={<Users size={24} />}
            />
            <StatCard
              title="Taux de progression des votes"
              value="0 %"
              icon={<ChartLine size={24} />}
            />
            <StatCard
              title="Vainqueur de l'élection"
              value="Non déterminé"
              icon={<UserCheck size={24} />}
            />
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <Tabs
              defaultValue={activeTab}
              value={activeTab}
              onValueChange={handleTabChange}
              className="flex-1 flex flex-col"
            >
              <TabsList className="space-x-2 w-full flex items-center rounded-sm justify-start py-5 border-b-2 border-gray-200">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="uppercase w-6/12 py-1.5 px-4 border text-xs rounded-none font-normal transition-colors duration-200 border-secondary data-[state=active]:bg-secondary data-[state=active]:border-gray-300 data-[state=active]:text-gray-800"
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex-1 bg-secondary">
                <TabsContent
                  value="overview"
                  className="h-full border overflow-auto m-0 p-8"
                >
                  <ElectionDetailsOverViews
                    election={
                      //@ts-ignore
                      election?.data?.election
                    }
                  />
                </TabsContent>
                <TabsContent
                  value="candidates"
                  className="h-full border overflow-auto m-0 p-8"
                >
                  <ElectionDetailsCandidates electionId={electionId} />
                </TabsContent>
                <TabsContent
                  value="voters"
                  className="h-full border overflow-auto m-0 p-8"
                >
                  <ElectionDetailsVoters electionId={electionId} />
                </TabsContent>
                <TabsContent
                  value="results"
                  className="h-full border overflow-auto m-0 p-8"
                >
                  <ElectionDetailsResults
                    //@ts-ignore
                    electionId={electionId}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isStartDialogOpen} onOpenChange={setIsStartDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Confirmation de démarrage
            </DialogTitle>
            <div className="pt-2 space-y-2">
              <div>
                <h1>
                  Êtes-vous sûr de vouloir démarrer cette élection ? Cette
                  action permettra aux électeurs de commencer à voter.
                </h1>
              </div>
              <p className="bg-orange-50 p-3 rounded-sm text-sm text-orange-800 mt-2">
                <strong>Attention :</strong> Une fois l'élection démarrée,
                certains paramètres ne pourront plus être modifiés.
              </p>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="rounded-sm"
              size="sm"
              variant="outline"
              onClick={() => setIsStartDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button
              size="sm"
              className="bg-green-600 rounded-sm hover:bg-green-700 text-white"
              onClick={handleStartElection}
            >
              <Check className="mr-1" size={14} />
              Oui
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

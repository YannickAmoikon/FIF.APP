"use client";

import { useState } from "react";
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
import { useGetPollByIdQuery } from "@/services/poll.services";
import {
  AlertTriangle,
  ArrowLeft,
  BookCheck,
  BookOpen,
  ChartLine,
  Check,
  MoreVertical,
  ThumbsUp,
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
import PollDetailsOverViews from "@/components/features/pollDetails/PollDetailsOverViews";
import PollDetailsOptions from "@/components/features/pollDetails/PollDetailsOptions";
import PollsDetailsVoters from "@/components/features/pollDetails/PollsDetailsVoters";
import PollDetailsResults from "@/components/features/pollDetails/PollDetailsResults";

const tabs = [
  { title: "informations générales", value: "overview" },
  { title: "liste des options", value: "options" },
  { title: "liste des électeurs", value: "voters" },
  { title: "apercu des votes", value: "results" },
];

// Interface pour un options
interface Option {
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

// Interface pour un sondage
interface Poll {
  id: number;
  date_time_start: string;
  date_time_end: string;
  title: string;
  description: string;
  statut: "coming" | "in progress" | "finished";
  type: "Private" | "Public" | "Mixt";
  created_at: string;
  updated_at: string;
}

// Interface pour la réponse de l'API
interface PollDetailResponse {
  message: string;
  data: {
    poll: Poll;
    options: Option[];
    votants: Voter[];
  };
}

export default function PollDetailsPage() {
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pollId = params?.id as string;
  const activeTab = searchParams.get("tab") || "overview";

  const {
    data: poll,
    //@ts-ignore
    isLoading,
    //@ts-ignore
    isError,
  } = useGetPollByIdQuery<PollDetailResponse>(Number(pollId));

  const handleTabChange = (value: string) => {
    router.push(`/back/dashboard/poll/${pollId}?tab=${value}`);
  };

  const handleStartPoll = () => {
    toast({
      title: "Sondage démarré",
      description: "Le sondage a été démarrée avec succès.",
      className: "bg-green-600 text-white",
    });
    setIsStartDialogOpen(false);
  };

  return (
    <main className="flex bg-secondary flex-1 h-full">
      <Toaster />
      <Card className="flex-1 bg-secondary rounded-none shadow-none border-0">
        <CardHeader className="border-b-2 flex flex-row items-center justify-between p-6">
          <div className="flex flex-col space-y-1.5">
            <CardTitle className="uppercase">
              {
                //@ts-ignore
                poll?.data?.title
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
                  <span>Démarrer le sondage</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              variant="secondary"
              className="border rounded-sm"
              onClick={() => router.push("/back/dashboard/poll")}
            >
              <ArrowLeft className="mr-1" size={14} />
              Retour
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 h-[calc(100vh-7rem)] flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <StatCard
              title="Total des options"
              value="0"
              icon={<BookOpen size={24} />}
            />
            <StatCard
              title="Total électeurs"
              value="0"
              icon={<Users size={24} />}
            />
            <StatCard
              title="Taux de progression des votes"
              value="0 %"
              icon={<ChartLine size={24} />}
            />
            <StatCard
              title="Décision du sondage"
              value="Non déterminé"
              icon={<BookCheck size={24} />}
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
                  <PollDetailsOverViews />
                </TabsContent>
                <TabsContent
                  value="options"
                  className="h-full border overflow-auto m-0 p-8"
                >
                  <PollDetailsOptions />
                </TabsContent>
                <TabsContent
                  value="voters"
                  className="h-full border overflow-auto m-0 p-8"
                >
                  <PollsDetailsVoters />
                </TabsContent>
                <TabsContent
                  value="results"
                  className="h-full border overflow-auto m-0 p-8"
                >
                  <PollDetailsResults />
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
                  Êtes-vous sûr de vouloir démarrer ce sondage ? Cette action
                  permettra aux électeurs de commencer à voter.
                </h1>
              </div>
              <p className="bg-orange-50 p-3 rounded-sm text-sm text-orange-800 mt-2">
                <strong>Attention :</strong> Une fois le sondage démarré,
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
              onClick={handleStartPoll}
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

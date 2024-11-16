"use client";

import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/app/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowLeft, ChartLine, Ellipsis, ThumbsUp, User, Users,
    UserCheck, AlertTriangle, Check
} from "lucide-react";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ElectionDetailsOverViews from "@/components/features/electionDetails/ElectionDetailsOverViews";
import ElectionDetailsCandidates from "@/components/features/electionDetails/ElectionDetailsCandidates";
import ElectionDetailsVoters from "@/components/features/electionDetails/ElectionDetailsVoters";
import ElectionDetailsResults from "@/components/features/electionDetails/ElectionDetailsResults";
import { useParams } from "next/navigation";

const tabs = [
    { title: "informations générales", value: "overview" },
    { title: "liste des candidats", value: "candidates" },
    { title: "liste des électeurs", value: "voters" },
    { title: "résultats de l'élection", value: "results" }
];

export default function ElectionDetailsPage() {
    const [isStartDialogOpen, setIsStartDialogOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams();
    const electionId = params?.id as string;

    const handleStartElection = () => {
        toast({
            title: "Élection démarrée",
            description: "L'élection a été démarrée avec succès.",
            className: "bg-green-600 text-white",
        });
        setIsStartDialogOpen(false);
    };

    return (
        <main className="flex bg-secondary flex-1 h-full">
            <Toaster />
            <Card className="flex-1 bg-secondary rounded-none shadow-none border-0">
                <CardHeader className="border-b flex flex-row items-center justify-between py-4">
                    <div className="flex flex-col space-y-1.5">
                        <CardTitle className="uppercase">
                            Organisation de l'élection #{electionId}
                        </CardTitle>
                        <CardDescription>
                            Informations générales et statistiques
                        </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="secondary" className="border rounded-sm">
                                    <Ellipsis size={14} />
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
                            onClick={() => router.push('/dashboard/election')}
                        >
                            <ArrowLeft className="mr-1" size={14} />
                            Retour
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-4 h-[calc(100vh-6rem)] flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <StatCard
                            title="Total candidats"
                            value="10"
                            icon={<User size={24}/>}
                        />
                        <StatCard
                            title="Total électeurs"
                            value="230"
                            icon={<Users size={24}/>}
                        />
                        <StatCard
                            title="Taux de progression des votes"
                            value="86 %"
                            icon={<ChartLine size={24}/>}
                        />
                        <StatCard
                            title="Candidat en tête"
                            value="Amoikon Yannick"
                            icon={<UserCheck size={24}/>}
                        />
                    </div>

                    <div className="flex-1 flex flex-col min-h-0">
                        <Tabs defaultValue="overview" className="flex-1 flex border rounded-sm flex-col">
                            <TabsList className="space-x-2 w-full flex items-center rounded-sm justify-start py-5 border-b border-gray-200">
                                {tabs.map((tab) => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className=" uppercase w-6/12 py-1.5 px-4 text-xs rounded-none font-normal transition-colors duration-200 hover:border-gray-300 data-[state=active]:bg-secondary data-[state=active]:border-gray-300 data-[state=active]:text-gray-800"
                                    >
                                        {tab.title}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <div className="flex-1 bg-secondary">
                                <TabsContent value="overview" className="h-full border overflow-auto  m-0 p-8">
                                    <ElectionDetailsOverViews/>
                                </TabsContent>
                                <TabsContent value="candidates" className="h-full border overflow-auto  m-0 p-8">
                                    <ElectionDetailsCandidates/>
                                </TabsContent>
                                <TabsContent value="voters" className="h-full border overflow-auto  m-0 p-8">
                                    <ElectionDetailsVoters/>
                                </TabsContent>
                                <TabsContent value="results" className="h-full border overflow-auto  m-0 p-8">
                                    <ElectionDetailsResults/>
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
                        <DialogDescription className="pt-2 space-y-2">
                            <p>
                                Êtes-vous sûr de vouloir démarrer cette élection ?
                                Cette action permettra aux électeurs de commencer à voter.
                            </p>
                            <div className="bg-orange-50 p-3 rounded-sm text-sm text-orange-800 mt-2">
                                <strong>Attention :</strong> Une fois l'élection démarrée,
                                certains paramètres ne pourront plus être modifiés.
                            </div>
                        </DialogDescription>
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
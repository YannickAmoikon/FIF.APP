"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  Home,
  Vote,
  Award,
  Clock,
  Users,
  Info,
  Box,
  BarChart3,
  FileText,
  CheckCircle2,
  AlertCircle,
  CheckCheck,
  SquareX,
  Menu,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Election {
  id: number;
  title: string;
  description: string;
  type: string;
  voters_count: number;
  time_left: string;
  status: "en cours" | "terminé" | "à venir";
  candidates: {
    id: number;
    name: string;
    image: string;
    role: string;
    bio: string;
    votes_percentage?: number;
  }[];
}

export default function VoteForm() {
  const { toast } = useToast();
  const [elections] = useState<Election[]>([
    {
      id: 1,
      title: "Élection présidentielle FIF 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "Élection présidentielle",
      voters_count: 18,
      time_left: "Il y a 1 mois",
      status: "en cours",
      candidates: [
        {
          id: 1,
          name: "Konan Mathurin",
          role: "Candidat",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: "/1.png",
          votes_percentage: 48,
        },
        {
          id: 2,
          name: "Cissé Sekou D",
          role: "Candidat",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: "/2.png",
          votes_percentage: 30,
        },
      ],
    },
  ]);

  const confirmAbstention = () => {
    toast({
      title: "Pas de vote",
      description: "Vous avez décidez de ne pas voter... ",
      className: "bg-green-600 text-white",
    });
  };

  const [abstentionConfirmationDialog, setAbstentionConfirmationDialog] =
    useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState<
    Election["candidates"][0] | null
  >(null);
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "en cours":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "terminé":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "à venir":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en cours":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "terminé":
        return "bg-green-100 text-green-800 border-green-200";
      case "à venir":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleVoteConfirmation = () => {
    if (!selectedCandidate) return;

    toast({
      title: "Vote enregistré avec succès",
      description: `Vous avez voté pour ${selectedCandidate.name}`,
      className: "bg-green-600 text-white",
    });
    setIsVoteDialogOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <main className="min-h-screen bg-[#FDF8F3]">
      {/* Header responsive */}
      <header className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
          <div className="flex items-center gap-4 md:gap-8">
            <Image
              src="/fifLogo.png"
              alt="Logo FIF"
              width={50}
              height={50}
              className="hover:scale-105 transition-transform"
            />
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-4 lg:gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="text-sm">Accueil</span>
              </Link>
              <Link
                href="/sujet-de-vote"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Vote className="w-5 h-5" />
                <span className="text-sm">Sujet de vote</span>
              </Link>
              <Link
                href="/election-presidentielle"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Award className="w-5 h-5" />
                <span className="text-sm">Élection présidentielle</span>
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Image
                      src="/fifLogo.png"
                      alt="Logo FIF"
                      width={40}
                      height={40}
                    />
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className="w-5 h-5" />
                    Accueil
                  </Link>
                  <Link
                    href="/sujet-de-vote"
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Vote className="w-5 h-5" />
                    Sujet de vote
                  </Link>
                  <Link
                    href="/election-presidentielle"
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Award className="w-5 h-5" />
                    Élection présidentielle
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Contenu principal responsive */}
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="space-y-6">
          {elections.map((election) => (
            <Card
              key={election.id}
              className="bg-white rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4 md:p-6">
                {/* En-tête de la carte responsive */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                  <div className="space-y-2 w-full">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {election.type}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 ${getStatusColor(election.status)}`}
                      >
                        {getStatusIcon(election.status)}
                        {election.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Users className="w-4 h-4" />
                        {election.voters_count} électeurs
                      </Badge>
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {election.time_left}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 flex items-center gap-1 w-full sm:w-auto justify-center"
                  >
                    <Info className="w-4 h-4" />
                    Plus de détails
                  </Button>
                </div>

                {/* Contenu de l'élection */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h2 className="font-medium text-lg flex items-center gap-2 mb-2">
                      <Box className="w-5 h-5 text-orange-500" />
                      Élection
                    </h2>
                    <p className="text-gray-600 ml-7">{election.title}</p>
                  </div>
                  <div>
                    <h2 className="font-medium text-lg flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-orange-500" />
                      Description
                    </h2>
                    <p className="text-gray-600 ml-7">{election.description}</p>
                  </div>
                </div>

                {/* Section des candidats responsive */}
                <div className="space-y-6">
                  {/* Grille des candidats responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    {election.candidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="flex flex-col items-center"
                      >
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="text-center cursor-pointer">
                              <div className="relative w-32 h-32 mx-auto mb-4">
                                <Image
                                  src={candidate.image}
                                  alt={candidate.name}
                                  fill
                                  className="rounded-full object-cover border-4 border-white shadow-lg hover:scale-105 transition-transform bg-gray-50"
                                />
                                {selectedCandidate?.id === candidate.id && (
                                  <div className="absolute -bottom-2 -right-2 bg-orange-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                )}
                              </div>
                              <h3 className="font-medium text-lg">
                                {candidate.name}
                              </h3>
                              <p className="text-gray-500 text-sm mb-2">
                                {candidate.role}
                              </p>

                              <div className="w-full max-w-[200px] mx-auto">
                                <div className="bg-gray-100 rounded-full h-2.5">
                                  <div
                                    className="bg-orange-500 h-2.5 rounded-full transition-all duration-500"
                                    style={{
                                      width: `${candidate.votes_percentage || 0}%`,
                                    }}
                                  />
                                </div>
                                <span className="font-medium text-lg text-orange-500 mt-2">
                                  {candidate.votes_percentage || 0}%
                                </span>
                              </div>
                            </div>
                          </HoverCardTrigger>

                          <HoverCardContent className="w-80 p-4">
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 relative">
                                  <Image
                                    src={candidate.image}
                                    alt={candidate.name}
                                    fill
                                    className="rounded-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold">
                                    {candidate.name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {candidate.role}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <h5 className="font-medium text-sm">
                                  Biographie
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {candidate.bio}
                                </p>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>

                        <Button
                          variant={
                            selectedCandidate?.id === candidate.id
                              ? "default"
                              : "outline"
                          }
                          className={`rounded-md mt-4 w-1/3 ${
                            selectedCandidate?.id === candidate.id
                              ? "bg-green-600 hover:bg-green-600 text-white"
                              : "hover:bg-green-100"
                          }`}
                          onClick={() => setSelectedCandidate(candidate)}
                        >
                          <CheckCheck className="w-7 h-7 mr-1" />
                          {selectedCandidate?.id === candidate.id
                            ? "Candidat sélectionné"
                            : "Sélectionner"}
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Bouton de vote responsive */}
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-5 justify-center border-t pt-8">
                    <Button
                      className="bg-green-600 hover:bg-green-600 text-white rounded-md text-lg shadow-md w-full sm:w-auto"
                      onClick={() => setIsVoteDialogOpen(true)}
                      disabled={!selectedCandidate}
                    >
                      Confirmer
                    </Button>
                    <Button
                      onClick={() => setAbstentionConfirmationDialog(true)}
                      className="bg-red-600 hover:bg-red-600 text-white rounded-md text-lg shadow-md w-full sm:w-auto"
                    >
                      S'abstenir
                    </Button>
                    <Dialog
                      open={abstentionConfirmationDialog}
                      onOpenChange={setAbstentionConfirmationDialog}
                    >
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                            Confirmation d'absention ?
                          </DialogTitle>
                          <DialogDescription className="pt-2">
                            Êtes-vous sûr de vouloir vous abstenir de vote ?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-sm"
                            onClick={() => {
                              setAbstentionConfirmationDialog(false);
                            }}
                          >
                            Annuler
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-sm bg-green-600 hover:bg-green-600"
                            onClick={() => {
                              setAbstentionConfirmationDialog(false);
                              confirmAbstention();
                            }}
                          >
                            <Check className="mr-1" size={14} />
                            Oui
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer responsive */}
      <footer className="bg-[#2B6858] text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Vote className="w-8 h-8 text-[#2B6858]" />
              </div>
              <p className="text-sm px-4 sm:px-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileText className="w-8 h-8 text-[#2B6858]" />
              </div>
              <p className="text-sm px-4 sm:px-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <BarChart3 className="w-8 h-8 text-[#2B6858]" />
              </div>
              <p className="text-sm px-4 sm:px-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </p>
            </div>
          </div>
          <div className="text-center mt-12 pt-8 border-t border-green-700">
            <p className="text-sm flex items-center justify-center gap-2">
              <Award className="w-4 h-4" />
              Fédération Ivoirienne de Football - FIF 2024
            </p>
          </div>
        </div>
      </footer>

      {/* Dialog de confirmation responsive */}
      <Dialog open={isVoteDialogOpen} onOpenChange={setIsVoteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] w-[95%] max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5 text-orange-500" />
              Confirmation de vote
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir voter pour{" "}
              <span className="font-semibold text-orange-500">
                {selectedCandidate?.name}
              </span>
              ? Cette action est définitive et ne pourra pas être modifiée.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {selectedCandidate && (
              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-md">
                <div className="w-16 h-16 relative">
                  <Image
                    src={selectedCandidate.image}
                    alt={selectedCandidate.name}
                    fill
                    className="rounded-full object-cover border-2 border-white"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{selectedCandidate.name}</h4>
                  <p className="text-sm text-gray-500">
                    {selectedCandidate.role}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => {
                  setIsVoteDialogOpen(false);
                  setSelectedCandidate(null);
                }}
              >
                Annuler
              </Button>
              <Button
                type="button"
                className="bg-orange-500 hover:bg-orange-600 gap-2 w-full sm:w-auto"
                onClick={handleVoteConfirmation}
              >
                <Vote className="h-4 w-4" />
                Confirmer mon vote
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

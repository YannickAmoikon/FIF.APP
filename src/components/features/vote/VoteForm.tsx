"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Check, 
    X, 
    ChevronRight, 
    Home, 
    Vote, 
    Award,
    Clock,
    Users,
    Info,
    LogIn,
    Box,
    BarChart3,
    FileText,
    CheckCircle2,
    AlertCircle,
    CheckCheck
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
// Importation de useToast corrigée
import { useToast } from "@/hooks/use-toast";

interface Election {
    id: number;
    title: string;
    description: string;
    type: string;
    voters_count: number;
    time_left: string;
    status: 'en cours' | 'terminé' | 'à venir';
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
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            type: "Élection présidentielle",
            voters_count: 1598,
            time_left: "Il y a 1 mois",
            status: "en cours",
            candidates: [
                {
                    id: 1,
                    name: "Konan Mathurin",
                    role: "Candidat",
                    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4",
                    votes_percentage: 60
                },
                {
                    id: 2,
                    name: "Cissé Sekou D",
                    role: "Candidat",
                    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=ffdfbf",
                    votes_percentage: 40
                }
            ]
        },
        // Vous pouvez ajouter d'autres élections ici
    ]);

    const [selectedCandidate, setSelectedCandidate] = useState<Election['candidates'][0] | null>(null);
    const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'en cours':
                return <Clock className="w-4 h-4 text-orange-500" />;
            case 'terminé':
                return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case 'à venir':
                return <AlertCircle className="w-4 h-4 text-blue-500" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'en cours':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'terminé':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'à venir':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const handleVoteConfirmation = () => {
        if (!selectedCandidate) return;

        // Ici vous ajouterez la logique d'API pour enregistrer le vote
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
            {/* Header avec ombre et animation au scroll */}
            <header className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <div className="flex items-center gap-8">
                        <Image 
                            src="/logo.png" 
                            alt="Logo FIF" 
                            width={50} 
                            height={50}
                            className="hover:scale-105 transition-transform"
                        />
                        <nav className="flex gap-6">
                            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                                <Home className="w-4 h-4" />
                                <span>Accueil</span>
                            </Link>
                            <Link href="/sujet-de-vote" className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                                <Vote className="w-7 h-7" />
                                <span>Sujet de vote</span>
                            </Link>
                            <Link href="/election-presidentielle" className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                                <Award className="w-4 h-4" />
                                <span>Élection présidentielle</span>
                            </Link>
                        </nav>
                    </div>
                    <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center gap-2">
                        <LogIn className="w-4 h-4" />
                        Connexion
                    </Button>
                </div>
            </header>

            {/* Breadcrumb amélioré */}
            <div className="container mx-auto py-4 px-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Link href="/" className="flex items-center gap-1 hover:text-orange-500 transition-colors">
                        <Home className="w-4 h-4" />
                        Accueil
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-orange-500 font-medium">Élection présidentielle</span>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="container mx-auto py-8 px-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold flex items-center gap-2">
                        <Vote className="w-6 h-6 text-orange-500" />
                        Liste d'élections présidentielles
                    </h1>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {elections.reduce((acc, curr) => acc + curr.voters_count, 0)} votants
                        </Badge>
                    </div>
                </div>
                
                <div className="space-y-6">
                    {elections.map((election) => (
                        <Card key={election.id} className="bg-white rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                {/* En-tête de la carte */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1">
                                                <Award className="w-4 h-4" />
                                                {election.type}
                                            </Badge>
                                            <Badge variant="outline" className={`flex items-center gap-1 ${getStatusColor(election.status)}`}>
                                                {getStatusIcon(election.status)}
                                                {election.status}
                                            </Badge>
                                            <Badge variant="outline" className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                {election.voters_count} votants
                                            </Badge>
                                            <span className="text-gray-500 text-sm flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {election.time_left}
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="text-orange-500 hover:text-orange-600 flex items-center gap-1">
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

                                {/* Section des candidats */}
                                <div className="space-y-6">
                                    {/* Grille des candidats */}
                                    <div className="grid grid-cols-2 gap-8 mb-8">
                                        {election.candidates.map((candidate) => (
                                            <div key={candidate.id} className="flex flex-col items-center">
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
                                                            <h3 className="font-medium text-lg">{candidate.name}</h3>
                                                            <p className="text-gray-500 text-sm mb-2">{candidate.role}</p>
                                                            
                                                            <div className="w-full max-w-[200px] mx-auto">
                                                                <div className="bg-gray-100 rounded-full h-2.5">
                                                                    <div 
                                                                        className="bg-orange-500 h-2.5 rounded-full transition-all duration-500" 
                                                                        style={{ width: `${candidate.votes_percentage || 0}%` }}
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
                                                                    <h4 className="font-semibold">{candidate.name}</h4>
                                                                    <p className="text-sm text-gray-500">{candidate.role}</p>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <h5 className="font-medium text-sm">Biographie</h5>
                                                                <p className="text-sm text-gray-600">{candidate.bio}</p>
                                                            </div>
                                                        </div>
                                                    </HoverCardContent>
                                                </HoverCard>

                                                <Button 
                                                    variant={selectedCandidate?.id === candidate.id ? "default" : "outline"}
                                                    className={`rounded-md mt-4 ${
                                                        selectedCandidate?.id === candidate.id 
                                                            ? "bg-green-600 hover:bg-green-600 text-white" 
                                                            : "hover:bg-green-100"
                                                    }`}
                                                    onClick={() => setSelectedCandidate(candidate)}
                                                >
                                                    <CheckCheck className="w-7 h-7 mr-1"/>
                                                    {selectedCandidate?.id === candidate.id ? "Candidat sélectionné" : "Sélectionner"}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bouton de vote en bas toujours visible */}
                                    <div className="flex justify-center border-t pt-8">
                                        <Button 
                                            size="lg"
                                            className="bg-green-600 hover:bg-green-600 text-white rounded-md px-8 py-6 text-lg shadow-lg"
                                            onClick={() => setIsVoteDialogOpen(true)}
                                            disabled={!selectedCandidate} // Désactivé si aucun candidat n'est sélectionné
                                        >
                                            <Vote className="w-6 h-6 mr-2" />
                                            Confirmer mon vote
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Footer amélioré */}
            <footer className="bg-[#2B6858] text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-3 gap-8">
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Vote className="w-8 h-8 text-[#2B6858]" />
                            </div>
                            <p className="text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                <FileText className="w-8 h-8 text-[#2B6858]" />
                            </div>
                            <p className="text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                <BarChart3 className="w-8 h-8 text-[#2B6858]" />
                            </div>
                            <p className="text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
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

            {/* Ajouter le Dialog de confirmation */}
            <Dialog open={isVoteDialogOpen} onOpenChange={setIsVoteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
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
                                    <p className="text-sm text-gray-500">{selectedCandidate.role}</p>
                                </div>
                            </div>
                        )}

                        <DialogFooter className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsVoteDialogOpen(false);
                                    setSelectedCandidate(null);
                                }}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="button"
                                className="bg-orange-500 hover:bg-orange-600 gap-2"
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
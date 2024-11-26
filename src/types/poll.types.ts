// Types for Poll Response

export interface PollType {
  id: number;
  title: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  type_id: number;
  type: string;
  statut: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PollResponse {
  message: string;
  data: PollType[];
  totalSondages: number;
  page: number;
  totalPages: number;
}

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

export interface PollDetailResponse {
  message: string;
  data: {
    poll: PollType;
    candidats: Option[];
    votants: Voter[];
  };
}

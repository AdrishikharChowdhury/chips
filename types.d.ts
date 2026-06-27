export interface Components {
  title: string;
  author: string;
  description: string;
  genre: string;
  rating: number;
  total_copies: number;
  available_copies: number;
  cover: string;
  id: number;
  video: string;
  summary: string;
  isLoaned?: boolean;
}

export interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

export interface AdminSideBarLink {
  icon: string;
  text: string;
}
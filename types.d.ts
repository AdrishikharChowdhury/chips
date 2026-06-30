export interface Components {
  title: string;
  manufacturer: string;
  description: string;
  type: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  cover: string;
  id: string;
  summary: string;
  createdAt: Date | null;
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

export interface ComponentParams {
  title: string;
  manufacturer: string;
  description: string;
  type: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  cover: string;
  summary: string;
}
export interface BorrowComponentParams {
  componentId: string;
  dueDate: Date;
  amount?: number;
}

export interface CartItem {
  id: string;
  userId: string;
  componentId: string;
  createdAt: Date;
}


export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  size?: 'pequeño' | 'mediano' | 'grande';
  sex?: 'macho' | 'hembra';
  description?: string;
  temperament?: string;
  specialNeeds?: string;
  history?: string;
  photoUrl: string; // Assuming a single main photo for now
  organizationId?: string;
  createdAt?: string;
  updatedAt?: string;
}

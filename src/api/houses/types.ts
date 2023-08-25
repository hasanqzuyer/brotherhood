import { TDocument } from 'api/documents/types';
import { TImage } from 'api/images/types';
import { IUser } from 'api/users/types';

export type TCreateHouse = {
  name: string;
  location: string;
  totalSpots: number;
  availableSpots: number;
  rent: number;
  theme: string;
  info: string;
  status: string;
  marketType: string;
};

export type TSingleHouse = {
  id: number;
};

export interface IHouse {
  id: number;
  name: string;
  location: string;
  totalSpots: number;
  availableSpots: number;
  rent: number;
  theme: string;
  info: string;
  status: string;
  marketType: string;
  assignee: IUser;
  images: TImage[];
  documents: TDocument[];
  createdAt: string;
  updatedAt: string;
}
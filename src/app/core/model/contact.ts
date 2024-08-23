import {Utilisateur} from "./utilisateur.model";

export interface Contact {
  id: number;
  name: string;
  picture: string;
  website: string;
  address: string;
  mobile: string;
  email: string;
  users: Utilisateur[];
}

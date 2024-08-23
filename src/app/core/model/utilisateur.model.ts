import { Account } from "./account.model";
import { Role } from "./role.model";

export class Utilisateur {
    id !: number;
    username !: string;
    email !: string;
    password !: string;
    roles !: Role[];
    account !: Account;
    poste!: string;
    contact_id!:number;
}

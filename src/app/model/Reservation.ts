import { OrdinateurService } from "../service/ordinateur.service";
import { Ordinateur } from "./Ordinateur";
import { Utilisateur } from "./Utilisateur";

export class Reservation{
    id!: number;
    dateDebutReservation!: Date;
    dateFinReservation!: Date;
    dateCreate!: Date;
    dateUpdate!: Date;
    status!: string;
    etat!: boolean;
    utilisateur!:Utilisateur;
    ordinateur!:Ordinateur;
    constructor(){}
}
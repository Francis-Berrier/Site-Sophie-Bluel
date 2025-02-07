import { checkEditAccueil } from "../functions/checkEditMode.js";
import{ chargeProjets } from "../functions/projets.js";
import { filtres } from "../functions/filtres.js";

export async function pageAccueilControl() {
    checkEditAccueil();
    chargeProjets();
    filtres();
}
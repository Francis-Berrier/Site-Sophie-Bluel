import { checkEditMode } from "./checkEditMode.js";
import{ chargeProjets, filtres } from "./methods.js";

export async function loadPageAccueil() {
    document.getElementById("page-accueil-container").innerHTML = "";
    const reponse = await fetch("templates/page-accueil.html");
    const template = await reponse.text();
    
    document.getElementById("page-accueil-container").innerHTML = template;
    checkEditMode();
    
    chargeProjets();
    filtres();
} 
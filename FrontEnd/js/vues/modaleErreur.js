import { erreurControl } from "../controllers/erreurControl.js";

export async function loadModaleErreur(erreur) {

    document.getElementById("modale-erreur-container").innerHTML = ""; 
    const reponse = await fetch("templates/modale-erreur.html");
    const template = await reponse.text();
    document.getElementById("modale-erreur-container").innerHTML = template; 

    erreurControl(erreur);
}
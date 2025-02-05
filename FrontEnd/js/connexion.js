import { formLogin } from "./loginFunctions.js";

export async function loadConnexion() {
    document.getElementById("page-connexion-container").innerHTML = "";
    document.getElementById("page-accueil-container").style.display= "none";

    const reponse = await fetch("templates/connexion.html");
    const template = await reponse.text();
    
    document.getElementById("page-connexion-container").innerHTML = template;  
    formLogin()
}
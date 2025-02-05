import {gestionModal} from "./modaleMethods.js";

export async function loadModaleEdit() {
    document.getElementById("modale-edit-container").innerHTML = "";
    const reponse = await fetch("templates/modale-edition.html");
    const template = await reponse.text();
    
    document.getElementById("modale-edit-container").innerHTML = template;
    gestionModal();  
}
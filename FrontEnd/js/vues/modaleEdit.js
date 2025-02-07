import { modaleEditControl } from "../controllers/modaleEditControl.js";

export async function loadModaleEdit() {
    document.getElementById("modale-edit-container").innerHTML = "";
    const reponse = await fetch("templates/modale-edition.html");
    const template = await reponse.text();
    
    document.getElementById("modale-edit-container").innerHTML = template;
    
    modaleEditControl();  
}
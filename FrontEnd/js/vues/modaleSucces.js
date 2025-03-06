import {succesControl} from "../controllers/succesControl.js";

export async function loadModaleSucces(message) {

    document.getElementById("modale-succes-container").innerHTML = ""; 
    const reponse = await fetch("templates/modale-succes.html");
    const template = await reponse.text();
    document.getElementById("modale-succes-container").innerHTML = template; 

    succesControl(message);
} 
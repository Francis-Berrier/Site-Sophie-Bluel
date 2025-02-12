import { loadModaleErreur } from "../vues/modaleErreur.js";


export async function erreur(erreurMsg) {
    loadModaleErreur();
    const modale = document.getElementById("modal2");
    const erreurContainer = document.getElementById("erreur");
    erreurContainer.innerText = erreurMsg;

    modale.addEventListener("click", () => {
        document.getElementById("modale-erreur-container").innerHTML = "";
    })
}
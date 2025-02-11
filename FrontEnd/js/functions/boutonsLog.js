import { loadHeader } from "../vues/header.js";
import { loadPageAccueil } from "../vues/pageAccueil.js";
import { loadConnexion } from "../vues/connexion.js";
import { retourPageAccueil } from "./retourPageAccueil.js";


export function boutonsLog() {
    let loginLink = document.querySelector("#login-link");
    let logoutLink = document.querySelector("#logout-link");
    let ancreProjets = document.querySelector("#ancre-projets");
    let ancreContacts = document.querySelector("#ancre-contacts");

    loginLink.addEventListener("click", function() {
        loadConnexion();
    })
    logoutLink.addEventListener("click", function(){
        window.sessionStorage.removeItem("authData");
        loadHeader();
        loadPageAccueil();
    })
    ancreProjets.addEventListener("click", function(){
        retourPageAccueil();
    })
    ancreContacts.addEventListener("click", function(){
        retourPageAccueil()
    })
}

export function logOut() {
    window.sessionStorage.removeItem("authData");
        loadHeader();
        loadPageAccueil();
}

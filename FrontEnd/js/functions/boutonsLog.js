import { loadHeader } from "../vues/header.js";
import { loadPageAccueil } from "../vues/pageAccueil.js";
import { loadConnexion } from "../vues/connexion.js";
import { retourPageAccueil } from "./retourPageAccueil.js";


export function boutonsLog() {
    let loginLink = document.querySelector("#login-link");
    let logoutLink = document.querySelector("#logout-link");
    let ancreProjets = document.querySelector("#ancre-projets");
    let ancreContacts = document.querySelector("#ancre-contacts");
    let headerLogo = document.querySelector("#header-logo");

    loginLink.addEventListener("click", function() {
        if(!loginLink.classList.contains("checked")) {
        loginLink.innerHTML="";
        loginLink.innerHTML="<span>login</span>";
        loginLink.classList.add("checked");
        loadConnexion();
        }
    })
    logoutLink.addEventListener("click", function(){
        logOut();
    })
    ancreProjets.addEventListener("click", function(){
        retourPageAccueil();
    })
    ancreContacts.addEventListener("click", function(){
        retourPageAccueil()
    })
    headerLogo.addEventListener("click", function(){
        retourPageAccueil()
    })
}

export function logOut() {
    window.sessionStorage.removeItem("authData");
        loadHeader();
        loadPageAccueil();
}

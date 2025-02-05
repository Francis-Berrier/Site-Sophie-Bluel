import { loadHeader } from "./header.js";
import { loadPageAccueil } from "./pageAccueil.js";
import { loadConnexion } from "./connexion.js";

export function boutonsLog() {
    let loginLink = document.querySelector("#login-link");
    let logoutLink = document.querySelector("#logout-link");
    loginLink.addEventListener("click", function() {
        document.getElementById("page-accueil-container").style.display= "none";
        loadConnexion();
    })
    logoutLink.addEventListener("click", function(){
        window.sessionStorage.removeItem("authData");
        loadHeader();
        loadPageAccueil();
    })
}

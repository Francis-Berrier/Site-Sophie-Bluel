import { loadModaleEdit } from "../vues/modaleEdit.js";
import { loadHeader } from "../vues/header.js";
import { loadModaleErreur } from "../vues/modaleErreur.js";
import { logOut } from "./boutonsLog.js";

export function checkEditAccueil(){

    let auth = verifAuthorisation();
    let boutonEdit = document.querySelector("#button");
    let filtres = document.querySelector(".filtres");
    
    if(auth !== null) {
        if (filtres && filtres.style.display==="flex"){
            filtres.style.display="none";
        }
        if (boutonEdit && boutonEdit.style.display==="none"){
            boutonEdit.style.display="flex";
        }
        loadHeader();
        loadModaleEdit();

    }else{
        document.getElementById("modale-edit-container").innerHTML = "";
        if (filtres && filtres.style.display==="none"){
            filtres.style.display="flex";
        }
        if (boutonEdit && boutonEdit.style.display==="flex"){
            boutonEdit.style.display="none";
        }
    }
}
export function checkEditHeader() {

    let auth = verifAuthorisation();
    let banniereEdit = document.querySelector("#banniere-edit");
    let loginLink = document.querySelector("#login-link");
    let logoutLink = document.querySelector("#logout-link");
    
    if(auth !== null) {
        if(logoutLink && loginLink){
            if(logoutLink.classList.contains("hidden")){
                logoutLink.classList.remove("hidden");
                loginLink.classList.add("hidden");
            }
        }
        if (banniereEdit && banniereEdit.style.display==="none"){
            banniereEdit.style.display="flex";
        }

    }else{
        if(logoutLink && loginLink){
            if(loginLink.classList.contains("hidden")){
                loginLink.classList.remove("hidden");
                logoutLink.classList.add("hidden");
            }
        }
        if (banniereEdit && banniereEdit.style.display==="flex"){
            banniereEdit.style.display="none";
        }
    }
}
function verifAuthorisation() {

    let auth = null;
    const authData = window.sessionStorage.getItem("authData");
    try{
        try{
            if (authData) {
                auth= JSON.parse(authData);
            }
        }catch (error){
            throw new Error("Problème d'identification, veuillez vous reconnecter")
        }
    } catch (error){
        loadModaleErreur();
        logOut();   
    }
    return auth;
}
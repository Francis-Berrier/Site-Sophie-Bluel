import { loadModaleEdit } from "./modaleEdit.js";
import { loadHeader } from "./header.js";

export function checkEditMode(){

    const authData = window.sessionStorage.getItem("authData");
    const auth= JSON.parse(authData)
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
       
        if (filtres && filtres.style.display==="none"){
            filtres.style.display="flex";
        }
       
        if (boutonEdit && boutonEdit.style.display==="flex"){
            boutonEdit.style.display="none";
        }
    }
}
export function checkEditHeader() {
    const authData = window.sessionStorage.getItem("authData");
    const auth= JSON.parse(authData)
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
import { retourPageAccueil } from "./retourPageAccueil.js";
import { checkEditAccueil} from "./checkEditMode.js";
import { loadHeader } from "../vues/header.js";


export async function miseAJourProjets() {

    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();
    const worksJSON = JSON.stringify(works);

    window.localStorage.setItem("works", worksJSON);
    return works;
}
export async function miseAJourCategories() {

    const categoriesJSON = await fetch('http://localhost:5678/api/categories');
    const categories = await categoriesJSON.json();

    window.localStorage.setItem("categories", categoriesJSON);
    return categories;
}
export async function requeteDelete(id, token) {
    const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers:  { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`}
    })
    return reponse.status;
}
export async function requeteAdd(auth, file) {
    const token = auth;
    let category= document.getElementById("category-form").value;
    let title= document.getElementById("title-form").value;
    const image = file;
    const formData= new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);
    const reponse = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {"Authorization": `Bearer ${token}`},
        body: formData
    });
    return reponse.status;
}
export async function requestLogin(email, password) {

    const data = {
        email: email,
        password: password
    }
    
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    console.log(reponse.status);
    if (reponse.status === 200){
        let authData = await reponse.json();
        authData = JSON.stringify(authData);
        sessionStorage.setItem("authData", authData);
        retourPageAccueil();
        checkEditAccueil();
        loadHeader();
    }else {
        let erreurContainer = document.querySelector("#erreur-connexion");
        if(erreurContainer.innerHTML === ""){
            const messageErreur = document.createElement("h3");
            messageErreur.innerText = "Erreur dans l'identifiant ou le mot de passe";
            erreurContainer.appendChild(messageErreur);
        }
    }  
}
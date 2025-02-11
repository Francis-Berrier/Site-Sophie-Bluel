import { retourPageAccueil } from "./retourPageAccueil.js";
import { checkEditAccueil} from "./checkEditMode.js";
import { loadHeader } from "../vues/header.js";
import { loadModaleErreur } from "../vues/modaleErreur.js";
import { loadConnexion } from "../vues/connexion.js";
import { clearformAdd, clearDropZone } from "./modaleProjets.js";

export async function miseAJourProjets() {
    try {
        const reponse = await fetch('http://localhost:5678/api/works');

        const contentType = reponse.headers.get("content-type");
        if (!reponse.ok) {
            throw new Error(`Impossible de charger les projets Erreur: ${reponse.status}`);
        }
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Réponse du serveur au mauvais format");
        }

        const works = await reponse.json();
        const worksJSON = JSON.stringify(works);

        window.localStorage.setItem("works", worksJSON);
        return works;

    }catch (error) {
        loadModaleErreur(error);
        return [];
    }
}
export async function miseAJourCategories() {
    try {
        const reponse = await fetch('http://localhost:5678/api/categories');

        
        const contentType = reponse.headers.get("content-type");
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP: ${reponse.status}`);
        }
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Réponse du serveur au mauvais format");
        }
    
        const categories = await reponse.json();
        const categoriesJSON = JSON.stringify(categories);


        window.localStorage.setItem("categories", categoriesJSON);
        return categories;
    
    }catch (error) {
        loadModaleErreur(error);
        return [];
    }
}
export async function requeteDelete(id, token) { 
    try {
        const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers:  { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`}
    })
        if (!reponse.ok){
            throw new Error(`Impossible de supprimer le projet (Erreur HTTP ${reponse.status})`)
        }
        return reponse;

    }catch (error) {
        loadModaleErreur(error);
    }
}
export async function requeteAdd(auth, file) {
    try{
        const token = auth;
        const category= document.getElementById("category-form").value;
        const title= document.getElementById("title-form").value;
        const image = file;
        const validTypes= ["image/jpeg", "image/png"];
        const maxSize = 4 * 1024 * 1024;

        if(!image || !validTypes.includes(image.type) || image.size > maxSize){
            throw new Error("L'image n'est pas conforme");
        }
        if(!category || !title) {
            throw new Error("Formulaire d'ajout incomplet")
        }
        const formData= new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", category);
        let reponse = null;
        try{
            reponse = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`},
                body: formData
            });
        }catch (error){
            throw new Error("L'ajout du fichier a échoué, veuillez recommencer");
        }
        return reponse;

    }catch (error){
        clearformAdd();
        clearDropZone();
        loadModaleErreur(error);
        return null;
    }
}
export async function requestLogin(email, password) {
    try {
        let reponse= null; 
        const data = {
            email: email,
            password: password
        }
        
        try{
            reponse = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        } catch (error){
            throw new Error (`Impossible de se connecter à votre page`);
        }

        if (!reponse.ok){
            throw new Error (`Erreur dans l'identifiant ou le mot de passe`);
        }

        let authData = await reponse.json();
        authData = JSON.stringify(authData);
        if (!authData) {
            throw new Error("Problème d'identification, veuillez vous reconnecter")
        }
        sessionStorage.setItem("authData", authData);
        retourPageAccueil();
        checkEditAccueil();
        loadHeader();

    } catch (error) {
        console.log(error);
        loadModaleErreur(error);
        loadConnexion();
    }
}
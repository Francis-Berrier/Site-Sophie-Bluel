import { loadModaleErreur } from "../vues/modaleErreur.js";
import { logOut } from "./boutonsLog.js";
import { miseAJourCategories } from "./requetes.js";

export async function getCategories() {

    const categoriesJSON = window.localStorage.getItem("categories");
    let categories = null;
    try {
        if (categoriesJSON){
            categories= JSON.parse(categoriesJSON);
        }
    } catch (error) {
        categories = null;
    }
    if (!categories) {
        categories = await miseAJourCategories();
    }
    return categories;
}
function genererCategoriesModal(categories){
    try {
        if(categories === null){
            throw new Error("Impossible de charger les catégories, ajout impossible");
        }
    } catch (error) {
        loadModaleErreur(error);
    }

    for(let i=0; i< categories.length; i++){

        const category = categories[i];

        const optionCategorie = document.createElement("option");
        optionCategorie.value = category.id;
        optionCategorie.innerText= category.name;

        document.querySelector("#category-form").appendChild(optionCategorie);
    }

}
export async function afficheCategoriesModal(){
    const categories= await getCategories();
    genererCategoriesModal(categories);
}
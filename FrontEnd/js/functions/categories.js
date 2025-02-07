import { miseAJourCategories } from "./requetes.js";

export async function getCategories() {
    const categoriesJSON = window.localStorage.getItem("categories");
    let categories
    if (categoriesJSON !== null){
        categories= JSON.parse(categoriesJSON);
    }else{
        categories = await miseAJourCategories();
    }
    return categories
}
function genererCategoriesModal(categories){

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
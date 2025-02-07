import { miseAJourProjets } from "./requetes.js";

export async function getProjets() {
    const worksJSON = window.localStorage.getItem("works");
    let works

    if (worksJSON !== null){
        works= JSON.parse(worksJSON);
    }else{
        works = await miseAJourProjets();
    }
    return works
}
export function genererProjets(works) {
    const projetsElements = document.querySelector('.gallery');
    projetsElements.innerHTML ="";

    for(let i=0; i < works.length; i++) {

        const projet = works[i];
    

        const projetElement = document.createElement("figure");
        projetElement.id = projet.categoryId;
        const projetImg = document.createElement("img");
        projetImg.src = projet.imageUrl;
        projetImg.alt = projet.title;
        const projetTitle = document.createElement("figcaption");
        projetTitle.innerText = projet.title;

        projetsElements.appendChild(projetElement);
        projetElement.appendChild(projetImg);
        projetElement.appendChild(projetTitle);
    }
}
export async function chargeProjets() {

    const works = await getProjets();
    genererProjets(works);
}
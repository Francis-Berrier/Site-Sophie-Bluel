export async function miseAJourProjets() {

    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();
    const worksJSON = JSON.stringify(works);

    window.localStorage.setItem("works", worksJSON);
    return works;
}
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
async function miseAJourCategories() {

    const categoriesJSON = await fetch('http://localhost:5678/api/categories');
    const categories = await categoriesJSON.json();

    window.localStorage.setItem("categories", categoriesJSON);
    return categories;
}
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

async function creerFiltres(){

    const categories = await getCategories();

    const boutonTous = document.createElement("button");
    boutonTous.id = "tous";
    boutonTous.innerText= "Tous";
    document.querySelector(".filtres").appendChild(boutonTous);

    for(let i=0; i< categories.length; i++){

        const filtre = categories[i];

        const boutonFiltrer = document.createElement("button");
        boutonFiltrer.id = filtre.id;
        boutonFiltrer.innerText= filtre.name;

        document.querySelector(".filtres").appendChild(boutonFiltrer);
    }

    
}

async function actionFiltres() {

    const boutonsFiltres = document.querySelectorAll(".filtres button");
    
    boutonsFiltres.forEach((button) => {

        button.addEventListener("click", async (event) =>{

            let id = event.target.id;

            const works = await getProjets();

            boutonsFiltres.forEach(button => button.classList.remove("clicked"));
            event.target.classList.toggle("clicked");

            if(id === "tous"){
                document.querySelector(".gallery").innerHTML = "";
                genererProjets(works);

            }else{
                id = parseInt(id);
                const worksFiltres = works.filter(p => p.categoryId === id);
                document.querySelector(".gallery").innerHTML = "";
                genererProjets(worksFiltres); 
            }
        })
    })
}
export async function filtres(){
    creerFiltres();
    actionFiltres();
}


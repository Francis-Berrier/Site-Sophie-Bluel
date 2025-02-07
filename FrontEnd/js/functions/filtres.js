import { getCategories } from "./categories.js";
import { getProjets, genererProjets } from "./projets.js";

async function creerFiltres(){

    const categories = await getCategories();

    const boutonTous = document.createElement("button");
    boutonTous.dataset.id = "tous";
    boutonTous.innerText= "Tous";
    document.querySelector(".filtres").appendChild(boutonTous);

    for(let i=0; i< categories.length; i++){

        const filtre = categories[i];

        const boutonFiltrer = document.createElement("button");
        boutonFiltrer.dataset.id = filtre.id;
        boutonFiltrer.innerText= filtre.name;

        document.querySelector(".filtres").appendChild(boutonFiltrer);
    }

    
}
async function actionFiltres() {

    const boutonsFiltres = document.querySelector(".filtres");
    
    boutonsFiltres.addEventListener("click", async (event) =>{
        
        let id = event.target.dataset.id;

        const works = await getProjets();

        document.querySelectorAll(".filtres button").forEach(button => button.classList.remove("clicked"));
        event.target.classList.add("clicked");

        if(id === "tous"){
            document.querySelector(".gallery").innerHTML = "";
            genererProjets(works);
        
        }else if (event.target.matches("button")) {
            id = parseInt(id);
            const worksFiltres = works.filter(p => p.categoryId === id);
            document.querySelector(".gallery").innerHTML = "";
            genererProjets(worksFiltres); 
        }
    })
}
export async function filtres(){
    creerFiltres();
    actionFiltres();
}
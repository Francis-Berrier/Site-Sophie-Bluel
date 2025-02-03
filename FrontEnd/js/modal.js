import { getProjets, getCategories, miseAJourProjets, chargeProjets } from "./methods.js";

export function affichageModal(){
    openCloseModal();
    changePageModal();
    afficheProjetsModal();
    afficheCategoriesModal();
    supprimerProjets();
    uploadImg();
}

function changePageModal(){

    document.querySelector("#btn-ajout").addEventListener("click", function() {
        document.querySelector("#modal-gallery").style.display = "none";
        document.querySelector("#modal-add").style.display = "flex";
        document.querySelector("#preview").style.display = "none";
        document.querySelector(".dropzone-content").style.display = "flex";


    });
    document.querySelector("#retour-gallery").addEventListener("click", function() {
        document.querySelector("#modal-gallery").style.display = "flex";
        document.querySelector("#modal-add").style.display = "none";
    });
}
function openCloseModal(){

    const btnModifier = document.querySelector("#button");
    btnModifier.addEventListener("click", function(){
        let displayModal = document.querySelector("#modal1");
        displayModal.style.display = "flex";

    });
    const btnFermer = document.querySelectorAll(".fermer-modal");

    btnFermer.forEach(button => { 
        button.addEventListener("click", function(){
            let displayModal = document.querySelector("#modal1");
            displayModal.style.display = "none";
            document.querySelector("#modal-gallery").style.display = "flex";
            document.querySelector("#modal-add").style.display = "none";
        })
    });

    const overlay = document.querySelector("#modal1");
    overlay.addEventListener("click", (event) => {
        if(event.target === overlay){
        overlay.style.display = "none";
        document.querySelector("#modal-gallery").style.display = "flex";
        document.querySelector("#modal-add").style.display = "none";
        }
    });
}
function genererProjetsModal(works) { 
    const projetsElements = document.querySelector('.photo-gallery');
    projetsElements.innerHTML= "";
    
    for(let i=0; i < works.length; i++) {
        const projet = works[i];

        const projetElement = document.createElement("figure");
        projetElement.id = projet.id;
        const projetImg = document.createElement("img");
        projetImg.src = projet.imageUrl;
        projetImg.alt = projet.title;
        const iconTrash = document.createElement("img");
        iconTrash.src = "/assets/icons/trash-can.png";
        iconTrash.classList.add("clic-trash");
        iconTrash.dataset.id = projet.id;
        const btnTrash = document.createElement("button");
        btnTrash.dataset.id = projet.id;
        btnTrash.classList.add("trash");
        btnTrash.classList.add("clic-trash");
        btnTrash.appendChild(iconTrash);

        projetsElements.appendChild(projetElement);
        projetElement.appendChild(btnTrash);
        projetElement.appendChild(projetImg);
        
    }
}
async function afficheProjetsModal(){
    const works= await getProjets();
    genererProjetsModal(works);
}
function genererCategoriesModal(categories){

    for(let i=0; i< categories.length; i++){

        const categorie = categories[i];

        const optionCategorie = document.createElement("option");
        optionCategorie.value = categorie.id;
        optionCategorie.innerText= categorie.name;

        document.querySelector("#categorie").appendChild(optionCategorie);
    }

}
async function afficheCategoriesModal(){
    const categories= await getCategories();
    genererCategoriesModal(categories);
}
async function requeteDelete(id, token) {
    const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers:  { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`}
    })
    return reponse.status;
}
async function supprimerProjets() {

    document.addEventListener("click", async function(event) {
            if(event.target.classList.contains("clic-trash")){
            
                const authData = JSON.parse(window.sessionStorage.getItem("authData"));
                const token= authData.token;
                const id= event.target.dataset.id;
                const reponse= await requeteDelete(id, token);

                if (reponse === 204){
                    miseAJourProjets();
                    chargeProjets();
                    afficheProjetsModal();
                }else {
                    let erreurContainer = document.querySelector("#erreur-suppression");
                    if(erreurContainer.innerHTML === ""){
                        const messageErreur = document.createElement("p");
                        messageErreur.innerText = "Erreur: le fichier ne peut pas être supprimé";
                        erreurContainer.appendChild(messageErreur);
                        console.log("Erreur:", reponse);
                    }
                }
            }
        })
}
function uploadImg() {
    const imgDropzone = document.querySelector(".img-dropzone");
    const btnFileSelect= document.getElementById("file-select");
    const imgUpload = document.getElementById("img-upload");
    let file=null;

    imgDropzone.addEventListener("dragover", (event) =>{
        event.preventDefault();
        imgDropzone.classList.add("dragover");
    })

    imgDropzone.addEventListener("dragleave", (event) =>{
        event.preventDefault();
        imgDropzone.classList.remove("dragover");
    })

    imgDropzone.addEventListener("drop", (event) =>{
        event.preventDefault();
        imgDropzone.classList.remove("dragover");
        file = event.dataTransfer.files[0];
        const maxSize= 4 * 1024 *  1024;
        if(file && (file.type.startsWith("image/png")||(file.type.startsWith("image/jpeg"))) && file.size < maxSize) {
            afficherApercu(file);

        }else{
            document.querySelector(".message-img-type").style.display="none";
            document.querySelector(".erreur-img-type").style.display="block";
        }   
    })

    btnFileSelect.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        imgUpload.click()
    });
    imgUpload.addEventListener("click", (event) => {
        event.stopPropagation();
    });
    imgUpload.addEventListener("change", (event)=> {
        file = event.target.files[0];
        const maxSize= 4 * 1024 *  1024;
        if(file && (file.type.startsWith("image/png")||(file.type.startsWith("image/jpeg"))) && file.size < maxSize) {
            afficherApercu(file);

        }else{
            document.querySelector(".message-img-type").style.display="none";
            document.querySelector(".erreur-img-type").style.display="block";
            file = null;  
        }   
    })
    verifAddProjets(file);
    return file;
}

async function addProjets(file) {
    verifAddProjets(file);
    let categorieId = 0;
    let titre = "";
    const btnValider= querySelector(".add-projet");

    btnValider.addEventListener("click", function(){
        const categorie= document.querySelector("#categorie");
        categorieId= categorie.value;

        const titreBalise= document.querySelector("#titre");
        titre= titreBalise.innerText;
    })
    const reponse = fetch("");

}
function verifAddProjets(file) {
    let fileOk = false;
    const maxSize= 4 * 1024 *  1024;
    if((file.type.startsWith("image/png")||(file.type.startsWith("image/jpeg"))) && file.size<maxSize ) {
        fileOk = true;
    }
    const categorie= document.querySelector("#categorie");
    const categorieId= categorie.value;

    const titre= document.querySelector("#titre");

    if(fileOk && titre.innerText!="" && categorieId!=0){
        document.querySelector("#btn-valider").classList.replace("incomplet", "add-projet");
    }
}

function afficherApercu(file) {
    const preview = document.querySelector("#preview");
    const dropzoneContent = document.querySelector(".dropzone-content");
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
        preview.src = event.target.result;
        preview.style.display = "block";
        dropzoneContent.style.display = "none";
    }
}
import { getProjets } from "./projets.js";
import { requeteDelete, requeteAdd, miseAJourProjets } from "./requetes.js";
import { chargeProjets } from "./projets.js";


function genererProjetsModal(works) { 
    const projetsElements = document.querySelector('.photo-gallery');
    projetsElements.innerHTML= "";
    
    for(let i=0; i < works.length; i++) {
        const projet = works[i];

        const projetElement = document.createElement("figure");
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
export async function afficheProjetsModal(){
    const works= await getProjets();
    genererProjetsModal(works);
}
export async function supprimerProjets() {

    document.addEventListener("click", async function(event) {
            if(event.target.classList.contains("clic-trash")){
            
                const authData = JSON.parse(window.sessionStorage.getItem("authData"));
                const token= authData.token;
                const id= event.target.dataset.id;
                const reponse= await requeteDelete(id, token);
                console.log(reponse);

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
export function addProjets() {
    const imgDropzone = document.querySelector(".img-dropzone");
    const btnFileSelect= document.getElementById("file-select");
    const imgUpload = document.getElementById("image-form");
    const titreForm= document.getElementById("title-form");
    const categorieForm = document.getElementById("category-form");
    const btnValider= document.querySelector("#btn-valider");
    let verifFile = false;
    verifForm();

    imgDropzone.addEventListener("dragover", (event) =>{
        event.preventDefault();
        imgDropzone.classList.add("dragover");
    })
    imgDropzone.addEventListener("dragleave", (event) =>{
        event.preventDefault();
        imgDropzone.classList.remove("dragover");
    })

    imgDropzone.addEventListener("drop", async (event) =>{
        event.preventDefault();
        imgDropzone.classList.remove("dragover");

        const file = event.dataTransfer.files[0];
        const maxSize= 4 * 1024 *  1024;
        const validTypes= ["image/jpeg", "image/png"];

        if(file && validTypes.includes(file.type) && file.size <= maxSize) {

            verifFile = true;
            afficherApercu(file);
            verifForm();
            titreForm.addEventListener("input", () =>{verifForm()});
            categorieForm.addEventListener("change", () =>{verifForm()});

            btnValider.addEventListener("click", async function(){
                uploadProjets(file);
            })
            
        }else{
            document.querySelector(".message-img-type").style.display="none";
            document.querySelector(".erreur-img-type").style.display="block";
            clearformAdd();
        } 
    })

    btnFileSelect.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        imgUpload.click()
    });
    imgUpload.addEventListener("change", async (event)=> {
        const file = event.target.files[0];
        const maxSize= 4 * 1024 *  1024;
        const validTypes= ["image/jpeg", "image/png"];

        if(!file || !validTypes.includes(file.type) || file.size > maxSize) {
            document.querySelector(".message-img-type").style.display="none";
            document.querySelector(".erreur-img-type").style.display="block";
            clearformAdd();
            
        }   
        verifFile = true;
        afficherApercu(file);
        verifForm();
        console.log(event.target.files);
        titreForm.addEventListener("input", () =>{verifForm()});
        categorieForm.addEventListener("change", () =>{verifForm()});

        btnValider.addEventListener("click", async function(){
          uploadProjets(file);
        });
    })

    function verifForm() {
        const btnValider= document.querySelector("#btn-valider");
    
        const verifTitre = titreForm.value.trim() !== "";
        const verifCategorie = categorieForm.value > 0;

        btnValider.disabled = !(verifFile && verifTitre && verifCategorie);
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
async function uploadProjets(file) {
    const authData = JSON.parse(window.sessionStorage.getItem("authData"));
    const token= authData.token;
    const reponse= await requeteAdd(token, file);
    console.log(reponse);
    
    if (reponse === 201){
        miseAJourProjets();
        chargeProjets();
        afficheProjetsModal();
        clearformAdd();
    }else {
        let erreurContainer = document.querySelector("#erreur-ajout");
        if(erreurContainer.innerHTML === ""){
            const messageErreur = document.createElement("p");
            messageErreur.innerText = "Erreur: le fichier ne peut pas être créé";
            erreurContainer.appendChild(messageErreur);
            console.log("Erreur:", reponse);
            clearformAdd();
        }
    }     
}
export function clearformAdd() {
    document.querySelector("#preview").style.display = "none";
    document.querySelector(".dropzone-content").style.display = "flex";
    let image= document.getElementById("image-form");
    let newImage = image.cloneNode(true);
    image.parentNode.replaceChild(newImage, image);
    document.getElementById("ajout-nouveau-projet").reset();
    document.querySelector("#btn-valider").disabled= true;
}
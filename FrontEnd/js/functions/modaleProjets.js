import { getProjets } from "./projets.js";
import { requeteDelete, requeteAdd, miseAJourProjets } from "./requetes.js";
import { chargeProjets } from "./projets.js";
import { loadModaleErreur } from "../vues/modaleErreur.js";
import { loadImgDropzone } from "../vues/imgDropzone.js";


function genererProjetsModal(works) {
    try {
        if (works.length === 0) {
        throw new Error("Aucun travaux dans la base de données");
        }
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

    }catch (error){
        loadModaleErreur(error);
    }  
}
export async function afficheProjetsModal(){
    const works= await getProjets();
    genererProjetsModal(works);
}
export async function supprimerProjets() {

    document.addEventListener("click", async function(event) {
        if(event.target.classList.contains("clic-trash")){
            try {
                const authData = JSON.parse(window.sessionStorage.getItem("authData"));
                const token= authData.token;
                if (!token){
                    throw new Error('Impossible de vous identifier, veuillez vous reconnecter')
                }
                const id= event.target.dataset.id;
                await requeteDelete(id, token);
                
                miseAJourProjets();
                chargeProjets();
                afficheProjetsModal();
    
            } catch (error){
                loadModaleErreur(error);
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
    let btnValider= document.querySelector("#btn-valider");
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
        btnValider.replaceWith(btnValider.cloneNode(true)); 
        btnValider = document.querySelector("#btn-valider");
        let file = null;
        
        imgDropzone.classList.remove("dragover");
        file = event.dataTransfer.files[0];
        const maxSize= 4 * 1024 *  1024;
        const validTypes= ["image/jpeg", "image/png"];

        if(file && validTypes.includes(file.type) && file.size <= maxSize) {
          
            verifFile = true;
            afficherApercu(file);
            verifForm();
            titreForm.addEventListener("input", () =>{verifForm()});
            categorieForm.addEventListener("change", () =>{verifForm()});

            btnValider.addEventListener("click", async function(){
              await uploadProjets(file);
              loadImgDropzone();
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

        btnValider.replaceWith(btnValider.cloneNode(true)); 
        btnValider = document.querySelector("#btn-valider");

        btnValider.addEventListener("click", async function(){
          await uploadProjets(file);
          loadImgDropzone();
          file=null;
        });
    })

    function verifForm() {
    
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
    try {
        const authData = JSON.parse(window.sessionStorage.getItem("authData"));
        const token= authData.token;
        if (token === null){
            throw new Error(`Impossible de vous authentifier, essayez de vous reconnecter`)
        }
        const reponse= await requeteAdd(token, file);
        console.log(reponse);
        
        if (!reponse.ok){
            throw new Error(`Le projet ne peut pas être créé (Erreur: ${reponse})`);   
        }
        clearformAdd();
        miseAJourProjets();
        chargeProjets();
        afficheProjetsModal();
        

    }catch (error){
        loadModaleErreur(error);
    }  
}
export function clearformAdd() {
    document.querySelector("#preview").src="";
    let image= document.getElementById("image-form");
    if(image){
        let newImage = image.cloneNode(true);
        image.parentNode.replaceChild(newImage, image);
    }
    document.getElementById("ajout-nouveau-projet").reset();
    document.querySelector("#btn-valider").disabled= true;
}
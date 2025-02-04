import { getProjets, getCategories, miseAJourProjets, chargeProjets } from "./methods.js";

export function affichageModal(){
    openCloseModal();
    changePageModal();
    afficheProjetsModal();
    afficheCategoriesModal();
    supprimerProjets();
    addProjets();
}

function changePageModal(){

    document.querySelector("#btn-ajout").addEventListener("click", function() {
        document.querySelector("#modal-gallery").style.display = "none";
        document.querySelector("#modal-add").style.display = "flex";
        document.querySelector("#preview").style.display = "none";
        document.querySelector(".dropzone-content").style.display = "flex";
        let image= document.getElementById("image-form");
        let newImage = image.cloneNode(true);
        image.parentNode.replaceChild(newImage, image);
        document.getElementById("ajout-nouveau-projet").reset();
        document.querySelector("#btn-valider").disabled= true;


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

        const category = categories[i];

        const optionCategorie = document.createElement("option");
        optionCategorie.value = category.id;
        optionCategorie.innerText= category.name;

        document.querySelector("#category-form").appendChild(optionCategorie);
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
    const imgUpload = document.getElementById("image-form");
    const titreForm= document.getElementById("title-form");
    const categorieForm = document.getElementById("category-form");
    let file= null;
    let verifFile= false;

    function verifForm() {
        const btnValider= document.querySelector("#btn-valider");
    
        const verifTitre = titreForm.value.trim() !== "";
        const verifCategorie = categorieForm.value > 0;

        if(verifFile && verifTitre && verifCategorie) {
            btnValider.disabled= false;
        
        }else{
            btnValider.disabled= true;
        }
    }

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
        file = event.dataTransfer.files[0]; // file est définie auparavant
        const maxSize= 4 * 1024 *  1024;
        const validTypes= ["image/jpeg", "image/png"];
        if(file && validTypes.includes(file.type) && file.size <= maxSize) {
            let dataTransfer= new DataTransfer();
            dataTransfer.items.add(event.dataTransfer.files[0]);
            imgUpload.files=dataTransfer.files; // ajoute l'image à l'input type file
            verifFile = true;
            afficherApercu(file); // affiche un aperçu de l'image dans la dropzone
            verifForm(); // verifie que les champs du formulaire sont replis ou non

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
    //imgUpload.addEventListener("click", (event) => {
        //event.stopPropagation();
    //});
    imgUpload.addEventListener("change", (event)=> {
        const file = event.target.files[0];
        const maxSize= 4 * 1024 *  1024;
        const validTypes= ["image/jpeg", "image/png"];
        if(file && validTypes.includes(file.type) && file.size <= maxSize) {
            verifFile = true;
            afficherApercu(file);
            verifForm();

        }else{
            document.querySelector(".message-img-type").style.display="none";
            document.querySelector(".erreur-img-type").style.display="block";
            imgUpload.value="";
        }   
    });
    titreForm.addEventListener("input", () =>{verifForm()});
    categorieForm.addEventListener("change", () =>{verifForm()});

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
async function addProjets() {
    const file= uploadImg();
    const btnValider= document.querySelector("#btn-valider");

    btnValider.addEventListener("click", async function(){ 
        const authData = JSON.parse(window.sessionStorage.getItem("authData"));
        const token= authData.token;
        const reponse= await requeteAdd(token);
        document.querySelector("#preview").style.display = "none";
        document.querySelector(".dropzone-content").style.display = "flex";
        let image= document.getElementById("image");
        let newImage = image.cloneNode(true);
        image.parentNode.replaceChild(newImage, image);
        document.getElementById("ajout-nouveau-projet").reset();
        console.log(reponse.status);

        if (reponse === 201){
            miseAJourProjets();
            chargeProjets();
            afficheProjetsModal();
        }else {
            let erreurContainer = document.querySelector("#erreur-ajout");
            if(erreurContainer.innerHTML === ""){
                const messageErreur = document.createElement("p");
                messageErreur.innerText = "Erreur: le fichier ne peut pas être créé";
                erreurContainer.appendChild(messageErreur);
                console.log("Erreur:", reponse);
            }
        }   
    })
}
async function requeteAdd(auth) {
    const token = auth;
    let category= document.getElementById("category-form").value;
    let title= document.getElementById("title-form").value;
    let image= document.getElementById("image-form").files[0];
    console.log(category);
    console.log(title);
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


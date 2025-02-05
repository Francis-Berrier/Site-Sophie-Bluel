function uploadImg() {
    const imgDropzone = document.querySelector(".img-dropzone");
    const btnFileSelect= document.getElementById("file-select");
    const imgUpload = document.getElementById("image-form");
    const titreForm= document.getElementById("title-form");
    const categorieForm = document.getElementById("category-form");
    const file = chargeImage();
    let verifFile= file != null;

    imgDropzone.addEventListener("dragover", (event) =>{
        event.preventDefault();
        imgDropzone.classList.add("dragover");
    })

    imgDropzone.addEventListener("dragleave", (event) =>{
        event.preventDefault();
        imgDropzone.classList.remove("dragover");
    })
    
    titreForm.addEventListener("input", () =>{verifForm()});
    categorieForm.addEventListener("change", () =>{verifForm()});
    console.log(file);

    function verifForm() {
        const btnValider= document.querySelector("#btn-valider");
    
        const verifTitre = titreForm.value.trim() !== "";
        const verifCategorie = categorieForm.value > 0;

        btnValider.disabled = !(verifFile && verifTitre && verifCategorie);
    }
}

function chargeImage(){
    const imgDropzone = document.querySelector(".img-dropzone");
    const btnFileSelect= document.getElementById("file-select");
    const imgUpload = document.getElementById("image-form");

   
    imgDropzone.addEventListener("drop", (event) =>{
        event.preventDefault();
        imgDropzone.classList.remove("dragover");
        const file = event.dataTransfer.files[0]; // file est définie auparavant
        const maxSize= 4 * 1024 *  1024;
        const validTypes= ["image/jpeg", "image/png"];
        if(file && validTypes.includes(file.type) && file.size <= maxSize) {
            let dataTransfer= new DataTransfer();
            dataTransfer.items.add(event.dataTransfer.files[0]);
            imgUpload.files=dataTransfer.files; // ajoute l'image à l'input type file
            imgUpload.dispatchEvent(new Event("change"));
            
            afficherApercu(file); // affiche un aperçu de l'image dans la dropzone
            verifForm();
            return file; // verifie que les champs du formulaire sont replis ou non

        }else{
            document.querySelector(".message-img-type").style.display="none";
            document.querySelector(".erreur-img-type").style.display="block";
            return
        } 
    })

    btnFileSelect.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        imgUpload.click()
    });
    imgUpload.addEventListener("change", (event)=> {
        const file = event.target.files[0];
        const maxSize= 4 * 1024 *  1024;
        const validTypes= ["image/jpeg", "image/png"];
        if(!file || !validTypes.includes(file.type) || file.size > maxSize) {
            document.querySelector(".message-img-type").style.display="none";
            document.querySelector(".erreur-img-type").style.display="block";
            return;
        }   
        afficherApercu(file);
        verifForm();
        return;
    });

}
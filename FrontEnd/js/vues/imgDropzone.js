export async function loadImgDropzone() {
    document.querySelector(".img-dropzone").innerHTML = ""; 
    const reponse = await fetch("templates/imgDropzone.html");
    const template = await reponse.text();
    
    document.querySelector(".img-dropzone").innerHTML = template;  
}
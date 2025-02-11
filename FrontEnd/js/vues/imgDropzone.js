export async function loadImgDropzone() {
    document.querySelector("#modal-add").innerHTML = ""; 
    const reponse = await fetch("templates/imgDropzone.html");
    const template = await reponse.text();
    
    document.querySelector("#modal-add").innerHTML = template;  
}
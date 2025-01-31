export function openCloseModal(){

    const btnModifier = document.querySelector("#button");
btnModifier.addEventListener("click", function(){
    let displayModal = document.querySelector("#modal1");
    displayModal.style.display = "flex";
})
const btnFermer = document.querySelector("#fermer-modal");
btnFermer.addEventListener("click", function(){
    let displayModal = document.querySelector("#modal1");
    displayModal.style.display = "none";
})
}
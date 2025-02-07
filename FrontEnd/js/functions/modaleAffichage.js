import { clearformAdd, afficheProjetsModal } from "./modaleProjets.js";
import { chargeProjets } from "./projets.js"; 

export function changePageModal(){

    document.querySelector("#btn-ajout").addEventListener("click", function() {
        document.querySelector("#modal-gallery").style.display = "none";
        document.querySelector("#modal-add").style.display = "flex";
        document.querySelector("#preview").style.display = "none";
        document.querySelector(".dropzone-content").style.display = "flex";
        clearformAdd();
    });
    document.querySelector("#retour-gallery").addEventListener("click", function() {
        document.querySelector("#modal-gallery").style.display = "flex";
        document.querySelector("#modal-add").style.display = "none";
        afficheProjetsModal();
    });
}
export function openCloseModal(){

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
            clearformAdd();
            chargeProjets();
        })
    });

    const overlay = document.querySelector("#modal1");
    overlay.addEventListener("click", (event) => {
        if(event.target === overlay){
        overlay.style.display = "none";
        document.querySelector("#modal-gallery").style.display = "flex";
        document.querySelector("#modal-add").style.display = "none";
        clearformAdd();
        chargeProjets();
        }
    });
}
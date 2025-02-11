export function erreurControl(erreur) {
    
    const modale = document.getElementById("modal2");
    const erreurContainer = document.getElementById("erreur");
    erreurContainer.innerText = erreur.message;

    modale.addEventListener("click", () => {
        document.getElementById("modale-erreur-container").innerHTML = "";
    }) 
}
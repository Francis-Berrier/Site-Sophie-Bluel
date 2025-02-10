export async function loadModaleErreur(erreur) {

    document.getElementById("modale-erreur-container").innerHTML = ""; 
    const reponse = await fetch("templates/modale-erreur.html");
    const template = await reponse.text();
    
    document.getElementById("modale-erreur-container").innerHTML = template; 
    const modale = document.getElementById("modal2");
    const erreurContainer = document.getElementById("erreur");
    erreurContainer.innerText = erreur.message;

    modale.addEventListener("click", () => {
        document.getElementById("modale-erreur-container").innerHTML = "";
    }) 
}
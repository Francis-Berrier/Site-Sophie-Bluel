export function succesControl(message) {
    
    const modale = document.getElementById("modal3");
    const succesContainer = document.getElementById("succes");
    succesContainer.innerText = message;

    modale.addEventListener("click", () => {
        document.getElementById("modale-succes-container").innerHTML = "";
    }) 
}
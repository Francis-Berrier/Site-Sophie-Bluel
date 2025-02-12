export function retourPageAccueil() {
    const loginLink= document.getElementById("login-link");
    loginLink.classList.remove("checked")
    loginLink.innerHTML="";
    loginLink.innerHTML="<a>login</a>";
    document.getElementById("page-accueil-container").style.display= "block";
    document.getElementById("page-connexion-container").innerHTML = "";
}
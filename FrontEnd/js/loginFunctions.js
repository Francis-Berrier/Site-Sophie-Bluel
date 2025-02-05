import { checkEditMode } from "./checkEditMode.js";
import { loadHeader } from "./header.js";

function verificationEmail(email) {
    email = htmlSpecialChars(email);

    if(!email.includes("@")){
        alert("Veuillez entrer un mail valide!")
        return
    }
    return email;
}
function htmlSpecialChars(string) {
    return string
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
export function formLogin() {
    const form = document.getElementById("form-connexion");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = verificationEmail(event.target.email.value);
        const password = htmlSpecialChars(event.target.password.value);
        event.target.email.value = null;
        event.target.password.value = null;
        console.log(email, password);
        requestLogin(email, password);
    })
}
async function requestLogin(email, password) {

    const data = {
        email: email,
        password: password
    }
    
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    console.log(reponse.status);

    if (reponse.status === 200){
        let authData = await reponse.json();
        authData = JSON.stringify(authData);
        sessionStorage.setItem("authData", authData);
        document.getElementById("page-connexion-container").innerHTML= "";
        document.getElementById("page-accueil-container").style.display= "block";
        checkEditMode();
        loadHeader();
    }else {
        let erreurContainer = document.querySelector("#erreur-connexion");
        if(erreurContainer.innerHTML === ""){
            const messageErreur = document.createElement("h3");
            messageErreur.innerText = "Erreur dans l'identifiant ou le mot de passe";
            erreurContainer.appendChild(messageErreur);
        }
    }  
}


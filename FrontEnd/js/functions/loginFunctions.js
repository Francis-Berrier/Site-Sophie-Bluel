import { requestLogin } from "./requetes.js";
import { loadModaleErreur } from "../vues/modaleErreur.js";


function verificationEmail(email) {
    email = htmlSpecialChars(email);

    if(!email.includes("@")){
        return false
    }
    return true;
}
function htmlSpecialChars(string) {
    return string
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function formLogin() {

    const form = document.getElementById("form-connexion");
    form.addEventListener("submit", function(event) {
        try {
        event.preventDefault();
        const email = event.target.email.value;
        const verifEmail = verificationEmail(email);
        const password = htmlSpecialChars(event.target.password.value);

        if (!email || !password || verifEmail===false) {
           throw new Error ('Entrez un identifiant et un mot de passe valide');
            
        }else {
            event.target.email.value = null;
            event.target.password.value = null;
            requestLogin(email, password);
        }
            
        }catch (error) {
            loadModaleErreur(error);
            event.target.email.value = null;
            event.target.password.value = null;
            return;
        }
    })
}



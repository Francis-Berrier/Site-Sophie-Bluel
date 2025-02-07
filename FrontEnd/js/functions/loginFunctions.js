import { requestLogin } from "./requetes.js";


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

export async function formLogin() {
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



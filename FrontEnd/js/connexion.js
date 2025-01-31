import { loadHeader, loadTemplate } from "./templates-loading.js";
import { verificationEmail, htmlSpecialChars} from "./verificateurs.js";
import {  requestLogin } from "./requestLog.js";


loadHeader("../templates/header.html", "header-container");
loadTemplate('../templates/footer.html', 'footer-container');

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
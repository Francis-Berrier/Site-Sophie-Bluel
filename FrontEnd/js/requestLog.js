export async function requestLog(email, password) {

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
        window.location.replace("index.html")
    }else {
        let erreurContainer = document.querySelector("#erreur-connexion");
        if(erreurContainer.innerHTML === ""){
            const messageErreur = document.createElement("h3");
            messageErreur.innerText = "Erreur dans l'identifiant ou le mot de passe";
            erreurContainer.appendChild(messageErreur);
        }
    }  
}

export function verifAuthor(){

    const authData = window.sessionStorage.getItem("authData");
    const auth= JSON.parse(authData)
    let banniereEdit = document.querySelector("#banniere-edit");
    let boutonEdit = document.querySelector("#button");
    let filtres = document.querySelector(".filtres");
    let loginLink = document.querySelector("#login-link");
    let logoutLink = document.querySelector("#logout-link");
    
    if(auth !== null) {
        if(logoutLink && loginLink){
            if(logoutLink.classList.contains("hidden")){
                logoutLink.classList.remove("hidden");
                loginLink.classList.add("hidden");
            }
        }
        if (filtres && filtres.style.display==="flex"){
            filtres.style.display="none";
        }
        if (banniereEdit && banniereEdit.style.display==="none"){
            banniereEdit.style.display="flex";
        }
      
        if (boutonEdit && boutonEdit.style.display==="none"){
            boutonEdit.style.display="flex";
        }

    }else{
        if(logoutLink && loginLink){
            if(loginLink.classList.contains("hidden")){
                loginLink.classList.remove("hidden");
                logoutLink.classList.add("hidden");
            }
        }
        if (filtres && filtres.style.display==="none"){
            filtres.style.display="flex";
        }
        if (banniereEdit && banniereEdit.style.display==="flex"){
            banniereEdit.style.display="none";
        }
        if (boutonEdit && boutonEdit.style.display==="flex"){
            boutonEdit.style.display="none";
        }
    }
}

    


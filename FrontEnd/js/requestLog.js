export async function requestLogin(email, password) {

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

export function checkEditMode(){

    const authData = window.sessionStorage.getItem("authData");
    const auth= JSON.parse(authData)
    let boutonEdit = document.querySelector("#button");
    let filtres = document.querySelector(".filtres");
    
    if(auth !== null) {
        
        if (filtres && filtres.style.display==="flex"){
            filtres.style.display="none";
        }
       
        if (boutonEdit && boutonEdit.style.display==="none"){
            boutonEdit.style.display="flex";
        }

    }else{
       
        if (filtres && filtres.style.display==="none"){
            filtres.style.display="flex";
        }
       
        if (boutonEdit && boutonEdit.style.display==="flex"){
            boutonEdit.style.display="none";
        }
    }
}

    


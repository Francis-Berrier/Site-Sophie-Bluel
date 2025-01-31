
        export async function loadTemplate(urlTemplate, idContainer) {

            const reponse = await fetch(urlTemplate);
            const template = await reponse.text();
            
            document.getElementById(idContainer).innerHTML = template;  
        }

        export async function loadHeader(urlTemplate, idContainer) {
            const reponse = await fetch(urlTemplate);
            const template = await reponse.text();
            
            document.getElementById(idContainer).innerHTML = template;  
            const authData = window.sessionStorage.getItem("authData");
            const auth= JSON.parse(authData)
            let banniereEdit = document.querySelector("#banniere-edit");
            let loginLink = document.querySelector("#login-link");
            let logoutLink = document.querySelector("#logout-link");
            
            if(auth !== null) {
                if(logoutLink && loginLink){
                    if(logoutLink.classList.contains("hidden")){
                        logoutLink.classList.remove("hidden");
                        loginLink.classList.add("hidden");
                    }
                }
                if (banniereEdit && banniereEdit.style.display==="none"){
                    banniereEdit.style.display="flex";
                }
        
            }else{
                if(logoutLink && loginLink){
                    if(loginLink.classList.contains("hidden")){
                        loginLink.classList.remove("hidden");
                        logoutLink.classList.add("hidden");
                    }
                }
                if (banniereEdit && banniereEdit.style.display==="flex"){
                    banniereEdit.style.display="none";
                }
            }
           
            logoutLink.addEventListener("click", function(){
                window.sessionStorage.removeItem("authData");
                window.location.reload(true);
            })
        }


          
              
        
   

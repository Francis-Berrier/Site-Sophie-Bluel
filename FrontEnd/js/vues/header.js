import { headerControl } from "../controllers/headerControl.js";
/*export async function loadTemplate(urlTemplate, idContainer) {

    const reponse = await fetch(urlTemplate);
    const template = await reponse.text();
    
    document.getElementById(idContainer).innerHTML = template;  
}*/
export async function loadHeader() {
    document.getElementById("header-container").innerHTML = "";
    const reponse = await fetch("templates/header.html");
    const template = await reponse.text();
    
    document.getElementById("header-container").innerHTML = template;
    headerControl()
}


          
              
        
   

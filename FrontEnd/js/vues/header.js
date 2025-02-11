import { headerControl } from "../controllers/headerControl.js";

export async function loadHeader() {
    document.getElementById("header-container").innerHTML = "";
    const reponse = await fetch("templates/header.html");
    const template = await reponse.text();
    
    document.getElementById("header-container").innerHTML = template;
    headerControl();
}


          
              
        
   

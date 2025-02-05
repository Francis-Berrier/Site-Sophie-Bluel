export async function loadFooter() {
    document.getElementById("footer-container").innerHTML = "";
    const reponse = await fetch("templates/footer.html");
    const template = await reponse.text();
    
    document.getElementById("footer-container").innerHTML = template;  
}
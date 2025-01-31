import { chargeProjets, filtres } from "./methods.js";
import { checkEditMode} from "./requestLog.js";
import { loadTemplate, loadHeader } from "./templates-loading.js";
import { openCloseModal } from "./modal.js";


/*Chargement du header et du footer*/
loadHeader("templates/header.html", "header-container");
loadTemplate('templates/footer.html', 'footer-container');
checkEditMode();

/*Création des cartes de projets avec filtrage*/
chargeProjets();
filtres();

/*Gestion de la modale*/
openCloseModal()

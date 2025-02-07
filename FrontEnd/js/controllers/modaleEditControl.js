import { openCloseModal, changePageModal } from "../functions/modaleAffichage.js";
import { afficheProjetsModal, supprimerProjets, addProjets } from "../functions/modaleProjets.js";
import { afficheCategoriesModal } from "../functions/categories.js"


export async function modaleEditControl() {
    openCloseModal();
    changePageModal();
    afficheProjetsModal();
    afficheCategoriesModal();
    supprimerProjets();
    addProjets();
}
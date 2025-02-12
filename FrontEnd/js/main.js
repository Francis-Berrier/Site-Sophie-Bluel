import { loadPageAccueil } from "./vues/pageAccueil.js";
import { loadHeader } from "./vues/header.js";
import { loadFooter } from "./vues/footer.js";
import { miseAJourCategories, miseAJourProjets } from "./functions/requetes.js";

miseAJourProjets();
miseAJourCategories();
loadHeader();
loadPageAccueil();
loadFooter();


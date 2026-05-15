// Nous avons besoin d'importer le module express pour utiliser la classe Router
import express from 'express';
import authentification from "../middlewares/authentification.middleware.js";  
import 
{ 
    afficherListeLivre, afficherDetailsLivre, ajouterLivre, modifierLivre, modifierStatutLivre, supprimerLivre,
    afficherListePret, ajouterPret, modifierPret, modifierStatutPret, supprimerPret,
} from '../controllers/bibliotheque.controller.js';
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router(); 

/*Action SQL	    Opération CRUD	        Méthode HTTP	        Description
-----------------------------------------------------------------------------------------------------------------------------
INSERT	            Create	                POST	                Pour ajouter une nouvelle entrée.
SELECT	            Read	                GET	                    Pour récupérer des données sans les modifier.
UPDATE	            Update	                PUT / PATCH	            Pour modifier une entrée existante.
DELETE	            Delete	                DELETE	                Pour supprimer une entrée.
*/

//routes de gestion des livres
router.get('/livre', afficherListeLivre);
router.get('/livre/:id',afficherDetailsLivre);
router.post('/livre', ajouterLivre);
router.patch('/livre/modifier/:id', modifierLivre);
router.patch('/livre/statut/modifier/:id', modifierStatutLivre)
router.delete ('/livre/:id', supprimerLivre);
//routes de gestion des prets
router.get('/pret', afficherListePret);
router.post('/pret', ajouterPret);
router.patch('/pret/:id', modifierPret);
router.patch('/pret/statut/modifier/:id', modifierStatutPret)
router.delete('/pret/:id', supprimerPret);
export default router;
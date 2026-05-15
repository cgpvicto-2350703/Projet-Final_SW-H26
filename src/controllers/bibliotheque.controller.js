import 
{ 
    ListeLivres,DetailsLivres,AjoutLivre,UpdateLivre,UpdateStatutLivre,EffacerLivre, 
    ListePret,AjoutPret,UpdatePret,UpdateStatutPret,EffacerPret, 
    AjoutUtilisateur,RecupererCleApi
} from '../models/bibliotheque.model.js';
//Livre
const afficherListeLivre = async (req, res) => 
{
    try 
    {
        // On vérifie si "?tous=true" est présent dans l'URL
        const afficherTout = req.query.tous === 'true';
        
        // On passe ce booléen au modèle
        const listeLivre = await ListeLivres(afficherTout); 
        res.status(200).send(listeLivre);
    } 
    catch (erreur) 
    {
        console.log('Erreur : ', erreur);
        res.status(500).send({ message: "Erreur serveur" });
    }
};//fait
const afficherDetailsLivre = async(req, res)=>
{  
    if(!req.params.id || parseInt(req.params.id) <= 0)
    {
        res.status(400).send({ message: "L'id du livre est obligatoire et doit être supérieur à 0" });
        return;
    }
    try 
    {
        const livre = await DetailsLivres(req.params.id);
        if (!livre) 
        {
            return res.status(404).send({ message: "Le livre avec l'id " + req.params.id + " n'existe pas." });
        }
        res.status(200).send(livre);
    } 
    catch (erreur) 
    {
        console.log('Erreur : ', erreur);
        res.status(500).send({ message: "Erreur serveur."});
    }
};//fait
const ajouterLivre = async(req, res)=>
{
    const {titre, auteur, isbn, bibliotheque_id} = req.body;

    if (!titre || titre.trim() === "") 
    {
        return res.status(400).json({ message: "Le titre du livre est obligatoire." });
    }
    if (!auteur || auteur.trim() === "") 
    {
        return res.status(400).json({ message: "L'auteur du livre est obligatoire." });
    }
    if (!isbn || isbn.trim() === "") 
    {
        return res.status(400).json({ message: "L'isbn est obligatoire." });
    }
    if(!bibliotheque_id)
    {
        return res.status(400).json({ message: "L' id de la biblihothèque est obligatoire." });
    }

    try 
    {
        const nouveauLivre = await AjoutLivre(titre, auteur, isbn, bibliotheque_id);
        res.status(201).json({ message: "Livre ajouté avec succès !", livre: nouveauLivre });
    } 
    catch (erreur) 
    {
        console.error("Erreur:", erreur);
        res.status(500).json({ message: "Erreur serveur." });
    }
};//fait
const modifierLivre = async(req, res)=>
{
    const { id } = req.params;

    if (!id || parseInt(id) <= 0) 
    {
        return res.status(400).send({ message: "L'id du livre est invalide" });
    }
    const { titre, auteur, isbn } = req.body;
    const donneesAModifier = {};
    
    if (titre) donneesAModifier.titre = titre;
    if (auteur) donneesAModifier.auteur = auteur;
    if (isbn) donneesAModifier.isbn = isbn;

    if (Object.keys(donneesAModifier).length === 0) 
    {
        return res.status(400).json({ message: "Aucune donnée valide fournie pour la modification." });
    }
    try
    {
        const livreModifier = await UpdateLivre(id, donneesAModifier);
        
        if (!livreModifier) 
        {
            return res.status(404).json({ message: "Livre non trouvé." });
        }

        res.status(200).json({ message: "Livre modifié avec succès", livre: livreModifier});
    }
    catch (erreur) { res.status(500).json({ message: "Erreur serveur lors de la modification." });}
};
const modifierStatutLivre = async(req, res)=>
{
    if(!req.params.id || parseInt(req.params.id) <= 0)
    {
        res.status(400).send({ message: "L'id du livre est obligatoire et doit être supérieur à 0" });
        return;
    }
    try 
    {
        const livreModifier = await UpdateStatutLivre(req.params.id)
        if (!livreModifier) 
        {
            return res.status(404).send({ message: "Le livre n'existe pas." });
        }
        res.status(200).json({ message: "Statut modifié", livre: livreModifier });
    } 
    catch (erreur) 
    {
        console.error("Erreur détaillée:", erreur);
        res.status(500).send({ message: "Erreur serveur.", error: erreur.message });
    }
};
const supprimerLivre = async(req, res)=>
{
    if(!req.params.id || parseInt(req.params.id) <= 0)
    {
        res.status(400).send({ message: "L'id du livre est obligatoire et doit être supérieur à 0" });
        return;
    }
    try 
    {
        const livreEffacer = await EffacerLivre(req.params.id);
        res.status(200).send({message:"le livre a ete supprimer"});
    } 
    catch (erreur) 
    {
        console.error("Erreur:", erreur);
        res.status(500).json({ message: "Erreur serveur." });
    }
};//fait

//Pret
const afficherListePret = async(req, res)=>
{
    try 
    {
        const listePrets = await ListePret();
        res.status(200).send(listePrets);
    } 
    catch (erreur) 
    {
        console.error("Erreur:", erreur);
        res.status(500).send({ message: "Erreur serveur" });
    }
};//fait
const ajouterPret = async(req, res)=>
{
    const {livre_id, emprunteur} = req.body;

    if(!livre_id || parseInt(livre_id) <= 0)
    {
        res.status(400).send({ message: "L'id du livre est obligatoire et doit être supérieur à 0" });
        return;
    }

    if (!emprunteur || emprunteur.trim() === "") 
    {
        return res.status(400).json({ message: "L'emprunteur du livre est obligatoire." });
    }

    try 
    {
        const nouveauPret = await AjoutPret(livre_id, emprunteur);
        res.status(201).json({ message: "Livre ajouté avec succès !", pret: nouveauPret});
    } 
    catch (erreur) 
    {
        console.error("Erreur:", erreur);
        res.status(500).json({ message: "Erreur lors de la création du prêt" });
    }
};//fait
const modifierPret = async(req, res)=>
{
    const { id } = req.params;

    if (!id || parseInt(id) <= 0) 
    {
        return res.status(400).send({ message: "L'id du pret est invalide" });
    }
    const { livre_id, emprunteur} = req.body;
    const donneesAModifier = {};
    
    if (livre_id) donneesAModifier.livre_id = livre_id;
    if (emprunteur) donneesAModifier.emprunteur = emprunteur;

    if (Object.keys(donneesAModifier).length === 0) 
    {
        return res.status(400).json({ message: "Aucune donnée valide fournie pour la modification." });
    }

    try
    {
        const pretModifier = await UpdatePret(id, donneesAModifier);
        if (!pretModifier){ return res.status(404).json({ message: "Pret non trouvé." });}
        res.status(200).json({ message: "Pret modifié avec succès", pret: pretModifier});
    }
    catch (erreur)
    {
        console.error("Erreur:", erreur);
        res.status(500).json({ message: "Erreur serveur." });
    }
};
const modifierStatutPret = async(req, res)=>
{
    console.log("Je suis dans le controller");
    if(!req.params.id || parseInt(req.params.id) <= 0)
    {
        res.status(400).send({ message: "L'id du pret est obligatoire et doit être supérieur à 0" });
        return;
    }
    try 
    {
        const pretModifier = await UpdateStatutPret(req.params.id)
        if (!pretModifier) 
        {
            return res.status(404).send({ message: "Le prêt n'existe pas." });
        }
        res.status(200).json({ message: "Statut du prêt modifié", pret: pretModifier });
    } 
    catch (erreur) 
    {
        console.error("Erreur détaillée:", erreur);
        res.status(500).json({ message: "Erreur serveur", error: erreur.message });
    }
};//fait
const supprimerPret = async(req, res)=>
{
    if(!req.params.id || parseInt(req.params.id) <= 0)
    {
        res.status(400).send({ message: "L'id du pret est obligatoire et doit être supérieur à 0" });
        return;
    }
    try 
    {
        const pretSuprimmer = await EffacerPret(req.params.id);
        res.status(200).send({ "message": "le pret a ete supprimer" });
    } 
    catch (erreur) 
    {
        console.error("Erreur:", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
};//fait

//User
const creerUtilisateur = async(req, res)=>
{
    const {nom, courriel, password} = req.body;
    if (!nom || nom.trim() === "") 
    {
        return res.status(400).json({ message: "Le nom de la bibliothèque est obligatoire." });
    }

    if (!courriel || courriel.trim() === "") 
    {
        return res.status(400).json({ message: "Le courriel du user est obligatoire." });
    }

    try 
    {
        const user = await AjoutUtilisateur(nom, courriel,password);
        res.status(201).json({ message: "la bibliothèque ajouté avec succès !", bibli: user });
    } 
    catch (erreur) 
    {
        console.error("Erreur:", erreur);
        res.status(500).json({ message: "Erreur serveur." });
    }
};
const recupererCle = async(req, res)=>
{
    const { courriel, password } = req.body;

    if (!courriel || !password) { return res.status(400).json({ message: "Le courriel et le mot de passe sont requis." }); }

    try 
    {
        const nouvelleCle = req.query.newkey === 'true';
        const cle_api = await RecupererCleApi(courriel, password, nouvelleCle);
        res.status(200).json({ cle_api: cle_api });
    } 
    catch (erreur) 
    {
        console.error("Erreur détaillée:", erreur);
        res.status(500).json({ message: "Erreur serveur", error: erreur.message });
    }
};
export 
{ 
    afficherListeLivre, afficherDetailsLivre, ajouterLivre, modifierLivre, modifierStatutLivre, supprimerLivre,
    afficherListePret, ajouterPret, modifierPret, modifierStatutPret, supprimerPret,
    creerUtilisateur,
    recupererCle
};
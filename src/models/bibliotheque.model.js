// src/models/bibliotheque.model.js
import pool from '../config/db_pg.js';

const ListeLivres = async (afficherTout = false) => 
{
    // Si afficherTout est vrai, on prend tout. Sinon, on filtre par disponible.
    const requete = afficherTout 
        ? 'SELECT id, titre, disponible FROM livres' 
        : 'SELECT id, titre, disponible FROM livres WHERE disponible = TRUE';

    try 
    {
        const resultat = await pool.query(requete);
        return resultat.rows;
    } 
    catch (erreur) 
    {
        console.error(`Erreur: ${erreur.message}`);
        throw erreur;
    }
}//fait
const DetailsLivres = async (id) => 
{
    const requete = `SELECT l.*, COALESCE(json_agg(p.*) FILTER (WHERE p.id IS NOT NULL), '[]') AS prets FROM livres l LEFT JOIN prets p ON l.id = p.livre_id  WHERE l.id = $1 GROUP BY l.id  LIMIT 1`;
    const params = [id]

    try 
    {
        const resultat = await pool.query(requete, params);
        // PostgreSQL:  resultats dans la propriété "rows"
        return resultat.rows;
    } 
    catch (erreur) 
    {
        console.error(`Erreur: ${erreur.message}`);
        console.log(`Erreur, code: ${erreur.code}: ${erreur.message}`);
        throw erreur;
    }
}//fait
const AjoutLivre = async (titre, auteur, isbn,bibliotheque_id) => 
{
    const requete = `INSERT INTO livres (titre, auteur, isbn, bibliotheque_id) VALUES ($1, $2, $3,$4) RETURNING *`;
    const params = [titre, auteur, isbn, bibliotheque_id];

    try 
    {
        const resultat = await pool.query(requete, params);
        // On retourne la ligne créée (qui aura disponible: true par défaut via SQL)
        return resultat.rows[0];
    } 
    catch (erreur) 
    {
        console.error(`Erreur : ${erreur.message}`);
        console.log(`Erreur, code: ${erreur.code}: ${erreur.message}`);
        throw erreur;
    }
};//fait
const UpdateLivre = async (id, champs) => 
{
    const cles = Object.keys(champs);
    if (cles.length === 0) return null;
    const setClause = cles.map((cle, index) => `${cle} = $${index + 1}`).join(', ');
    const valeurs = Object.values(champs);
    valeurs.push(id);
    const indexId = valeurs.length;
    const requete = `UPDATE livres SET ${setClause} WHERE id = $${indexId} RETURNING *`;

    try 
    {
        const resultat = await pool.query(requete, valeurs);
        return resultat.rows[0];
    } 
    catch (erreur) 
    {
        console.error(`Erreur: ${erreur.message}`);
        throw erreur;
    }
};//fait
const UpdateStatutLivre = async (id) => 
{
    const requete = `UPDATE livres SET disponible = NOT disponible WHERE id = $1 RETURNING *`;
    const params = [id];

    try 
    {
        const resultat = await pool.query(requete, params);
        return resultat.rows[0];
    } 
    catch (erreur) 
    {
        console.error(`Erreur: ${erreur.message}`);
        console.log(`Erreur, code: ${erreur.code}: ${erreur.message}`);
        throw erreur;
    }
};//fait
const EffacerLivre = async (id) => 
{
    const requete = 'DELETE FROM livres WHERE id = $1';
    const params = [id]

    try 
    {
        const resultat = await pool.query(requete, params);
        return resultat.rowCount > 0;
    } 
    catch (erreur) 
    {
        console.error(`Erreur ${erreur.code} : ${erreur.message}`);
        console.log(`Erreur, code: ${erreur.code}: ${erreur.message}`);
        throw erreur;
    }
};//fait

const ListePret = async () => 
{
    const requete = 'SELECT * FROM prets';

    try 
    {
        const resultat = await pool.query(requete);
        return resultat.rows;
    } 
    catch (erreur) 
    {
        console.error(`Erreur ${erreur.code} : ${erreur.message}`);
        console.log(`Erreur, code: ${erreur.code}: ${erreur.message}`);
        throw erreur;
    }
};//fait
const AjoutPret = async (livre_id, emprunteur) => 
{
    const requete = `INSERT INTO prets (livre_id, emprunteur) VALUES ($1, $2) RETURNING *`;
    const params = [livre_id, emprunteur];

    try 
    {
        const resultat = await pool.query(requete, params);
        // On retourne la ligne créée (qui aura disponible: true par défaut via SQL)
        return resultat.rows[0];
    } 
    catch (erreur) 
    {
        console.error(`Erreur: ${erreur.message}`);
        console.log(`Erreur, code: ${erreur.code}: ${erreur.message}`);
        throw erreur;
    }
};//fait
const UpdatePret = async (id, champs) => 
{
    const cles = Object.keys(champs);
    if (cles.length === 0) return null;
    const setClause = cles.map((cle, index) => `${cle} = $${index + 1}`).join(', ');
    const valeurs = Object.values(champs);
    valeurs.push(id);
    const indexId = valeurs.length;
    const requete = `UPDATE prets SET ${setClause} WHERE id = $${indexId} RETURNING *`;

    try 
    {
        const resultat = await pool.query(requete, valeurs);
        return resultat.rows[0];
    } 
    catch (erreur) 
    {
        console.error(`Erreur: ${erreur.message}`);
        throw erreur;
    }
       
};
const UpdateStatutPret = async (id) => 
{
    const requete = 'UPDATE prets SET date_retour = CURRENT_DATE WHERE id = $1 RETURNING *';
    const params = [id];

    try 
    {
        const resultat = await pool.query(requete, params);
        // On retourne la ligne créée (qui aura disponible: true par défaut via SQL)
        return resultat.rows[0];
    } 
    catch (erreur) 
    {
        console.error(`Erreur : ${erreur.message}`);
        console.log(`Erreur, code: ${erreur.code}: ${erreur.message}`);
        throw erreur;
    }
};//fait
const EffacerPret = async (id) => 
{
    const requete = 'DELETE FROM prets WHERE id = $1';
    const params = [id]

    try 
    {
        const resultat = await pool.query(requete, params);
        return resultat.rowCount > 0;
    } 
    catch (erreur) 
    {
        console.error(`Erreur: ${erreur.message}`);
        console.log(`Erreur, code: ${erreur.code}: ${erreur.message}`);
        throw erreur;
    }
};//fait

const AjoutUtilisateur = async (nom,courriel,password) => 
{
    const cle_api = crypto.randomUUID();
    const requete = `INSERT INTO bibliotheque (nom, courriel, password, cle_api) VALUES ($1, $2, $3,$4) RETURNING*`;

    const params = [nom, courriel,password,cle_api];

    try 
    {
        const resultat = await pool.query(requete, params);
        
        // On extrait le password de l'objet et on groupe le reste dans 'utilisateurSansPassword'
        const { password, ...utilisateurSansPassword } = resultat.rows[0];

        // On retourne l'objet qui ne contient plus le champ password
        return utilisateurSansPassword;
    } 
    catch (erreur) 
    {
        console.error(`Erreur: ${erreur.message}`);
        console.log(`Erreur, code: ${erreur.code}: ${erreur.message}`);
        throw erreur;
    }
};

const RecupererCleApi = async (courriel, password, newkey = false) => 
{
    const nouvelle_cle = crypto.randomUUID();
    // On définit la requête et les paramètres dynamiquement
    let requete;
    let params;

    if (newkey) 
    {
        // Mode régénération : 3 paramètres nécessaires
        requete = 'UPDATE bibliotheque SET cle_api = $3 WHERE courriel = $1 AND password = $2 RETURNING cle_api';
        params = [courriel, password, nouvelle_cle];
    } 
    else 
    {
        // Mode lecture seule : 2 paramètres nécessaires
        requete = 'SELECT b.cle_api FROM bibliotheque b WHERE b.courriel = $1 AND b.password = $2';
        params = [courriel, password];
    }

    try 
    {
        const resultat = await pool.query(requete, params);
        
        if (resultat.rows.length > 0)
        {
            return resultat.rows[0].cle_api;
        } 
        else
        {
            return null; // Identifiants incorrects
        }
    } 
    catch (erreur) 
    {
        console.error(`Erreur lors de la récupération de la clé : ${erreur.message}`);
        throw erreur;
    }
};
// À ajouter dans bibliotheque.model.js
const VerifierCleApi = async (cle_api) => 
{
    const requete = 'SELECT id FROM bibliotheque WHERE cle_api = $1';
    const resultat = await pool.query(requete, [cle_api]);
    return resultat.rows.length > 0;
};

export
{ 
    ListeLivres, DetailsLivres,AjoutLivre,UpdateLivre,UpdateStatutLivre,EffacerLivre, 
    ListePret,AjoutPret,UpdatePret,UpdateStatutPret,EffacerPret, 
    AjoutUtilisateur,
    RecupererCleApi,VerifierCleApi
};
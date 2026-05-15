import express from 'express';
import authentification from "../middlewares/authentification.middleware.js";  
import {creerUtilisateur,recupererCle} from '../controllers/bibliotheque.controller.js';

const router = express.Router(); 

//routes de gestion des cles Api
//routes de gestion des users
router.post('/user', creerUtilisateur);
router.post('/cle/recuperer', recupererCle)

export default router;
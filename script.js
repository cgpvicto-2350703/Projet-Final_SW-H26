import pool from "./src/config/db_pg.js";
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import authentification from './src/middlewares/authentification.middleware.js';
import BibliothequeRouter from './src/routes/bibliotheque.route.js';
import KeyRouter from './src/routes/CleApi.route.js'



//Commande pour lancer le serveur
//pnpm start

const swaggerDocument = JSON.parse(fs.readFileSync('./src/config/documentation.json', 'utf8'));
const swaggerOptions = {customCss: '.swagger-ui .topbar { display: none }', customSiteTitle: "Projet-Final"};
// Créer une application express
const app = express();
const PORT = 3000;

app.use(express.json()); 
app.use('/api/bibliotheque', authentification, BibliothequeRouter);
app.use('/api/authentification', KeyRouter);
app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument, swaggerOptions));



app.get('/', (req, res) => {res.send("<h1>Serveur de la biblihothèque!</h1>");});

app.listen(PORT, () => {console.log(`Serveur démarré sur le port ${PORT}`);});
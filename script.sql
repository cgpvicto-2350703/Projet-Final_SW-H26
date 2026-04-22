-- Database: SW H26 Projet Final

DROP DATABASE IF EXISTS "SW H26 Projet Final";
CREATE DATABASE "SW H26 Projet Final"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr-FR'
    LC_CTYPE = 'fr-FR'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- 1. Création de la table 'bibliotheque'
DROP TABLE IF EXISTS bibliotheque;
CREATE TABLE bibliotheque (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    courriel VARCHAR(255) NOT NULL,
    cle_api VARCHAR(30),
    password VARCHAR(100) NOT NULL
);

-- 2. Création de la table 'livres'
DROP TABLE IF EXISTS livres;
CREATE TABLE livres (
    id SERIAL PRIMARY KEY,
    bibliotheque_id INTEGER NOT NULL,
    titre VARCHAR(100) NOT NULL,
    auteur VARCHAR(100),
    isbn VARCHAR(20),
    date_ajout DATE DEFAULT CURRENT_DATE,
    disponible BOOLEAN DEFAULT TRUE, -- Changement de SMALLINT à BOOLEAN
    
    CONSTRAINT fk_bibliotheque
        FOREIGN KEY(bibliotheque_id) 
        REFERENCES bibliotheque(id)
        ON DELETE CASCADE
);

-- 3. Création de la table 'prets'
DROP TABLE IF EXISTS prets;
CREATE TABLE prets (
    id SERIAL PRIMARY KEY,
    livre_id INTEGER NOT NULL,
    emprunteur VARCHAR(100) NOT NULL,
    date_retour DATE,
    
    CONSTRAINT fk_livre
        FOREIGN KEY(livre_id) 
        REFERENCES livres(id)
        ON DELETE CASCADE
);
-- Database: SW_H26_Projet_Final

DROP DATABASE IF EXISTS "SW_H26_Projet_Final";
CREATE DATABASE "SW_H26_Projet_Final"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr-FR'
    LC_CTYPE = 'fr-FR'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

DROP TABLE IF EXISTS prets;
DROP TABLE IF EXISTS livres;
DROP TABLE IF EXISTS bibliotheque;
CREATE TABLE bibliotheque (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    courriel VARCHAR(255) NOT NULL,
    cle_api VARCHAR(100) UNIQUE,
    password VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS prets;
DROP TABLE IF EXISTS livres;
CREATE TABLE livres (
    id SERIAL PRIMARY KEY,
    bibliotheque_id INTEGER NOT NULL,
    titre VARCHAR(100) NOT NULL,
    auteur VARCHAR(100),
    isbn VARCHAR(20),
    date_ajout DATE DEFAULT CURRENT_DATE,
    disponible BOOLEAN DEFAULT TRUE,
    
    CONSTRAINT fk_bibliotheque FOREIGN KEY(bibliotheque_id) REFERENCES bibliotheque(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS prets;
CREATE TABLE prets (
    id SERIAL PRIMARY KEY,
    livre_id INTEGER NOT NULL,
    emprunteur VARCHAR(100) NOT NULL,
    date_retour DATE,
    CONSTRAINT fk_livre FOREIGN KEY(livre_id) REFERENCES livres(id) ON DELETE CASCADE
);

INSERT INTO bibliotheque (nom, courriel, cle_api, password)
VALUES 
('Bibliothèque Centrale', 'contact@biblio.ca',    '826a7956-67f6-4e11-a35e-581e612cb77d', 'hash_password_sec'),
('Pavillon des Sciences', 'sciences@cegep.qc.ca', '32423ref-32g4-242d-1f3f-vdvfv4tj7b5g', 'hash_password_abc');

INSERT INTO livres (bibliotheque_id, titre, auteur, isbn, disponible)
VALUES 
(1, 'Le Mythe de Sisyphe', 'Albert Camus', '9782070322886', TRUE),
(1, 'Programmation en C++', 'Bjarne Stroustrup', '9782744076121', FALSE),
(2, 'Fondements des bases de données', 'Abiteboul', '9782100049444', TRUE),
(1, 'Clean Code', 'Robert C. Martin', '9780132350884', TRUE),
(1, 'Effective C++', 'Scott Meyers', '9780321334879', TRUE),
(1, 'Design Patterns', 'Erich Gamma', '9780201633610', FALSE),
(2, 'Elden Ring: Official Art Book', 'FromSoftware', '9781772942699', TRUE),
(2, 'Le Seigneur des Anneaux', 'J.R.R. Tolkien', '9782266286268', FALSE),
(2, 'Le Petit Prince', 'Antoine de Saint-Exupéry', '9782070612758', TRUE),
(1, 'Introduction à l''algorithmique', 'Thomas H. Cormen', '9782100814626', TRUE),
(2, 'Dune', 'Frank Herbert', '9782221249123', FALSE);

INSERT INTO prets (livre_id, emprunteur, date_retour)
VALUES 
(2, 'Thomas Marceau', '2026-05-15'),
(3,'James Robin', '2026-04-12');
INSERT INTO prets (livre_id, emprunteur)
VALUES 
(4, 'Thomas Marceau'),
(8,'James Robin');

select * from livres;
select * from prets;
select * from bibliotheque;
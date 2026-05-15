// Configuration de l'URL de base de votre API
const API_URL = 'https://projet-final-sw-h26.onrender.com'; // Ajustez le port si nécessaire

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Gestion de la Création de Bibliothèque (User) ---
    const createLibraryForm = document.getElementById('create-library-form');
    
    createLibraryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nom = document.getElementById('lib-name').value;
        const courriel = document.getElementById('lib-email').value;
        const password = document.getElementById('lib-password').value;

        try {
            const response = await fetch(`${API_URL}/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nom, courriel, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Succès ! Bibliothèque "${data.bibli.nom}" créée.\nVotre clé API est : ${data.bibli.cle_api}`);
                createLibraryForm.reset();
            } else {
                alert(`Erreur: ${data.message}`);
            }
        } catch (error) {
            console.error("Erreur lors de la création:", error);
            alert("Impossible de contacter le serveur.");
        }
    });

    // --- 2. Gestion de la Récupération de Clé API ---
    const apiKeyForm = document.getElementById('api-key-form');

    apiKeyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const courriel = document.getElementById('api-email').value;
        const password = document.getElementById('api-password').value;
        const generateNew = document.getElementById('new-key').checked;

        // On ajoute le paramètre query ?newkey=true si la case est cochée
        const url = `${API_URL}/cle/recuperer${generateNew ? '?newkey=true' : ''}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courriel, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Votre clé API : ${data.cle_api}`);
            } else {
                alert(`Erreur: ${data.message}`);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération:", error);
            alert("Erreur de connexion au serveur.");
        }
    });

    // --- 3. Bonus : Toggle visibilité mot de passe ---
    document.querySelectorAll('.toggle-password').forEach(span => {
        span.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = '🔒';
            } else {
                input.type = 'password';
                this.textContent = '👁️';
            }
        });
    });
});
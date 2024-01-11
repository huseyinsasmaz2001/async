// Attend que le contenu de la page soit entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {
    // Récupère les références des éléments HTML nécessaires
    const btn = document.getElementById("btnAutoDestruction");
    const name = document.getElementById("name");
    const country = document.getElementById("country");
    const answer = document.getElementById("response");

    // Initialise les variables pour stocker le nom et le pays entrés par l'utilisateur
    let enteredName;
    let enteredCountry;

    // Ajoute un écouteur d'événements pour le clic sur le bouton
    btn.addEventListener("click", () => {
        // Récupère les valeurs entrées par l'utilisateur
        enteredName = name.value;
        enteredCountry = country.value;

        // Vérifie si le nom et le pays sont non vides
        if (enteredName.trim() !== '' && enteredCountry.trim() !== '') {
            // Appelle la fonction pour effectuer la requête API avec le nom et le pays
            fetchAge(enteredName, enteredCountry);
        } else {
            // Affiche une alerte si le nom ou le pays est vide
            alert('Veuillez entrer un nom et sélectionner un pays.');
        }
    });

    // Définit une fonction pour effectuer la requête API Agify
    function fetchAge(enteredName, enteredCountry) {
        // Construit l'URL de l'API Agify en utilisant le nom et le pays
        let apiUrl = `https://api.agify.io?name=${enteredName}&country_id=${enteredCountry}`;

        // Utilise la fonction fetch pour effectuer la requête API
        fetch(apiUrl)
            .then(response => response.json()) // Transforme la réponse en format JSON
            .then(data => {
                console.log('API Response:', data);

                // Vérifie si la propriété "age" existe dans la réponse
                if (data.age !== undefined) {
                    // Appelle la fonction pour insérer la réponse dans l'interface utilisateur
                    insertAnswer(data);
                    // Appelle la fonction pour stocker les données dans le localStorage
                    localStor(data);
                } else {
                    // Affiche une alerte si la propriété "age" n'est pas définie dans la réponse
                    alert('L\'âge n\'a pas pu être déterminé pour ce nom.');
                }
            })
            .catch(error => {
                // Affiche une erreur dans la console en cas d'échec de la requête
                console.error('Erreur lors de la requête API Agify:', error);
            });
    }

    // Définit une fonction pour insérer la réponse dans l'interface utilisateur
    const insertAnswer = (data) => {
        // Crée un élément <p> pour afficher l'âge moyen
        let ageAnswer = document.createElement("p");
        // Définit le texte de l'élément en fonction de la réponse de l'API
        ageAnswer.textContent = `Âge moyen pour ${enteredName}: ${data.age !== undefined ? data.age : 'Non disponible'}`;

        // Crée un élément <p> pour afficher le nombre de personnes
        let countAnswer = document.createElement("p");
        // Définit le texte de l'élément en fonction de la réponse de l'API
        countAnswer.textContent = `Nombre de personnes: ${data.count !== undefined ? data.count : 'Non disponible'}`;

        // Efface le contenu existant avant d'ajouter les nouveaux éléments
        answer.innerHTML = '';
        // Ajoute les éléments créés au conteneur de réponse
        answer.appendChild(ageAnswer);
        answer.appendChild(countAnswer);
    };

    // Définit une fonction pour stocker les données dans le localStorage
    const localStor = (data) => {
        localStorage.setItem("age", data.age);
        localStorage.setItem("number", data.count);
    };
});

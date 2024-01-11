// Sélectionne l'élément HTML avec l'ID 'generateJson' et le stocke dans la variable generateJson.
const generateJson = document.getElementById('generateJson');

// Ajoute un écouteur d'événements qui réagit au clic sur le bouton avec l'ID 'generateJson'.
generateJson.addEventListener('click', () => {

    // Utilise la fonction fetch pour récupérer le contenu du fichier 'ex1.json'.
    fetch('ex1.json')
        // Gère la réponse de la requête fetch et la transforme en JSON.
        .then(response => response.json())

        // Utilise les données JSON récupérées pour générer dynamiquement une liste.
        .then(data => {
            // Sélectionne l'élément HTML avec l'ID 'list' et le stocke dans la variable list.
            const list = document.getElementById('list');

            // Efface le contenu existant de la liste.
            list.innerHTML = '';

            // Parcourt les données JSON (un tableau d'objets) et crée dynamiquement des éléments de liste pour chaque objet.
            data.forEach(hero => {
                // Crée un élément de liste (<li>) pour chaque objet dans le tableau.
                const listItem = document.createElement('li');

                // Utilise la fonction Object.values() pour obtenir un tableau des valeurs des propriétés de l'objet.
                // Ensuite, crée dynamiquement des éléments de paragraphe (<p>) pour chaque valeur et les ajoute à l'élément de liste.
                Object.values(hero).forEach(value => {
                    const valueItem = document.createElement('div');
                    valueItem.textContent = value;
                    listItem.appendChild(valueItem);
                });

                // Ajoute l'élément de liste à l'élément HTML avec l'ID 'list'.
                list.appendChild(listItem);
            });
        })

        // Gère les erreurs qui pourraient survenir lors du chargement du fichier JSON.
        .catch(error => console.error('Erreur lors du Chargement du fichier json:', error));
});

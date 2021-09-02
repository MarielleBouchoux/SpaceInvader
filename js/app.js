// Process d'organisation en module
var app = {
    styles: [
        'plain',
        'empty',
        'light',
        'highlight',
        'highlight2'
    ],

    // Pour pouvoir choisir une couleur et s'en souvenir lorsque l'on cliquera
    // sur une case on va avoir besoin d'une variable comme mémoire
    selectedStyle: 'plain',

    // je créé aussi une variable pour me souvenir de la couleur custom choisi.
    customColor: null,

    init: function () {
        app.generateConfigForm();

        app.generatePalette();

        document.getElementById('custom-color').addEventListener('change', function (event) {
            app.customColor = event.target.value;
        });

        app.createGrid(8, 32);
    },

    generateConfigForm: function () {
        // III : Génération du formulaire + gestion du formulaire

        var formNode = document.querySelector('.configuration');

        var gridSizeInput = document.createElement('input');
        gridSizeInput.setAttribute('type', 'number');
        gridSizeInput.setAttribute('name', 'gridSize');
        gridSizeInput.required = true;
        gridSizeInput.setAttribute('placeholder', 'Taille de la grille');
        gridSizeInput.id = 'gridSize';

        formNode.appendChild(gridSizeInput);

        var cellSizeInput = document.createElement('input');
        cellSizeInput.setAttribute('type', 'number');
        cellSizeInput.setAttribute('name', 'cellSize');
        cellSizeInput.required = true;
        cellSizeInput.setAttribute('placeholder', 'Taille d\'une cellule');
        cellSizeInput.id = 'cellSize';

        formNode.appendChild(cellSizeInput);

        var submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        submitButton.classList.add('config-form-submit');
        submitButton.textContent = 'Valider';
        formNode.appendChild(submitButton);

        var eventName = 'submit';

        formNode.addEventListener(eventName, function (event) {
            event.preventDefault();

            var gridSizeInputNode = document.getElementById('gridSize');
            var cellSizeInputNode = document.getElementById('cellSize');
            // gridSizeInputNode est un Node <input> et ces nodes on une propriété
            // spéciale : value pour accéder à la valeur saisie dans le champ.
            app.createGrid(gridSizeInputNode.value, cellSizeInputNode.value);
        });
    },

    generatePalette: function () {

        var paletteNode = document.getElementById('palette');

        app.styles.forEach(function (style) {
            // Tour à tour style vaudra 'plain', 'empty', 'light', 'highlight',
            var styleNode = document.createElement('div');
            styleNode.classList.add('style-selector');

            // On peut rajouter les attributs de notre choix sur les balises
            styleNode.setAttribute('data-style-name', style);

            styleNode.addEventListener('click', app.selectStyle)

            paletteNode.appendChild(styleNode);
        });
    },

    selectStyle: function (event) {
        var itemSelectorNode = event.target;

        app.selectedStyle = itemSelectorNode.getAttribute('data-style-name');

        app.customColor = null;
    },

    // II : Gérer le click sur un pixel

    changeCellColor: function (event) {
 
        var cellNode = event.target;


        if (app.customColor) {
            console.log('custom', app.customColor);
            cellNode.setAttribute('data-style-name', '');
            cellNode.style.backgroundColor = app.customColor;
        } else {
            console.log('style');
   
            cellNode.setAttribute('data-style-name', app.selectedStyle);
            // setAttribute créé l'attribut s'il n'existe pas encore
            // et ne se préocupe pas de la valeur déjà en place, il remplace par ce qui
            // est donnée

            // Les propriétés style sont prioritaires sur le CSS je dois donc l'annuler
            // au cas ou l'utilisateur voudrait remplacer une valeur custom
            cellNode.style.removeProperty('background-color');
        }

    },
  
    createGrid: function (gridSize, cellSize) {
        
        var gridNode = document.getElementById('invader');

        // Etape III : On doit commencer par "vider" la grille actuelle

        // Tant qu'il y a un premier noeud => tant qu'il y a au moins un noeud enfant
        while (gridNode.firstChild) {
            // Supprime le dernier enfant de la liste
            gridNode.removeChild(gridNode.lastChild);
        }

        /**
         * Pour forcer les cellules à revenir à la ligne au bout de "gridSize"
         * (avec le flex wrap) je dois donner une width à mon block
         */
        gridNode.style.width = gridSize * cellSize + 'px';

        // Je fais une boucle pour générer mes 64 (8*8) cellules
        for (var cellIndex = 0; cellIndex < gridSize * gridSize; cellIndex++) {
          
            var cellNode = document.createElement('div');
            cellNode.classList.add('cell');
            cellNode.style.width = cellSize + 'px';
            cellNode.style.height = cellSize + 'px';
           
            var eventName = 'click';
            cellNode.addEventListener(eventName, app.changeCellColor);
          
            gridNode.appendChild(cellNode);
            
        }
    }
};

/
document.addEventListener('DOMContentLoaded', function () {
    
    app.init();
})
var _$RoadFinding = {};
var _$TabRoadInfo = {};
var xmax = 24;
var ymax = 24;

(function () {
    _$RoadFinding.roadInfo = function (x, y) {
        this.posX = x;
        this.posY = y;
    };

    _$RoadFinding.preloadRoad = function (game) {
        game.load.image('road-line1', 'assets/tilemaps/road/road-1.png');
        game.load.image('road-line2', 'assets/tilemaps/road/road-2.png');

        game.load.image('road-bend1', 'assets/tilemaps/road/roadL1.png');
        game.load.image('road-bend2', 'assets/tilemaps/road/roadL2.png');
        game.load.image('road-bend3', 'assets/tilemaps/road/roadL3.png');
        game.load.image('road-bend4', 'assets/tilemaps/road/roadL4.png');

        game.load.image('road-inter1', 'assets/tilemaps/road/roadT1.png');
        game.load.image('road-inter2', 'assets/tilemaps/road/roadT2.png');
        game.load.image('road-inter3', 'assets/tilemaps/road/roadT3.png');
        game.load.image('road-inter4', 'assets/tilemaps/road/roadT4.png');

        game.load.image('road-cross', 'assets/tilemaps/road/road+.png');
    };


})();

(function () {
    _$TabRoadInfo.tabRoad = new Array(xmax);
    for (tailleTabRoad = 0; tailleTabRoad < xmax; tailleTabRoad++) {
        _$TabRoadInfo.tabRoad[tailleTabRoad] = new Array(ymax);
    }

    /*
     * Ajout des données dans le tableau avec comme clé les coord
     * comme clé 
     */
    _$TabRoadInfo.addRoadObject = function (coordX, coordY, game) {
        var spriteRoadCreate;
        coordXRoad = coordX / 128;
        coordYRoad = coordY / 128;
        //Création d'un objet route pour pouvoir l'envoyer dans le tableau
        var roadInfo = new _$RoadFinding.roadInfo(coordXRoad, coordYRoad);
        _$TabRoadInfo.tabRoad[coordXRoad][coordYRoad] = roadInfo;


        // Si il est entouré par 4 routes
        if (typeof _$TabRoadInfo.tabRoad[coordXRoad][coordYRoad - 1] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad][coordYRoad + 1] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad - 1][coordYRoad] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad + 1][coordYRoad] !== 'undefined') {
            spriteRoadCreate = game.add.sprite(coordX, coordY, 'road-cross');
        }
        //Si il est entouré par 3 routes
        //haut-bas-droite
        else if (typeof _$TabRoadInfo.tabRoad[coordXRoad][coordYRoad - 1] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad][coordYRoad + 1] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad + 1][coordYRoad] !== 'undefined') {
            spriteRoadCreate = game.add.sprite(coordX, coordY, 'road-inter4');
        }
        //haut-bas-gauche
        else if (typeof _$TabRoadInfo.tabRoad[coordXRoad][coordYRoad - 1] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad][coordYRoad + 1] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad - 1][coordYRoad] !== 'undefined') {
            spriteRoadCreate = game.add.sprite(coordX, coordY, 'road-inter2');
        }
        //haut-gauche-droite
        else if (typeof _$TabRoadInfo.tabRoad[coordXRoad - 1][coordYRoad] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad + 1][coordYRoad] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad][coordYRoad + 1] !== 'undefined') {
            spriteRoadCreate = game.add.sprite(coordX, coordY, 'road-inter1');
        }
        // bas-gauche-droite
        else if (typeof _$TabRoadInfo.tabRoad[coordXRoad - 1][coordYRoad] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad + 1][coordYRoad] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad][coordYRoad - 1] !== 'undefined') {
            spriteRoadCreate = game.add.sprite(coordX, coordY, 'road-inter3');
        }
        // si il est entouré par 2 routes
        //haut-gauche
        else if (typeof _$TabRoadInfo.tabRoad[coordXRoad - 1][coordYRoad] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad ][coordYRoad-1] !== 'undefined'){
            spriteRoadCreate = game.add.sprite(coordX, coordY, 'road-bend3');
        }
        //bas-gauche
        else if (typeof _$TabRoadInfo.tabRoad[coordXRoad - 1][coordYRoad] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad ][coordYRoad+1] !== 'undefined'){
            spriteRoadCreate = game.add.sprite(coordX, coordY, 'road-bend2');
        }
        //haut-droite
        else if (typeof _$TabRoadInfo.tabRoad[coordXRoad + 1][coordYRoad] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad ][coordYRoad-1] !== 'undefined'){
            spriteRoadCreate = game.add.sprite(coordX, coordY, 'road-bend4');
        }
        //bas-droite
        else if (typeof _$TabRoadInfo.tabRoad[coordXRoad + 1][coordYRoad] !== 'undefined' &&
                typeof _$TabRoadInfo.tabRoad[coordXRoad ][coordYRoad+1] !== 'undefined'){
            spriteRoadCreate = game.add.sprite(coordX, coordY, 'road-bend1');
        }
        // Si il y a une route au dessus ou en dessous
        else if (typeof _$TabRoadInfo.tabRoad[coordXRoad][coordYRoad - 1] !== 'undefined' ||
                typeof _$TabRoadInfo.tabRoad[coordXRoad][coordYRoad + 1] !== 'undefined') {
            spriteRoadCreate = game.add.sprite(coordX, coordY, 'road-line2');
        }else{
            spriteRoadCreate = game.add.sprite(coordX, coordY, 'road-line1');
        }

        return spriteRoadCreate;
    };
})();
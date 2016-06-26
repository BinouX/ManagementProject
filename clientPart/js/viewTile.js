/* global choiseLabel, self, _$Population, _$Budget, Phaser, mng, _$RoadFinding, _$TabRoadInfo, _$menu */

var _$ = {};
var _$ChooseBuild = function (build, price, population) {
    this.build = build;
    this.price = price;
    this.population = population;
};
var _$Construction = function (coordX, coordY, build, sprite) {
    this.coordX = coordX;
    this.coordY = coordY;
    this.build = build;
    this.sprite = sprite;
};
var _$TabConstruction = new Array();

function showMenu() {
    menu1 = game.add.sprite(0, 0, 'house');
    menu2 = game.add.sprite(0, 128, 'road-line1');
    menu6 = game.add.sprite(0, 128 * 6, 'destroy');
    menu1.fixedToCamera = true;
    menu2.fixedToCamera = true;
    menu6.fixedToCamera = true;
}

var game = new Phaser.Game(window.innerWidth, window.innerHeight,
        Phaser.CANVAS, 'phaser-example', {preload: preload, create: create,
            update: update, render: render});

function preload() {
    game.load.tilemap('map_tile', 'assets/tilemaps/maps/map_2D.json',
            null, Phaser.Tilemap.TILED_JSON);
    _$menu.preloadMenu(game);
    _$RoadFinding.preloadRoad(game);
}

function render() {
    game.debug.inputInfo(32, 32);
}

function create() {
    _$Budget.budget = 2000;
    _$Population.population = 0;
    _$Population.impot = 10;

    // Affichage de la map
    _$.map = game.add.tilemap('map_tile');
    _$.map.addTilesetImage('grass_1', 'grass');

    _$.currentTile = _$.map.getTile(32, 32);
    // Affichage du fond en herbe
    _$.layer = _$.map.createLayer('Background');
    _$.layer.resizeWorld();

    // Affichage du carré de la tile
    _$.marker = game.add.graphics();
    _$.marker.lineStyle(2, 0x000000, 1);
    _$.marker.drawRect(0, 0, 128, 128);

    budget_label = game.add.text(window.innerWidth - 300, 375, _$Budget.budget, {font: '24px Arial', fill: '#fff'});
    budget_label.fixedToCamera = true;

    population_label = game.add.text(window.innerWidth - 300, 350, _$Population.population, {font: '24px Arial', fill: '#fff'});
    population_label.fixedToCamera = true;

    impot_less = game.add.text(window.innerWidth - 350, 400, '-', {font: '24px Arial', fill: '#fff'});
    impot_less.fixedToCamera = true;
    impot_less.inputEnabled = true;
    impot_less.events.onInputUp.add(function () {
        decreaseImpot();
    });
    impot_label = game.add.text(window.innerWidth - 300, 400, _$Population.impot, {font: '24px Arial', fill: '#fff'});
    impot_label.fixedToCamera = true;
    impot_more = game.add.text(window.innerWidth - 325, 400, '+', {font: '24px Arial', fill: '#fff'});
    impot_more.fixedToCamera = true;
    impot_more.inputEnabled = true;
    impot_more.events.onInputUp.add(function () {
        increaseImpot();
    });

    pause_label = game.add.text(window.innerWidth - 300, 300, 'Choix construction',
            {font: '24px Arial', fill: '#fff'});
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        game.input.onDown.add(unpause, self);
        choiseLabel = game.add.text(game.input.activePointer.worldX - 200, game.input.activePointer.worldY + 350, 'Click outside menu to continue', {font: '30px Arial', fill: '#fff'});
        game.paused = true;
    });
    pause_label.fixedToCamera = true;

    _$.cursors = game.input.keyboard.createCursorKeys();
    game.input.onUp.add(updateMarker, this);
}

function destroyMenu() {
    if (typeof menu1 !== 'undefined') {
        menu1.destroy();
        menu2.destroy();
        menu6.destroy();
    }
}

function unpause(event) {
    // Si jeu en pause
    showMenu();
    if (game.paused) {
        // Coin du menu
        var x1 = 0;
        var x2 = 128;
        var y1 = 0;
        var y2 = window.innerHeight;
        x1.fixedToCamera = true;
        x2.fixedToCamera = true;
        y1.fixedToCamera = true;
        y2.fixedToCamera = true;
        // Clique dans le menu?
        if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
            // Tableau de choix
            var choisemap = ['house', 'road-line1', 'tree', 'Other2', 'Other3', 'Other4', 'destroy'];

            // Donne le clique du menu
            var y = event.y - y1;

            // Calcul du choix 
            var choise = Math.floor(y / 128);

            // choix
            _$ChooseBuild.build = choisemap[choise];
            if (_$ChooseBuild.build === 'house') {
                _$ChooseBuild.price = 100;
                _$ChooseBuild.population = 5;
            }
            if (_$ChooseBuild.build === 'road-line1') {
                _$ChooseBuild.price = 10;
                _$ChooseBuild.population = 0;
            }
            if (_$ChooseBuild.build === 'destroy') {
                _$ChooseBuild.price = 0;
                _$ChooseBuild.population = 0;
            }
            
            choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
        } else {
            // Unpause 
            game.paused = false;
            // Suppression element du menu
            game.input.onDown.add(destroyMenu);
            choiseLabel.destroy();
        }
    }
}

function update() {
    //recuperation des coordonnees de la souris pour affiche
    // la mise a jour de la tile
    _$.marker.x = _$.layer.getTileX((game.input.activePointer.worldX) / 8) * 128;
    _$.marker.y = _$.layer.getTileY((game.input.activePointer.worldY) / 8) * 128;
    if (game.input.mousePointer.isDown)
    {
        if (_$.map.getTile(_$.layer.getTileX(_$.marker.x), _$.layer.getTileY(_$.marker.y)) !== _$.currentTile)
        {
            _$.map.putTile(_$.currentTile, _$.layer.getTileX(_$.marker.x), _$.layer.getTileY(_$.marker.y));
        }
    }
    // Parti camera , premiere parti avec les fleches directionelles du clavier
    // l'autre avec la souris
    if (_$.cursors.left.isDown || (game.input.mousePointer.x < (window.innerWidth / 10)))
    {
        game.camera.x -= 4;
    } else if (_$.cursors.right.isDown ||
            (game.input.mousePointer.x > window.innerWidth - (window.innerWidth / 10)))
    {
        game.camera.x += 4;
    }

    if (_$.cursors.up.isDown || (game.input.mousePointer.y < window.innerHeight / 10))
    {
        game.camera.y -= 4;
    } else if (_$.cursors.down.isDown ||
            (game.input.mousePointer.y > window.innerHeight - (window.innerHeight / 10)))
    {
        game.camera.y += 4;
    }
    updateMenu();
}

//modifation des routes adjacentes
function updateAdjacentRoad(coordX, coordY) {

    var rightRoad = _$TabRoadInfo.calculUpdateRoad((coordX + 128), (coordY));
    var leftRoad = _$TabRoadInfo.calculUpdateRoad((coordX - 128), (coordY));
    var botRoad = _$TabRoadInfo.calculUpdateRoad((coordX), (coordY + 128));
    var topRoad = _$TabRoadInfo.calculUpdateRoad((coordX), (coordY - 128));

    for (var i = 0; i < _$TabConstruction.length; i++) {
        if (_$TabConstruction[i].coordX === coordX + 128 &&
                _$TabConstruction[i].coordY === coordY &&
                _$TabConstruction[i].build === 'road-line1') {
            _$TabConstruction[i].sprite.loadTexture(rightRoad, 0);
        }
        if (_$TabConstruction[i].coordX === coordX - 128 &&
                _$TabConstruction[i].coordY === coordY &&
                _$TabConstruction[i].build === 'road-line1') {
            _$TabConstruction[i].sprite.loadTexture(leftRoad, 0);
        }
        if (_$TabConstruction[i].coordX === coordX &&
                _$TabConstruction[i].coordY === coordY + 128 &&
                _$TabConstruction[i].build === 'road-line1') {
            _$TabConstruction[i].sprite.loadTexture(botRoad, 0);
        }
        if (_$TabConstruction[i].coordX === coordX &&
                _$TabConstruction[i].coordY === coordY - 128 &&
                _$TabConstruction[i].build === 'road-line1') {
            _$TabConstruction[i].sprite.loadTexture(topRoad, 0);
        }
    }
}

function addBuild() {
    if (!isNaN(_$ChooseBuild.price) && ((_$Budget.budget - _$ChooseBuild.price) >= 0)) {
        var coordX = _$.layer.getTileX(_$.marker.x / 8) * 128;
        var coordY = _$.layer.getTileY(_$.marker.y / 8) * 128;
        if (_$ChooseBuild.build === 'road-line1') {
            var spriteRoad = _$TabRoadInfo.addRoadObject(coordX, coordY, game);
            updateAdjacentRoad(coordX, coordY);
            var sprite = spriteRoad;
        } else {
            var sprite = game.add.sprite(_$.layer.getTileX(_$.marker.x / 8) * 128, _$.layer.getTileY(_$.marker.y / 8) * 128, _$ChooseBuild.build);
        }
        var build = _$ChooseBuild.build;
        sprite.inputEnabled = true;
        sprite.input.useHandCursor = true;
        if (!isNaN(_$ChooseBuild.population)) {
            increasePopulation(_$ChooseBuild.population);
        }
        decreaseBudget(_$ChooseBuild.price);
        _$TabConstruction.push(new _$Construction(coordX, coordY, build, sprite));
    }
}

function destroyBuild(tabConstru, i) {
    tabConstru.sprite.events.onInputDown.add(destroySprite, this);
    delete _$TabRoadInfo.tabRoad[tabConstru.coordX / 128][tabConstru.coordY / 128];
    _$TabConstruction.splice(i, 1);
}

function destroySprite(sprite) {
    sprite.destroy();
}
function updateMarker() {
    if (game.input.mousePointer.isDown)
    {
        for (var i = 0; i < _$TabConstruction.length; i++) {
            if ((_$TabConstruction[i].coordX === _$.layer.getTileX(_$.marker.x / 8) * 128) &&
                    (_$TabConstruction[i].coordY === _$.layer.getTileY(_$.marker.y / 8) * 128) &&
                    (typeof _$TabConstruction[i].build !== 'undefined')) {
                if (_$ChooseBuild.build === 'destroy') {
                    destroyBuild(_$TabConstruction[i], i);
                }
                console.log(_$TabConstruction[i].sprite.key);
                return null;
            }
        }
        if (_$ChooseBuild.build !== 'destroy') {
            addBuild();
        }
    }
    game.world.bringToTop(impot_less);
    game.world.bringToTop(impot_label);
    game.world.bringToTop(impot_more);
    game.world.bringToTop(budget_label);
    game.world.bringToTop(population_label);
    game.world.bringToTop(pause_label);
}

function updateMenu() {
    if (typeof _$ChooseBuild.build === 'undefined') {
        x = "Choose";
    } else {
        x = _$ChooseBuild.build;
    }
    pause_label.setText("Construction : " + x);
    budget_label.setText(_$Budget.budget + " $");
    population_label.setText(_$Population.population + " Populations");
    impot_label.setText(_$Population.impot + " %");
}

function paperBoardLess() {
    budget_label.scale.set(0);
    population_label.scale.set(0);
    impot_less.scale.set(0);
    impot_label.scale.set(0);
    impot_more.scale.set(0);
}

function paperBoardMore() {
    budget_label.scale.set(1);
    population_label.scale.set(1);
    impot_less.scale.set(1);
    impot_label.scale.set(1);
    impot_more.scale.set(1);
}
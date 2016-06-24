/* global choiseLabel, self, _$Population, _$Budget, Phaser, mng, _$RoadFinding, _$TabRoadInfo */

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
    menu3 = game.add.sprite(0, 128 * 2, 'road-cross');
    menu6 = game.add.sprite(0, 128 * 6, 'destroy');
    menu1.fixedToCamera = true;
    menu2.fixedToCamera = true;
    menu3.fixedToCamera = true;
    menu6.fixedToCamera = true;
}

var game = new Phaser.Game(window.innerWidth, window.innerHeight,
        Phaser.CANVAS, 'phaser-example', {preload: preload, create: create,
            update: update, render: render});

function preload() {
    game.load.tilemap('map_tile', 'assets/tilemaps/maps/map_2D.json',
            null, Phaser.Tilemap.TILED_JSON);
    game.load.image('grass', 'assets/tilemaps/textures/grass_1.png');
    game.load.image('house', 'assets/tilemaps/building/house.png');
    game.load.image('destroy', 'assets/tilemaps/building/pickaxeDestroy.png');
    _$RoadFinding.preloadRoad(game);
}

function render() {
    game.debug.inputInfo(32, 32);
}

function create() {
    _$Budget.budget = 2000;
    _$Population.population = 0;
    _$Population.impot = 10;
    // intégration d'une horloge 
    var timeString;
    var timeText;

    // compteur horloge

    var timer;
    var milliseconds = 0;
    var seconds = 0;
    var minutes = 0;


    // Affichage de la map
    _$.map = game.add.tilemap('map_tile');
    _$.map.addTilesetImage('grass_1', 'grass');
//    _$.map.addTilesetImage('grass_1+tree', 'tree');

    _$.currentTile = _$.map.getTile(32, 32);
    // Affichage du fond en herbe
    _$.layer = _$.map.createLayer('Background');
    // Affichage des arbres
//    _$.layer = _$.map.createLayer('Foreground');
    _$.layer.resizeWorld();




    // Affichage du carrÃ© de la tile
    _$.marker = game.add.graphics();
    _$.marker.lineStyle(2, 0x000000, 1);
    _$.marker.drawRect(0, 0, 128, 128);

    // Permet les commandes au clavier

    // Affiche  de l'horloge 

    /*  var style = {fill: "#F5F5F5"};
     timeText = game.add.text(40, 120, timeString, style);
     
     var timer = game.time.create();
     timer.repeat(Phaser.Timer.SECOND, 720, updateTime, this);
     timer.start();
     
     var tileClock = game.add.group();
     var tileClockBackground = game.make.graphics();
     tileClockBackground.beginFill(0x000000, 0.5);
     tileClockBackground.drawRect(0, window.innerHeight - 200, window.innerWidth / 3, 200);
     tileClockBackground.endFill();
     tileClock.add(tileClockBackground);
     tileClock.fixedToCamera = true;
     
     
     
     function updateTime() {
     
     var time = new Date();
     var day = time.getDay();
     var date = time.getDate();
     var month = time.getMonth();
     var hours = time.getHours();
     var minutes = time.getMinutes();
     var seconds = time.getSeconds();
     var textclock = "Horloge : ";
     
     // Jour de la semaine 
     
     if (day == 0) {
     day = "Dimanche";
     }
     if (day == 1) {
     day = "Lundi";
     }
     if (day == 2) {
     day = "Mardi";
     }
     if (day == 3) {
     day = "Mercredi";
     }
     if (day == 4) {
     day = "Jeudi";
     }
     if (day == 5) {
     day = "Vendredi";
     }
     if (day == 6) {
     day = "Samedi";
     }
     
     // jour du mois 
     
     if (month == 0) {
     month = "Janvier";
     }
     if (month == 1) {
     month = "Fevrier";
     }
     if (month == 2) {
     month = "Mars";
     }
     
     if (month == 3) {
     month = "Avril";
     }
     
     if (month == 4) {
     month = "Mai";
     }
     
     if (month == 5) {
     month = "Juin";
     }
     if (month == 6) {
     month = "Juillet";
     }
     if (month == 7) {
     month = "aout";
     }
     
     if (month == 8) {
     month = "Septembre";
     }
     
     if (month == 9) {
     month = "Octobre";
     }
     if (month == 10) {
     month = "Novembre";
     }
     if (month == 11) {
     month = "Decembre";
     }
     
     // formatage heure 
     
     if (hours < 10) {
     hours = "0" + hours;
     }
     if (minutes < 10) {
     minutes = "0" + minutes;
     }
     if (seconds < 10) {
     seconds = "0" + seconds;
     
     }
     
     timeString = textclock + day + " " + date + " " + month + " " + hours + ":" + minutes + ":" + seconds;
     timeText.text = timeString;
     text = game.add.text(0, window.innerHeight - 50, timeString, {}, tileClock);
     }
     //  appel tile selector
     
     createTileSelector();
     game.input.addMoveCallback(updateMarker, this);*/

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
        game.paused = true;
        game.input.onDown.add(unpause, self);
        choiseLabel = game.add.text(game.input.activePointer.worldX - 200, game.input.activePointer.worldY + 350, 'Click outside menu to continue', {font: '30px Arial', fill: '#fff'});
//        choiseLabel.anchor.setTo(0.5, 0.5);
    });

    pause_label.fixedToCamera = true;
    game.input.onDown.add(unpause, self);

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
                // Suppression element du menu
                menu1.destroy();
                menu2.destroy();
                menu3.destroy();
                menu6.destroy();
                choiseLabel.destroy();

                // Unpause 
                game.paused = false;
            }
        }
    }

    game.input.onUp.add(updateMarker, this);
    _$.cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    //recuperation des coordonnees de la souris pour affiche
    // la mise a jour de la tile

    _$.marker.x = _$.layer.getTileX((game.input.activePointer.worldX) / 8) * 128;
    _$.marker.y = _$.layer.getTileY((game.input.activePointer.worldY) / 8) * 128;
    if (game.input.mousePointer.isDown)
    {
//        if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
//        {
//            _$.currentTile = _$.map.getTile(_$.layer.getTileX(_$.marker.x), _$.layer.getTileY(_$.marker.y));
//        } else
//        {
        if (_$.map.getTile(_$.layer.getTileX(_$.marker.x), _$.layer.getTileY(_$.marker.y)) !== _$.currentTile)
        {
            _$.map.putTile(_$.currentTile, _$.layer.getTileX(_$.marker.x), _$.layer.getTileY(_$.marker.y));
        }
//        }
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

function addBuild() {
    if (!isNaN(_$ChooseBuild.price) && ((_$Budget.budget - _$ChooseBuild.price) >= 0)) {
        var coordX = _$.layer.getTileX(_$.marker.x / 8) * 128;
        var coordY = _$.layer.getTileY(_$.marker.y / 8) * 128;
        if (_$ChooseBuild.build === 'road-line1') {
            var spriteRoad = _$TabRoadInfo.addRoadObject(coordX, coordY, game);
            var gaucheRoad = _$TabRoadInfo.updateRoad((coordX), (coordY));
            console.log(gaucheRoad);
//            console.log("droite " + _$TabRoadInfo.updateRoad((coordX+128), (coordY)));
//            console.log("haut " + _$TabRoadInfo.updateRoad((coordX), (coordY-128)));
//            console.log("bas " + _$TabRoadInfo.updateRoad((coordX), (coordY+128)));
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

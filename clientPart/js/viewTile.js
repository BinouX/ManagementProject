
var game = new Phaser.Game(window.innerWidth, window.innerHeight,
        Phaser.CANVAS, 'phaser-example', {preload: preload, create: create,
            update: update, render: render});

function preload() {
    game.load.tilemap('map_tile', 'assets/tilemaps/maps/map_2D.json',
            null, Phaser.Tilemap.TILED_JSON);
    game.load.image('grass', 'assets/tilemaps/textures/grass_1.png');
    game.load.image('tree', 'assets/tilemaps/textures/grass_1+tree.png');
    game.load.image('house', 'assets/tilemaps/building/house.png');

}

function render() {
    game.debug.inputInfo(32, 32);
}

var _$ ={};

function create() {

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
    _$.map.addTilesetImage('grass_1+tree', 'tree');
    _$.map.addTilesetImage('map', 'house');

    currentTile = _$.map.getTile(32, 32);
    // Affichage du fond en herbe
    _$.layer = _$.map.createLayer('Background');
    // Affichage des arbres

    _$.layer = _$.map.createLayer('Foreground');
    _$.layer.resizeWorld();




    // Affichage du carré de la tile
    _$.marker = game.add.graphics();
    _$.marker.lineStyle(2, 0x000000, 1);
    _$.marker.drawRect(0, 0, 128, 128);

    // Permet les commandes au clavier

    // Affiche  de l'horloge 

    var style = {fill: "#F5F5F5"};
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

    game.input.addMoveCallback(updateMarker, this);

    _$.cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    //recuperation des coordonnées de la souris pour affiche
    // la mise a jour de la tile
    _$.marker.x = _$.layer.getTileX((game.input.activePointer.worldX) / 8) * 128;
    _$.marker.y = _$.layer.getTileY((game.input.activePointer.worldY) / 8) * 128;
    if (game.input.mousePointer.isDown)
    {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
        {
            _$.currentTile = _$.map.getTile(_$.layer.getTileX(_$.marker.x), _$.layer.getTileY(_$.marker.y));
        } else
        {
            if (_$.map.getTile(_$.layer.getTileX(_$.marker.x), _$.layer.getTileY(_$.marker.y)) != _$.currentTile)
            {
                _$.map.putTile(_$.currentTile, _$.layer.getTileX(_$.marker.x), _$.layer.getTileY(_$.marker.y));
            }
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
}

function pickTile(pointer) {
    _$.currentTile = game.math.snapToFloor(pointer.x, 128) / 128;
}

function updateMarker() {


    if (game.input.mousePointer.isDown)
    {
        _$.map.putTile(_$.currentTile, _$.layer.getTileX(_$.marker.x), _$.layer.getTileY(_$.marker.y), _$.layer*8);
        //game.add.sprite(_$.layer.getTileX(_$.marker.x), _$.layer.getTileY(_$.marker.y), 'house');
        //map.fill(_$.currentTile, _$.layer.getTileX(_$.marker.x), _$.layer.getTileY(_$.marker.y), 8, 8, _$.layer);
    }
}

function createTileSelector() {

    // creation selecteur de tile 

    var tileSelector = game.add.group();
//    var sprite = game.add.sprite(window.innerWidth - 200, window.innerHeight / 15, 'house');
    var tileSelectorBackground = game.make.graphics();
    tileSelectorBackground.beginFill(0x000000, 0.6);
    tileSelectorBackground.drawRect(window.innerWidth - 250, 0, 250, window.innerHeight);
    tileSelectorBackground.endFill();

    tileSelector.add(tileSelectorBackground);

    var tileStrip = tileSelector.create(window.innerWidth - 200, window.innerHeight / 15, 'house');
    tileStrip.inputEnabled = true;
    tileStrip.events.onInputDown.add(pickTile, this);

//    tileSelector.add(sprite);
    tileSelector.fixedToCamera = true;


}

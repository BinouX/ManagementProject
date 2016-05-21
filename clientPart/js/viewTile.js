
var game = new Phaser.Game(window.innerWidth, window.innerHeight,
        Phaser.CANVAS, 'phaser-example', {preload: preload, create: create,
            update: update, render: render});

function preload() {
    game.load.tilemap('map_tile', 'assets/tilemaps/maps/map_2D.json',
            null, Phaser.Tilemap.TILED_JSON);
    game.load.image('grass', 'assets/tilemaps/textures/grass_1.png');
    game.load.image('tree', 'assets/tilemaps/textures/grass_1+tree.png');
    game.load.image('house', 'house.png');

}

function render() {
    game.debug.inputInfo(32, 32);
}

var map;
var layer;

var maker;
var currentTile;
var cursors;

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
    map = game.add.tilemap('map_tile');
    map.addTilesetImage('grass_1', 'grass');
    map.addTilesetImage('grass_1+tree', 'tree');

    currentTile = map.getTile(32, 32);
    // Affichage du fond en herbe
    layer = map.createLayer('Background');
    // Affichage des arbres
    layer = map.createLayer('Foreground');
    layer.resizeWorld();




    // Affichage du carré de la tile
    marker = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 128, 128);

    // Permet les commandes au clavier

    // Affiche  de l'horloge 

    var style = { fill : "#F5F5F5" };
    timeText = game.add.text(40, 120, timeString, style);

     var timer = game.time.create();
    timer.repeat(1 * Phaser.Timer.SECOND, 7200, updateTime, this);
    timer.start();

function updateTime() {
    
    var time = new Date();
    var day = time.getDay();
    var date = time.getDate();
    var month = time.getMonth();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var textclock = "Horloge : "

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
        month = "Janvier"

    }
    if (month == 1) {
        month = "Fevrier"

    }
     if (month == 2) {
        month = "Mars"

    }

    if (month == 3) {
        month = "Avril"

    }

    if (month == 4) {
        month = "Mai"

    }

    if (month == 5) {
        month = "Juin"

    }
    if (month == 6) {
        month = "Juillet"

    }
     if (month == 7) {
        month = "aout"

    }

    if (month == 8) {
        month = "Septembre"

    }

    if (month == 9) {
        month = "Octobre"

    }

     if (month == 10) {
        month = "Novembre"

    }

    if (month == 11) {
        month = "Decembre"

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

    timeString =  textclock + day + " " + date + " " + month +" " + hours + ":" + minutes + ":" + seconds;
    timeText.text = timeString;
}



    //  appel tile selector

    createTileSelector();

    
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    //recuperation des coordonnées de la souris pour affiche
    // la mise a jour de la tile
    marker.x = layer.getTileX((game.input.activePointer.worldX) / 8) * 128;
    marker.y = layer.getTileY((game.input.activePointer.worldY) / 8) * 128;
    if (game.input.mousePointer.isDown)
    {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
        {
            currentTile = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
        } else
        {
            if (map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y)) != currentTile)
            {
                map.putTile(currentTile, layer.getTileX(marker.x), layer.getTileY(marker.y));
            }
        }
    }
    // Parti camera , premiere parti avec les fleches directionelles du clavier
    // l'autre avec la souris
    if (cursors.left.isDown || (game.input.mousePointer.x < (window.innerWidth / 10)))
    {
        game.camera.x -= 4;
    } else if (cursors.right.isDown ||
            (game.input.mousePointer.x > window.innerWidth - (window.innerWidth / 10)))
    {
        game.camera.x += 4;
    }

    if (cursors.up.isDown || (game.input.mousePointer.y < window.innerHeight / 10))
    {
        game.camera.y -= 4;
    } else if (cursors.down.isDown ||
            (game.input.mousePointer.y > window.innerHeight - (window.innerHeight / 10)))
    {
        game.camera.y += 4;
    }
}
function createTileSelector() {
  
    // creation selecteur de tile 

    var tileSelector = game.add.group();
    var sprite = game.add.sprite(640, 390, 'house');
    var tileSelectorBackground = game.make.graphics();
    tileSelectorBackground.beginFill(0x000000, 0.5);
    tileSelectorBackground.drawRect(600, 385, 490, 150);
    tileSelectorBackground.endFill();
    tileSelector.add(tileSelectorBackground);
    tileSelector.add(sprite);
    tileSelector.fixedToCamera = true;


}

function createClock() {
  
    // creation selecteur de tile 

    var clock = game.add.group();
    var horloge = timeString;
    var tileSelectorBackground2 = game.make.graphics();
    tileSelectorBackground2.beginFill(0x000000, 0.5);
    tileSelectorBackground2.drawRect(600, 385, 490, 150);
    tileSelectorBackground2.endFill();
    tileSelector.add(tileSelectorBackground2);
    tileSelector.add(horloge);
    tileSelector.fixedToCamera = true;


}
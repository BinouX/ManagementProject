
var game = new Phaser.Game(window.innerWidth, window.innerHeight,
        Phaser.CANVAS, 'phaser-example', {preload: preload, create: create,
            update: update, render: render});

function preload() {
    game.load.tilemap('map_tile', 'assets/tilemaps/maps/map_2D.json',
            null, Phaser.Tilemap.TILED_JSON);
    game.load.image('grass', 'assets/tilemaps/textures/grass_1.png');
    game.load.image('tree', 'assets/tilemaps/textures/grass_1+tree.png');
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

    //Permet les commandes au clavier
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

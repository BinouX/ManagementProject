/*// window.innerWidth for local width
 // window.innerHeight for local height
 
 // Just for update game at the local screen on load
 
 Building = function (game, i) {
 
 //  We call the Phaser.Sprite passing in the game reference
 //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
 Phaser.Sprite.call(this, game.input.mousePointer.x, game.input.mousePointer.y, 'skyscraper');
 var house = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'skyscraper');
 
 house.anchor.setTo(0.0);
 
 game.add.existing(house);
 
 };
 Building.prototype = Object.create(Phaser.Sprite.prototype);
 Building.prototype.constructor = Building;
 
 
 var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-example',
 {preload: preload, create: create, update: update, render: render});
 var text;
 var counter = 0;
 
 function preload() {
 
 //  You can fill the preloader with as many assets as your game requires
 
 //  Here we are loading an image. The first parameter is the unique
 //  string by which we'll identify the image later in our code.
 
 //  The second parameter is the URL of the image (relative)
 game.load.image('city', 'assets/starterMap.png');
 game.load.image('skyscraper', 'assets/house_1.png');
 
 
 }
 
 function create() {
 
 //  This creates a simple sprite that is using our loaded image and
 //  displays it on-screen and assign it to a variable
 
 var image = game.add.sprite(game.world.centerX, game.world.centerY, 'city');
 //  Moves the image anchor to the middle, so it centers inside the game properly
 image.anchor.set(0.5);
 //  Enables all kind of input actions on this image (click, etc)
 image.inputEnabled = true;
 image.events.onInputDown.add(addBuild, this);
 }
 
 function gofull() {
 //FullScreenMode
 /*
 * Add line on create
 * game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
 * game.input.onDown.add(gofull, this);
 */
/*    if (game.scale.isFullScreen)
 {
 game.scale.stopFullScreen();
 } else
 {
 game.scale.startFullScreen(false);
 }
 
 }
 
 function update() {
 
 }
 
 function render() {
 posX = game.input.mousePointer.x;
 posY = game.input.mousePointer.y;
 //console.log(posX + " " + posY);
 game.debug.inputInfo(32, 32);
 
 }
 
 function addBuild() {
 counter++;
 // var house = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'skyscraper');
 //house.anchor.set(0.0);
 //house.inputEnabled = true;
 //house.input.enableDrag();
 new Building(game, counter);
 }
 
 */

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', {preload: preload, create: create, render: render});

//  Dimensions
var spriteWidth = 80;
var spriteHeight = 80;

//  UI
var ui;
var paletteArrow;
var coords;
var widthText;
var heightText;
var rightCol = window.innerWidth - 300;

//  Drawing Area
var canvas;
var canvasBG;
var canvasGrid;
var canvasSprite;
var canvasZoom = 10;

//  Keys + Mouse
var keys;
var isDown = false;
var isErase = false;

//  Palette
var ci = 0;
var color = 0;
var palette = 0;
var pmap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

//  Data
var frame = 1;
var frames = [[]];

var data;

function resetData() {

    data = [];

    for (var y = 0; y < spriteHeight; y++)
    {
        var a = [];

        for (var x = 0; x < spriteWidth; x++)
        {
            a.push('.');
        }

        data.push(a);
    }

}

function copyToData(src) {

    data = [];

    for (var y = 0; y < src.length; y++)
    {
        var a = [];

        for (var x = 0; x < src[y].length; x++)
        {
            a.push(src[y][x]);
        }

        data.push(a);
    }

}

function cloneData() {

    var clone = [];

    for (var y = 0; y < data.length; y++)
    {
        var a = [];

        for (var x = 0; x < data[y].length; x++)
        {
            var v = data[y][x];
            a.push(v);
        }

        clone.push(a);
    }

    return clone;

}

function createUI() {

    game.create.grid('uiGrid', 32 * 16, 32, 32, 32, 'rgba(255,255,255,0.5)');

    ui = game.make.bitmapData(800, 32);

    drawPalette();

    ui.addToWorld();

    var style = {font: "20px Courier", fill: "#fff", tabs: 80};

    coords = game.add.text(rightCol, 8, "X: 0\tY: 0", style);
    //color of palette
    game.add.text(12, 9, pmap.join("\t"), {font: "14px Courier", fill: "#000", tabs: 32});
    game.add.text(11, 8, pmap.join("\t"), {font: "14px Courier", fill: "#ffff00", tabs: 32});

    paletteArrow = game.add.sprite(8, 36, 'arrow');

    //  width

    widthText = game.add.text(rightCol, 60, "Width: " + spriteWidth, style);

    // height

    heightText = game.add.text(rightCol, 100, "Height: " + spriteHeight, style);

}

function createDrawingArea() {

    game.create.grid('drawingGrid', 16 * canvasZoom, 16 * canvasZoom, canvasZoom, canvasZoom, 'rgba(0,191,243,0.8)');

    canvas = game.make.bitmapData(spriteWidth * canvasZoom, spriteHeight * canvasZoom);
    canvasBG = game.make.bitmapData(canvas.width + 2, canvas.height + 2);

    canvasBG.rect(0, 0, canvasBG.width, canvasBG.height, '#fff');
    canvasBG.rect(1, 1, canvasBG.width - 2, canvasBG.height - 2, '#3f5c67'); //background drawing area

    var x = 10;
    var y = 64;

    canvasBG.addToWorld(x, y);
    canvasSprite = canvas.addToWorld(x + 1, y + 1);
    canvasGrid = game.add.sprite(x + 1, y + 1, 'drawingGrid');
    canvasGrid.crop(new Phaser.Rectangle(0, 0, spriteWidth * canvasZoom, spriteHeight * canvasZoom));

}



function refresh() {

    //  Update both the Canvas
    canvas.clear();


    for (var y = 0; y < spriteHeight; y++)
    {
        for (var x = 0; x < spriteWidth; x++)
        {
            var i = data[y][x];

            if (i !== '.' && i !== ' ')
            {
                color = game.create.palettes[palette][i];
                canvas.rect(x * canvasZoom, y * canvasZoom, canvasZoom, canvasZoom, color);
            }
        }
    }

}

function createEventListeners() {

    keys = game.input.keyboard.addKeys(
            {
                'erase': Phaser.Keyboard.X,
                'color0': Phaser.Keyboard.ZERO,
                'color1': Phaser.Keyboard.ONE,
                'color2': Phaser.Keyboard.TWO,
                'color3': Phaser.Keyboard.THREE,
                'color4': Phaser.Keyboard.FOUR,
                'color5': Phaser.Keyboard.FIVE,
                'color6': Phaser.Keyboard.SIX,
                'color7': Phaser.Keyboard.SEVEN,
                'color8': Phaser.Keyboard.EIGHT,
                'color9': Phaser.Keyboard.NINE,
                'color10': Phaser.Keyboard.A,
                'color11': Phaser.Keyboard.B,
                'color12': Phaser.Keyboard.C,
                'color13': Phaser.Keyboard.D,
                'color14': Phaser.Keyboard.E,
                'color15': Phaser.Keyboard.F
            }
    );

    keys.erase.onDown.add(cls, this);

    for (var i = 0; i < 16; i++)
    {
        keys['color' + i].onDown.add(setColor, this, 0, i);
    }

    game.input.mouse.capture = true;
    game.input.onDown.add(onDown, this);
    game.input.onUp.add(onUp, this);
    game.input.addMoveCallback(paint, this);

}

function cls() {

    resetData();
    refresh();

}

function drawPalette() { // couleur GUI

    //  Draw the palette to the UI bmd
    ui.clear(0, 0, 32 * 16, 32);

    var x = 0;

    for (var clr in game.create.palettes[palette])
    {
        ui.rect(x, 0, 32, 32, game.create.palettes[palette][clr]);
        x += 32;
    }

    ui.copy('uiGrid');

}


function setColor(i, p) {

    if (typeof p !== 'undefined')
    {
        //  It came from a Keyboard Event, in which case the color index is in p, not i.
        i = p;
    }

    if (i < 0)
    {
        i = 15;
    } else if (i >= 16)
    {
        i = 0;
    }

    //create color palette
    colorIndex = i;
    color = game.create.palettes[palette][pmap[colorIndex]];

    paletteArrow.x = (i * 32) + 8;

}

function nextColor() {

    var i = colorIndex + 1;
    setColor(i);

}

function prevColor() {

    var i = colorIndex - 1;
    setColor(i);

}


function preload() {
    game.load.image('city', 'assets/starterMap.png');
    game.load.image('skyscraper', 'assets/house_1.png');
}

function create() {

    //   So we can right-click to erase
    document.body.oncontextmenu = function () {
        return false;
    };

    Phaser.Canvas.setUserSelect(game.canvas, 'none');
    Phaser.Canvas.setTouchAction(game.canvas, 'none');

    game.stage.backgroundColor = '#505050';

    createUI();
    createDrawingArea();
    createEventListeners();

    resetData();
    setColor(0);

}

function render() {
    game.debug.inputInfo(32, 32);
}

// when click 
function onDown(pointer) {

    if (pointer.y <= 32)
    {
        setColor(game.math.snapToFloor(pointer.x, 32) / 32);
    } else
    {
        isDown = true;

        if (pointer.rightButton.isDown)
        {
            isErase = true;
        } else
        {
            isErase = false;
        }

        paint(pointer);
    }

}
// when click is finish
function onUp() {
    isDown = false;
}

function paint(pointer) {

    //  Get the grid loc from the pointer
    var x = game.math.snapToFloor(pointer.x - canvasSprite.x, canvasZoom) / canvasZoom;
    var y = game.math.snapToFloor(pointer.y - canvasSprite.y, canvasZoom) / canvasZoom;

    if (x < 0 || x >= spriteWidth || y < 0 || y >= spriteHeight)
    {
        return;
    }

    coords.text = "X: " + x + "\tY: " + y;

    if (!isDown)
    {
        return;
    }

    if (isErase)
    {
        data[y][x] = '.';
        canvas.clear(x * canvasZoom, y * canvasZoom, canvasZoom, canvasZoom, color);
    } else
    {
        data[y][x] = pmap[colorIndex];
        canvas.rect(x * canvasZoom, y * canvasZoom, canvasZoom, canvasZoom, color);
    }

}
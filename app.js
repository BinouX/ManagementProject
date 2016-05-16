


var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, });

function preload() {

    //  chargement des images

    game.load.image('ville', '743.jpg');
    game.load.image('avion', 'avion.png');


}


var timeString;
var timeText;

function create() {


// Paramètrage nom du joueur et nom de la ville 

    var player = prompt("Entrez votre nom", "joueur");
    localStorage.setItem("playerName", player);

// paramétrage du nom de la ville 

    var city = prompt("Entrez un nom de ville", "ville");
    localStorage.setItem("cityName", city);

//  affiche d'un sprite à l'écran

    game.add.sprite(0, 0, 'ville');
    sprite = game.add.sprite(-200, 200, 'avion');

// copy du sprite 

    tween = game.add.tween(sprite);

// déplacement de l'avion

    tween.to({ x: 800 }, 5000, 'Linear', true, 0);

// Affichage du nom du joueur à l'écran

    var text = "nom du joueur : " + player;
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    var t = game.add.text(game.world.centerX-300, 10, text, style);

// Afficahe du nom de la ville à l'écran 

    var text1 = "ville : " + city;
    var style1 = { font: "65px Arial", fill: "#ff0044", align: "center" };
    var t1 = game.add.text(game.world.centerX-300, 80, text1, style1);


// Paramétrage de l'horloge 

    var style = { fill : "#FFFFFF" };
    timeText = game.add.text(50, 150, timeString, style);

    var timer = game.time.create();
    timer.repeat(1 * Phaser.Timer.SECOND, 7200, updateTime, this);
    timer.start();





}

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
        day = "Vendrdi";
    }
    if (day == 4) {
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
var _$menu = {};

(function () {
    _$menu.preloadMenu = function (game) {
        game.load.spritesheet('button', 'assets/tilemaps/button/button_sprite_sheet.png', 193, 71);
        game.load.image('grass', 'assets/tilemaps/textures/grass_1.png');
        game.load.image('house', 'assets/tilemaps/building/house.png');
        game.load.image('destroy', 'assets/tilemaps/building/pickaxeDestroy.png');
    };

    _$menu.showMenu = function (game) {
        button = game.add.button(200, 200, 'button', openWindow, this, 2, 1, 0);
        button.input.useHandCursor = true;

        popin = game.add.sprite(game.world.centerX, game.world.centerY, 'destroy');
        popin.anchor.set(0.5);
        popin.inputEnabled = true;

        var pw = (popin.width / 2) - 30;
        var ph = (popin.height / 2) - 8;

        //  And click the close button to close it down again
        var closeButton = game.make.sprite(pw, -ph, 'house');
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.input.useHandCursor = true;
        closeButton.events.onInputDown.add(closeWindow, this);

        popin.addChild(closeButton);
        popin.scale.set(0.1);
        game.world.bringToTop(popin);
    };

    _$menu.openWindow = function (game) {
        if ((tween !== null && tween.isRunning) || popin.scale.x === 1)
        {
            return;
        }

        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        tween = game.add.tween(popin.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Elastic.Out, true);
    };

    _$menu.closeWindow = function (game) {
        if (tween && tween.isRunning || popin.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        tween = game.add.tween(popin.scale).to({x: 0.1, y: 0.1}, 500, Phaser.Easing.Elastic.In, true);
    };
})();
let InputManager = (superclass) => class extends superclass {

    initManualInput() {

        // Capture certain keys to prevent their default actions in the browser.
        // This is only necessary because this is an HTML5 game. Games on other
        // platforms may not need code like this.
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

        this.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

        // Based on an assumption (not great but I know it's there)
        this.attackKey.onDown.add(this.attack, this);

    }

    // This function should return true when the player activates the "go left" control
    // In this case, either holding the right arrow or tapping or clicking on the left
    // side of the screen.
    leftInputIsActive() {
        let isActive = false;

        isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        isActive |= (this.game.input.activePointer.isDown &&
            this.game.input.activePointer.x < this.game.width / 4);

        return isActive;
    }

    // This function should return true when the player activates the "go right" control
    // In this case, either holding the right arrow or tapping or clicking on the right
    // side of the screen.
    rightInputIsActive() {
        let isActive = false;

        isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
        isActive |= (this.game.input.activePointer.isDown &&
            this.game.input.activePointer.x > this.game.width / 2 + this.game.width / 4);

        return isActive;
    }

    // This function should return true when the player activates the "jump" control
    // In this case, either holding the up arrow or tapping or clicking on the center
    // part of the screen.
    upInputIsActive(duration) {
        let isActive = false;

        isActive = this.game.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
        isActive |= (this.game.input.activePointer.justPressed(duration + 1000 / 60) &&
            this.game.input.activePointer.x > this.game.width / 4 &&
            this.game.input.activePointer.x < this.game.width / 2 + this.game.width / 4);

        return isActive;
    }

    // This function returns true when the player releases the "jump" control
    upInputReleased() {
        let released = false;

        released = this.game.input.keyboard.upDuration(Phaser.Keyboard.UP);
        released |= this.game.input.activePointer.justReleased();

        return released;
    }

};

export default InputManager;
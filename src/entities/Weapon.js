class Weapon extends Phaser.Sprite {

    constructor(game, x, y, name) {

        super(game, x, y, name);

        game.add.existing(this);
        game.physics.arcade.enable(this);

        this.id = "???";
        this.name = name;
        this.body.allowGravity = false;
        this.body.enable = false;
        this.alpha = 0;

        // You can override this
        this.stats = {
            damageOutput: 1
        };

    }

    damageOutput() {
        return this.stats.damageOutput;
    }

    use() {

        // TODO: To clean up properly. :P
        if (this.body.enabled)
            return;

        this.body.enable = true;
        this.alpha = 1;

        let self = this;
        setTimeout(function () {
            self.body.enable = false;
            self.alpha = 0;
        }, 100);

    }

}
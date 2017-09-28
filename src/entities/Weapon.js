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

    use(time) {

        // TODO: To clean up properly. :P It'd be pretty useful to sniff the animation for it to get the timings.
        // Don't forget though, the weapon must sync with the thing that's using it (as if it's attached), can make
        // this more advanced but for now it matters not.
        if (this.body.enabled)
            return;

        this.body.enable = true;
        this.alpha = 1;

        this.game.time.events.add(time, () => {
            this.body.enable = false;
            this.alpha = 0;
        }, this);

    }

}

export default Weapon;
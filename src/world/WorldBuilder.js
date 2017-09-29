class WorldBuilder {

    constructor(game) {
        this.game = game;
    }

    makeTest(game) {

        let grp = this.game.add.group();

        for (var x = 0; x < this.game.width; x += 32) {
            // Add the ground blocks, enable physics on each, make them immovable
            var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
            groundBlock.body.immovable = true;
            groundBlock.body.allowGravity = false;
            grp.add(groundBlock);
        }

        return grp;

    }

}

export default WorldBuilder;
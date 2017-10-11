import Helpers from '../helpers/Helpers';
import Animator from '../animation/Animator';

class BaseEntity extends Phaser.Sprite {

    constructor(game, x, y, name, data) {

        // Phaser requires all of these to happen
        super(game, x, y, name);

        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        // Custom data to expect for this entity
        this.config = {};
        this.stats = {};
        this.equipment = {};
        this.activeWeapon = null;

        // Define properties with supplied data (TODO: Revise method)
        this.mountData(data);

        // Flags
        this.busy = false;
        this.disabled = false;
        this.justGotHit = false;

        // Set the anchor
        this.anchor.x = 0.5;

        // Animations setup
        if (this.animations)
            this.animator = new Animator(this.animations);

    }

    mountData(data) {

        if (data.config)
            Object.defineProperties(this.config, data.config);

        if (data.stats)
            Object.defineProperties(this.stats, data.stats);

        if (data.equipment)
            Object.defineProperties(this.equipment, data.equipment);

        if (data.body)
            this.body.setSize(data.body.x, data.body.y, data.body.w, data.body.h);

    }

    resetMovement() {

        this.body.velocity.x = 0;

    }

    correctScale(dir) {

        this.scale.setTo(dir, 1);

        if (this.activeWeapon)
            this.activeWeapon.scale.setTo(dir, 1);

    }

    faceTarget(pos) {

        this.correctScale(Helpers.getTargetDirection(pos.x, this.x));

    }

}

export default BaseEntity;
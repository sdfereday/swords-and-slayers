import Helpers from '../helpers/Helpers';
import Weapon from '../entities/Weapon';
import Animator from '../animation/Animator';

class BaseEntity extends Phaser.Sprite {

    constructor(game, x, y, name, data) {

        // Phaser requires all of these to happen
        super(game, x, y, name);

        game.add.existing(this);
        game.physics.arcade.enable(this);

        // Custom data to expect for this entity
        this.config = {};
        this.stats = {};
        this.equipment = {};
        this.activeWeapon = null;

        // Define properties with supplied data (TODO: Revise method)
        if (data) {
            Object.defineProperties(this, data);
        }

        // Flags
        this.busy = false;
        this.disabled = false;
        this.jumping = false;

        // Set the anchor
        this.anchor.x = 0.5;

        // Animations setup
        this.animator = new Animator(this.animations);

    }

    resetMovement() {

        this.body.velocity.x = 0;

    }

    setBody(bodyData) {

        this.body.setSize(bodyData.x, bodyData.y, bodyData.w, bodyData.h);
        return this;

    }

    correctScale(dir) {

        this.scale.setTo(dir, 1);

        if (this.activeWeapon)
            this.activeWeapon.scale.setTo(dir, 1);

    }

    faceTarget(pos) {

        let dir = Helpers.getTargetDirection(pos.x, this.x);

        this.scale.setTo(dir, 1);

        if (this.activeWeapon)
            this.activeWeapon.scale.setTo(dir, 1);

    }

    attachWeapon(weaponData, pos) {

        this.activeWeapon = new Weapon(this.game, 0, 0, weaponData.sprite);
        this.activeWeapon.y += this.activeWeapon.height;

        if (pos) {
            this.activeWeapon.x = pos.x;
            this.activeWeapon.y = pos.y;
        }

        this.activeWeapon.setBody(weaponData);

        return this;

    }

}

export default BaseEntity;
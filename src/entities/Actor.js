import mix from '../helpers/Mix';
import Helpers from '../helpers/Helpers';
import BaseEntity from '../entities/BaseEntity';

/* Actors are used in any instance that doesn't require user interaction
or dynamic game functionality. Ideally for static NPC's of theatre scenes. */
class Actor extends mix(BaseEntity).with() {

    update() {

        this.resetMovement();

        //this.animate();

    }

    /// AI Movement ///
    moveTo(dir) {

        

        this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;
        this.correctScale(dir);

    }

    moveTo(pos, speed) {

        if (Helpers.distance(this, pos) < this.width / 3)
            return true;

        let dir = Helpers.getTargetDirection(pos.x, this.x);
        
        this.body.velocity.x += dir > 0 ? speed : -speed;
        this.correctScale(dir);

    }

    /// Animations ///
    animate() {

        // Movement
        if (this.body.velocity.x != 0) {
            this.animator.play('run');
        } else {
            this.animator.play('idle');
        }

    }

}

export default Actor;
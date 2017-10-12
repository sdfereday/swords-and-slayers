import mix from '../helpers/Mix';
import Helpers from '../helpers/Helpers';
import BaseEntity from '../entities/BaseEntity';

/* Actors are used in any instance that doesn't require user interaction
or dynamic game functionality. Ideally for static NPC's of theatre scenes. */
class Actor extends mix(BaseEntity).with() {

    update() {

        //this.animate();

    }

    /// AI Movement ///
    stop() {

        //console.log("Actor stopped at", new Date().getTime());
        this.resetMovement();

    }

    moveTo(data) {

        this.resetMovement();

        let pos = {
            x: data.x,
            y: data.y
        };
        
        let dir = Helpers.getTargetDirection(pos.x, this.x);

        this.body.velocity.x = dir > 0 ? data.speed : -data.speed;
        this.correctScale(dir);

        return Helpers.distance(this, pos) < this.width / 3;

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
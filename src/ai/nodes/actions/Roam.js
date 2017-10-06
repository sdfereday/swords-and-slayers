import Helpers from '../../../helpers/Helpers';

class Roam extends b3.Action {

    constructor(ignoreY) {

        super();

        this.name = 'Roam';
        this.currentLocation = {
            x: 0,
            y: 0
        };
        this.destination = {
            x: 0,
            y: 0
        };

        this.ignoreY = ignoreY;

    }

    open(tick) {

        this.currentLocation.x = tick.target.x;
        this.currentLocation.y = tick.target.y;

        this.destination.x = Helpers.getRandomInt(10, 1240);
        this.destination.y = tick.target.y;
        
        console.log("Roam started...");

    }

    tick(tick) {

        if (this.ignoreY)
            this.destination.y = tick.target.y;

        tick.target.moveTo(this.destination);

        if (Helpers.distance({ x: tick.target.x, y: tick.target.y }, this.destination) < 30) {
            tick.target.resetMovement();
            console.log("Destination reached.");
            return b3.SUCCESS;
        }

        return b3.RUNNING;

    }

}

export default Roam;
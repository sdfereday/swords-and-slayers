import Helpers from '../../../helpers/Helpers';

class RandomWait extends b3.Action {

    constructor() {

        super();
        this.name = 'RandomWait';
        this.startTime = 0;
        this.endTime = 0;

    }

    open(tick) {

        this.startTime = (new Date()).getTime();
        this.endTime = Helpers.getRandomInt(1, 3) * 1000;

        console.log("Wait started.");

    }

    tick(tick) {

        var currTime = (new Date()).getTime();

        if (currTime - this.startTime > this.endTime) {
          console.log("Wait complete.");
          return b3.SUCCESS;
        }
    
        return b3.RUNNING;

    }

}

export default RandomWait;
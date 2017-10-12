class Helpers {

    static distance(object, target) {

        let a = object.x - target.x;
        let b = object.y - target.y;

        return Math.sqrt(a * a + b * b);

    }

    // -> http://davidarvelo.com/blog/array-number-range-sequences-in-javascript-es6/
    static numberArray(begin, end) {
        let arr = [];
        for (let i = begin; i < end; i += 1) {
            arr.push(i);
        }
        return arr;
    }

    static animDuration(fps, frameNum) {
        return (fps * frameNum) * 10;
    }

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    static getTargetDirection(tx, ownerx) {

        return tx > ownerx ? 1 : -1;

    }

    static targetWithinBounds(target, owner, range) {

        // Checks if the current target is within a good enough 'x' zone to prevent left-right shift (might need 'y' in future)
        return target && (target.x > owner.x - range && target.x < owner.x + range);

    }

    static guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

}

export default Helpers;
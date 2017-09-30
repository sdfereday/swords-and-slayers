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

}

export default Helpers;
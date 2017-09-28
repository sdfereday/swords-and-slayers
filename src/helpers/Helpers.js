class Helpers {

    static distance(object, target) {

        let a = object.x - target.x;
        let b = object.y - target.y;

        return Math.sqrt(a * a + b * b);

    }

    // -> http://davidarvelo.com/blog/array-number-range-sequences-in-javascript-es6/
    static numberArray (begin, end) {
        let arr = [];
        for (let i = begin; i < end; i += 1) {
            arr.push(i);
        }
        return arr;
    }

    static animDuration (fps, frameNum) {
        return (fps * frameNum) * 10;
    }

}

export default Helpers;
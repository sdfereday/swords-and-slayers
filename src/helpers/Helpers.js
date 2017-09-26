class Helpers {

    static Dist(object, target) {

        let a = object.x - target.x;
        let b = object.y - target.y;

        return Math.sqrt(a * a + b * b);

    }

}
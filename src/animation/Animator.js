class Animator {

    constructor(phaseranimator) {

        this.animator = phaseranimator;
        this.currentAnim = null;
        this.playWhenDone = '';

    }

    registerMany(data) {

        for(let i = 0; i < data.length; i++) {
            this.register(data[i]);
        }

    }

    register(data) {

        if (this.getAnimation(data.name))
            return;

        let anim = this.animator.add(data.name, data.frames, data.fps, data.loops);

        if(!data.loops)
            anim.onComplete.add(this.animDone, this);

    }

    getAnimation(str) {
        
        return this.animator.getAnimation(str);

    }

    play(str) {

        // Forces wait for none-looped animations (experimental)
        if(this.currentAnim && !this.currentAnim.loop) {
            this.playWhenDone = str;
            return;
        }

        let anim = this.animator.play(str);
        this.currentAnim = anim;

        return anim;
    }

    animDone() {

        if(this.playWhenDone.length > 0)
            this.currentAnim = this.animator.play(this.playWhenDone);
                
    }

}

export default Animator;
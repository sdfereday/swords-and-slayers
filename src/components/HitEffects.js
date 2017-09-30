let HitEffects = (superclass) => class extends superclass {

    damageFlash() {

        this.disabled = true;

        this.alpha = 0;
        this.tint = 0xffffff;

        this.flashTween = this.game.add.tween(this).to({
            tint: 0xffeeff,
            alpha: 1
        }, 10, "Linear", true, 0, -1);
        this.flashTween.yoyo(true, 10);

        this.game.time.events.add(Phaser.Timer.SECOND * 0.6, function () {
            this.disabled = false;
            this.alpha = 1;
            this.tint = 0xffffff;
            this.flashTween.stop();
        }, this);

    }

};

export default HitEffects;
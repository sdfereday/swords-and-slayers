import Weapon from '../entities/Weapon';

let AttachedWeapon = (superclass) => class extends superclass {

    attachWeapon(weaponData, pos) {

        this.activeWeapon = new Weapon(this.game, 0, 0, weaponData.sprite);
        this.activeWeapon.y += this.activeWeapon.height;

        if (pos) {
            this.activeWeapon.x = pos.x;
            this.activeWeapon.y = pos.y;
        }

        this.activeWeapon.setBody(weaponData.body);

        return this;

    }

};

export default AttachedWeapon;
class WorldBuilder {

    constructor(game) {

        this.game = game;
        this.layers = [];
        this.gameTileMap = {};

    }

    initializeWorld(data) {

        //  The 'name' key here is the Loader key given in game.load.tilemap
        this.gameTileMap = this.game.add.tilemap(data.tilemap);

        //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
        //  The second parameter maps this name to the Phaser.Cache key 'tiles'
        for (let i = 0; i < data.layers.length; i++) {

            // Not sure you need to add this for each layer... todo double check (it's important for performance).
            // Obviously if there's a different one for each layer, then this is fine.
            let layer = data.layers[i];
            this.gameTileMap.addTilesetImage(layer.name, layer.cacheName);

            //  Creates a layer from the World1 layer in the map data.
            //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
            //  If naming from data, make sure it's the right name (see level json).
            this.layers.push({
                layerData: layer,
                phaserLayer: this.gameTileMap.createLayer(i)
            });

        }

        // Sanity checks
        if (this.layers.length === 0)
            throw new Error("You must have some layers defined.");

        //https://github.com/hexus/phaser-arcade-slopes
        // https://phaser.io/docs/2.4.4/Phaser.Tilemap.html#setCollision
        // Mapping the index would be just a matter of checking a property in 'tiled' for example (0 is floor tile in this instance)
        let collision = this.getLayerByProperty('collisionLayer');
        if (collision) {

            this.gameTileMap.setCollisionByExclusion([0], true, collision.phaserLayer);

            // Hide it
            collision.phaserLayer.alpha = 0;

            if (this.game.slopes)
                this.game.slopes.convertTilemapLayer(collision.phaserLayer, 'arcadeslopes', this.getTilesetByName(collision.layerData.name).firstgid);

        }

        //  This resizes the game world to match the layer dimensions
        let worldSizeLayer = this.getLayerByProperty('worldSizeLayer');
        if (worldSizeLayer) {
            worldSizeLayer.phaserLayer.resizeWorld();
        }

        // We're assuming this is a platform game right now (see site for more info)
        // Prefer the minimum Y offset globally (also see 'enableSlopesFor')
        if(this.game.slopes)
            this.game.slopes.preferY = true;

        // Debugs the phaser layer (in case you didn't notice)
        //collision.phaserLayer.debug = true;

    }

    postProcess() {

        //  Increase z index of layer if flagged as a foreground (doesn't care how many there are)
        for(let i = 0; i < this.layers.length; i++) {
            if(this.layers[i].layerData.foregroundLayer)
                this.layers[i].phaserLayer.bringToTop();
        }

    }

    getLayerByProperty(prop) {

        return this.layers.find(x => x.layerData[prop]);

    }

    getTilesetByName(name) {

        return this.gameTileMap.tilesets.find(x => x.name === name);

    }

    enableSlopesFor(ent) {

        if(!this.game.slopes || !ent)
            return;

        this.game.slopes.enable(ent);

        // Prefer the minimum Y offset for this physics body,
        // it's turned way up to avoid animation glitch when leaving
        // flat to slope (experiment with it)
        // Beware in lower resolutions, this needs to be reduced dramatically.
        let pulldownValue = 150;

        // Apply these to prevent sliding and 'over zelousness' on y axis
        ent.body.slopes.preferY = true;
        ent.body.slopes.pullDown = pulldownValue;
        ent.body.slopes.pullBottomLeft = pulldownValue;
        ent.body.slopes.pullBottomRight = pulldownValue;
        ent.body.slopes.pullTopLeft = pulldownValue;
        ent.body.slopes.pullTopRight = pulldownValue;

        // In case you need them
        // ent.body.slopes.pullUp = pulldownValue;
        // ent.body.slopes.pullDown = pulldownValue;
        // ent.body.slopes.pullLeft = pulldownValue;
        // ent.body.slopes.pullRight = pulldownValue;
        // ent.body.slopes.pullTopLeft = pulldownValue;
        // ent.body.slopes.pullTopRight = pulldownValue;
        // ent.body.slopes.pullBottomLeft = pulldownValue;
        // ent.body.slopes.pullBottomRight = pulldownValue;

    }

}

export default WorldBuilder;
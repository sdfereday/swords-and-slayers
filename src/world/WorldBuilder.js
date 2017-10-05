class WorldBuilder {

    constructor(game, data) {

        this.game = game;
        this.layers = [];

        //  The 'name' key here is the Loader key given in game.load.tilemap
        this.gameTileMap = this.game.add.tilemap(data.tilemap);

        //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
        //  The second parameter maps this name to the Phaser.Cache key 'tiles'
        for (let i = 0; i < data.layers.length; i++) {

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

        // https://phaser.io/docs/2.4.4/Phaser.Tilemap.html#setCollision
        // Mapping the index would be just a matter of checking a property in 'tiled' for example (0 is floor tile in this instance)
        let collision = this.getCollisionLayer();
        if (collision) {
            this.gameTileMap.setCollisionByExclusion([0], true, collision);
        }

        //  This resizes the game world to match the layer dimensions
        let worldSizeLayer = this.getWorldSizeLayer();
        if (worldSizeLayer) {
            worldSizeLayer.resizeWorld();
        }

    }

    getCollisionLayer() {

        return this.layers.find(x => x.layerData.collisionLayer).phaserLayer;

    }

    getWorldSizeLayer() {

        return this.layers.find(x => x.layerData.worldSizeLayer).phaserLayer;

    }

}

export default WorldBuilder;
const MapData = [
    {
        id: "testlevel",
        world: {
            tilemap: 'level-tilemap',
            layers: [
                {
                    name: 'world-sheet',
                    cacheName: 'world-atlas',
                    worldSizeLayer: true
                },
                {
                    name: 'colliders',
                    cacheName: 'col-atlas',
                    collisionLayer: true
                },
                {
                    name: 'foreground',
                    cacheName: 'world-atlas',
                    foregroundLayer: true
                }
            ]
        },
        enemies: [
            {
                id: 'bug',
                pos: {
                    x: 150,
                    y: 100
                }
            }
        ]
    }
]

export default MapData;
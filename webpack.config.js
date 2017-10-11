// Don't forget to specify '--config' when you're using your own config file, or it'll just break
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin')
const path = require('path');

let phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
let b3Mod = path.join(__dirname, '/node_modules/behavior3js/');
let sat = path.join(__dirname, '/node_modules/sat/');
let libs = path.join(__dirname, '/libs/');

module.exports = {
    entry: {
        // Order matters here in vendor bundle (apparently)
        dist: path.resolve(__dirname, './src/game.js'),
        vendor: ['pixi', 'p2', 'phaser', 'sat', 'arcadeSlopes', 'miniEvents', 'b3', 'react']
    },
    output: {
        // We do this ([name]) as we've got two entry points above (otherwise they'll fight against each other)
        // -> https://webpack.js.org/guides/code-splitting/
        // -> https://webpack.js.org/configuration/output/#output-filename
        filename: '[name].bundled.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // modules: [path.resolve(__dirname, 'libs')],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'pixi': path.join(phaserModule, 'build/custom/pixi.js'),
            'p2': path.join(phaserModule, 'build/custom/p2.js'),
            'phaser': path.join(phaserModule, 'build/custom/phaser-split.js'),
            'sat': path.join(sat, 'SAT.min.js'),
            'arcadeSlopes': path.join(libs, 'phaser-arcade-slopes.js'),
            'miniEvents': path.join(libs, 'mini-events-min.js'),
            'b3': path.join(b3Mod, 'libs/behavior3-0.2.2.js')
        }
    },
    module: {
        rules: [
            {
                test: /pixi\.js/,
                use: ['expose-loader?PIXI']
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: /p2\.js/,
                use: ['expose-loader?p2']
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules')
            }
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundled.js'/* filename= */ }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: 'vendor'
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true
        }),
        new webpack.ProvidePlugin({
            // It seems to fix the null ref issue, thought it's not reccommended (will look in to a better solution)
            b3: 'b3',
            SAT: 'sat'
        }),
        new webpack.optimize.UglifyJsPlugin({
            drop_console: false,
            minimize: true,
            output: {
                comments: false
            }
        })
    ],
    watch: true
};
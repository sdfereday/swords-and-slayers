// Don't forget to specify '--config' when you're using your own config file, or it'll just break
const webpack = require('webpack');
const path = require('path');

let phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');

module.exports = {
    entry: {
        dist: path.resolve(__dirname, './src/app.js'),
        vendor: ['pixi', 'p2', 'phaser', 'b3']
    },
    output: {
        // We do this ([name]) as we've got two entry points above (otherwise they'll fight against each other)
        // -> https://webpack.js.org/guides/code-splitting/
        // -> https://webpack.js.org/configuration/output/#output-filename
        filename: '[name].bundled.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [path.resolve(__dirname, 'libs')],
        alias: {
            'phaser': path.join(phaserModule, 'build/custom/phaser-split.js'),
            'pixi': path.join(phaserModule, 'build/custom/pixi.js'),
            'p2': path.join(phaserModule, 'build/custom/p2.js'),
            'b3': 'b3core.0.1.0.min.js'
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
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ],
                include: path.resolve(__dirname, 'src'),
            }
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundled.js'/* filename= */ }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: 'vendor'
        }),
        new webpack.optimize.UglifyJsPlugin({
            drop_console: false,
            minimize: true,
            output: {
                comments: false
            }
        })
    ],
    watch: false
};
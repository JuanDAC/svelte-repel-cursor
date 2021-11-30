const { resolve } = require('path');

const extensions = ['.js' ];
const target = ['node'];

module.exports = {
    experiments: {
        outputModule: true,
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist'),
        chunkFormat: 'module',
        libraryTarget: 'module',
    },
    resolve: {
        extensions,
    },
    target,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        comments: false,
                        minified: true,
                        presets: ["@babel/env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    useESModules: true,
                                }
                            ]
                        ],
                    }
                }
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        /*
        new DefinePlugin({
            STYLE_DECLARATIONS: JSON.stringify(getStyleDeclaration()),
        }),
        new WebpackModules(),
        */
    ]
};

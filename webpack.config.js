module.exports = {
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/react'],
                }
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            url: false,
                        },
                    }, {
                        loader: 'sass-loader', // compiles Sass to CSS
                    },
                ],
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            url: false,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.json' ],
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
        },
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};

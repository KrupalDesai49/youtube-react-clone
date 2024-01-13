// webpack.config.js
const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.MY_VARIABLE': JSON.stringify(process.env.MY_VARIABLE),
        }),
    ],
};

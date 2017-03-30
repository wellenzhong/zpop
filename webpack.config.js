var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: "./js/webpack-index.js",
    output: {
        path: './build', // 图片和 JS 会打包到这里来
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },

            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, // 用 ! 来连接多个 loader

            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }, // 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL
            {
                test: /\.html$/,
               loader: "raw-loader" 
            } // 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL

        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', 'coffee']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]

}
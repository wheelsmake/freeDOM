const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
module.exports = {
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true/*,
                        drop_debugger: false*/
                    },
                    format: {
                        comments: false
                    },
                    ie8: true,
                    safari10: true,
                    ecma: 5
                },
                parallel: true,
                extractComments: false
            })
        ]
    },
    entry: "./src/freedom.export.ts",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        //filename: "freedom.min.[contenthash:8].js"
        filename: "freedom.min.js"
    },
    resolve: {
        extensions: [
            ".ts",
            ".js"
        ]
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/
        }]
    }
}
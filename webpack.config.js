const path = require("path");
module.exports = {
    mode: "development",
    optimization: {
        minimize: false,
    },
    entry: "./src/freeDOM.ts",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "freeDOM.js"
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
    },
    plugins: []
};
const mix = require("laravel-mix");
const CompressionPlugin = require("compression-webpack-plugin");
mix.options({
    postCss: [require("autoprefixer")],
});

mix.setPublicPath("public");

mix.webpackConfig({
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        hot: true,
    },

    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@": __dirname + "resources",
        },
    },
    output: {
        chunkFilename: "js/chunks/[name].js",
    },
    stats: {
        children: true,
    },
    plugins: [
        new CompressionPlugin({
            algorithm: "gzip",
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
});

mix.js("resources/pos/src/index.js", "public/js/app.js")
    .extract(["react", "icons"])
    .postCss("resources/css/app.css", "public/css/app.css", [])
    .sourceMaps()
    .react();

if (mix.inProduction()) {
    mix.version();
}
mix.copyDirectory("resources/images", "public/images");

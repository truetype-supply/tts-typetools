const path = require("path");
const withTM = require("next-transpile-modules")([
    path.resolve(__dirname, "../../packages"),
]);

module.exports = withTM({
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ["source.unsplash.com", "images.unsplash.com"],
    },
});

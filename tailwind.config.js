//READ THIS FIRST
// https://github.com/tailwindlabs/tailwindcss/issues/2831#issuecomment-731038281 //

module.exports = {
    mode: "jit",
    purge: {
        layers: ["components", "utilities"],
        content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
    },
};

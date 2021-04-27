// APP CONFIG
const APP_NAME = "kalendly";

const isEnvProduction = process.env.NODE_ENV === "production";
const ASSET_PATH = isEnvProduction ? `/apps/${APP_NAME}/` : "/";
// APP CONFIG

const path = require("path");

// DUMP and check the WEBPACK config
const { WebpackConfigDumpPlugin } = require("webpack-config-dump-plugin");

const tailwindcss_plugin = require("tailwindcss");
const autoprefixer_plugin = require("autoprefixer");
// COMMON CONFIG ########################################################

// antd - replace moment with dayjs - https://ant.design/docs/react/replace-moment
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
    style: {
        modules: {
            localIdentName: `${APP_NAME}-[local]-[hash:base64:5]`,
        },
        postcss: {
            plugins: [tailwindcss_plugin, autoprefixer_plugin],
        },
    },
    babel: {
        plugins: [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-transform-react-jsx",
            "@babel/plugin-proposal-class-properties",
            [
                "import",
                {
                    libraryName: "antd",
                    libraryDirectory: "es",
                    style: "css",
                },
                "antd",
            ],
            [
                "import",
                {
                    libraryName: "@ant-design/icons",
                    libraryDirectory: "es/icons",
                    camel2DashComponentName: false,
                },
                "@ant-design/icons",
            ],
            [
                "import",
                {
                    libraryName: "lodash",
                    libraryDirectory: "",
                    camel2DashComponentName: false, // default: true
                },
                "lodash",
            ],
            [
                "@babel/plugin-transform-react-jsx",
                {
                    pragma: "h",
                    pragmaFrag: "Fragment",
                },
                "preact",
            ],
        ],
    },
    webpack: {
        plugins: [
            new WebpackConfigDumpPlugin({
                depth: 8,
                name: "debug.webpack.config.js",
            }),
            new AntdDayjsWebpackPlugin(),
        ],
        configure: {
            entry: {
                main: "./src/index.js",
            },
            output: {
                libraryTarget: "self",
                filename: `[name].${APP_NAME}.js`,
                path: path.resolve(__dirname, "build"),
                crossOriginLoading: "anonymous",
                publicPath: ASSET_PATH,
                devtoolNamespace: `${APP_NAME}`,
                globalObject: "self",
            },
        },
        resolve: {
            alias: {
                react: "preact/compat",
                "react-dom/test-utils": "preact/test-utils",
                "react-dom": "preact/compat",
                // Must be below test-utils
            },
        },
    },
    // craco config override
    plugins: [],
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOADER_SASS_MODULE = exports.LOADER_SASS = void 0;
var path_1 = __importDefault(require("path"));
var Rule_1 = __importDefault(require("./Rule"));
var plugin_mini_css_extract_1 = require("../plugins/plugin-mini-css-extract");
var cwd = process.cwd();
exports.LOADER_SASS = Rule_1.default.of()
    .test(/(?<!\.module)\.(scss|sass)/)
    .include(/\.module\.(sass|scss)$/)
    .use({ loader: 'sass-loader' })
    .use({ loader: 'css-loader', })
    .use({ loader: plugin_mini_css_extract_1.loader })
    .getOptions();
exports.LOADER_SASS_MODULE = Rule_1.default.of()
    .test(/\.module\.(sass|scss)$/)
    .include(path_1.default.resolve(cwd, 'src'))
    .use({ loader: 'sass-loader' })
    .use({
    loader: 'css-loader',
    options: {
        modules: true,
    },
})
    .use({ loader: plugin_mini_css_extract_1.loader })
    .getOptions();

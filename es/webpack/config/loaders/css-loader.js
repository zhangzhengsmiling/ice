"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOADER_CSS = exports.LOADER_CSS_MODULE = void 0;
var path_1 = __importDefault(require("path"));
var plugin_mini_css_extract_1 = require("../plugins/plugin-mini-css-extract");
var cwd = process.cwd();
var Rule_1 = __importDefault(require("./Rule"));
exports.LOADER_CSS_MODULE = Rule_1.default.of()
    .test(/\.module\.css$/)
    .include(path_1.default.resolve(cwd, 'src'))
    .use({
    loader: 'css-loader',
    options: {
        module: true,
    },
})
    .use({ loader: plugin_mini_css_extract_1.loader })
    .getOptions();
exports.LOADER_CSS = Rule_1.default.of()
    .test(/(?<!\.module)\.css/)
    .include(path_1.default.resolve(cwd, 'src'))
    .use({ loader: 'css-loader' })
    .use({ loader: plugin_mini_css_extract_1.loader })
    .getOptions();

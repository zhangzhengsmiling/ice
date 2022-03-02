"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOADER_CSS_MODULE = exports.LOADER_CSS = void 0;
var path_1 = __importDefault(require("path"));
var plugin_mini_css_extract_1 = require("../plugins/plugin-mini-css-extract");
var cwd = process.cwd();
exports.LOADER_CSS = {
    test: /(?<!\.module)\.css$/,
    include: path_1.default.resolve(cwd, 'src'),
    use: [
        { loader: plugin_mini_css_extract_1.loader },
        {
            loader: 'css-loader',
        },
    ],
};
exports.LOADER_CSS_MODULE = {
    test: /\.module\.css$/,
    include: path_1.default.resolve(cwd, 'src'),
    use: [
        { loader: plugin_mini_css_extract_1.loader },
        {
            loader: 'css-loader',
            options: {
                modules: true,
            },
        },
    ],
};

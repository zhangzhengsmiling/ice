"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOADER_LESS_MODULE = exports.LOADER_LESS = void 0;
var path_1 = __importDefault(require("path"));
var plugin_mini_css_extract_1 = require("../plugins/plugin-mini-css-extract");
var cwd = process.cwd();
exports.LOADER_LESS = {
    test: /(?<!\.module)\.less/,
    include: path_1.default.resolve(cwd, 'src'),
    use: [
        { loader: plugin_mini_css_extract_1.loader },
        {
            loader: 'css-loader',
        },
        { loader: 'less-loader' },
    ],
};
exports.LOADER_LESS_MODULE = {
    test: /\.module\.less$/,
    include: path_1.default.resolve(cwd, 'src'),
    use: [
        { loader: plugin_mini_css_extract_1.loader },
        {
            loader: 'css-loader',
            options: {
                modules: true,
            },
        },
        { loader: 'less-loader' },
    ],
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOADER_LESS_MODULE = exports.LOADER_LESS = void 0;
var path_1 = __importDefault(require("path"));
var plugin_mini_css_extract_1 = require("../plugins/plugin-mini-css-extract");
var Rule_1 = __importDefault(require("./Rule"));
var cwd = process.cwd();
exports.LOADER_LESS = Rule_1.default.of()
    .test(/(?<!\.module)\.less/)
    .include(path_1.default.resolve(cwd, 'src'))
    .use({ loader: 'less-loader' })
    .use({ loader: 'css-loader' })
    .use({ loader: plugin_mini_css_extract_1.loader });
exports.LOADER_LESS_MODULE = Rule_1.default.of()
    .test(/\.module\.less$/)
    .include(path_1.default.resolve(cwd, 'src'))
    .use({ loader: 'less-loader' })
    .use({
    loader: 'css-loader',
    options: {
        modules: true,
    },
})
    .use({ loader: plugin_mini_css_extract_1.loader });

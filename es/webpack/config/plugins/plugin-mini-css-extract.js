"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniCssExtractPlugin = exports.loader = void 0;
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
exports.MiniCssExtractPlugin = mini_css_extract_plugin_1.default;
var loader = mini_css_extract_plugin_1.default.loader;
exports.loader = loader;

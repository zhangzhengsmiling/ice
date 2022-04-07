"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOADER_JS = void 0;
var path_1 = __importDefault(require("path"));
var Rule_1 = __importDefault(require("./Rule"));
var cwd = process.cwd();
exports.LOADER_JS = Rule_1.default.of()
    .test(/\.(js|jsx)$/)
    .include(path_1.default.resolve(cwd, 'src'))
    .use({
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
    }
});

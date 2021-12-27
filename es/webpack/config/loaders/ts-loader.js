"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var cwd = process.cwd();
var loader = {
    test: /\.(ts|tsx)$/,
    include: path_1.default.resolve(cwd, 'src'),
    use: [
        {
            loader: 'cache-loader',
        },
        // {
        //   loader: 'esbuild-loader',
        //   options: {
        //     loader: 'tsx',
        //     target: 'es2015',
        //   },
        // },
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            }
        }
    ],
};
exports.default = loader;

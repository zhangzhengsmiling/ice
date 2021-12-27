"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: ['file-loader'],
};
exports.default = loader;

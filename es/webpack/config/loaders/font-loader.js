"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loader = {
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    use: ['url-loader?limit=100000'],
};
exports.default = loader;

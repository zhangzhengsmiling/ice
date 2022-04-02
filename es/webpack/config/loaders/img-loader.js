"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOADER_IMG = void 0;
var Rule_1 = __importDefault(require("./Rule"));
exports.LOADER_IMG = Rule_1.default.of()
    .test(/\.(png|jpe?g|gif)$/i)
    .use('file-loader')
    .getOptions();

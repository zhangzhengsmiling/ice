"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOADER_FONT = void 0;
var Rule_1 = __importDefault(require("./Rule"));
exports.LOADER_FONT = Rule_1.default.of()
    .test(/\.(woff|woff2|eot|ttf|svg)$/)
    .use('url-loader?limit=100000');

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapServerityString = void 0;
var chalk_1 = __importDefault(require("chalk"));
var mapServerityString = function (serverity) {
    switch (serverity) {
        case 1:
            return chalk_1.default.yellow('warning');
        case 2:
            return chalk_1.default.red('error');
        default:
            return '';
    }
};
exports.mapServerityString = mapServerityString;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSeverityString = void 0;
var chalk_1 = __importDefault(require("chalk"));
var mapSeverityString = function (severity) {
    switch (severity) {
        case 1:
            return chalk_1.default.yellow('warning');
        case 2:
            return chalk_1.default.red('error');
        default:
            return '';
    }
};
exports.mapSeverityString = mapSeverityString;

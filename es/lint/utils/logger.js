"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = exports.padEnd = exports.padStart = exports.space = void 0;
var space = function (num) {
    return new Array(num).fill(' ').join('');
};
exports.space = space;
var padStart = function (length, pattern) {
    return function (str) {
        return str.padStart(length, pattern);
    };
};
exports.padStart = padStart;
var padEnd = function (length, pattern) {
    return function (str) {
        return str.padEnd(length, pattern);
    };
};
exports.padEnd = padEnd;
var toString = function (target) {
    return target.toString();
};
exports.toString = toString;

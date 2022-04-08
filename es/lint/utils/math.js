"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = void 0;
var max = function (numbers) {
    var _max = -Infinity;
    numbers.forEach(function (num) {
        _max = Math.max(num, _max);
    });
    return _max;
};
exports.max = max;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = void 0;
var curry = function (fn) {
    var curryArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        curryArgs[_i - 1] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fn(curryArgs, args);
    };
};
exports.curry = curry;

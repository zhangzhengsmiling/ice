"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = void 0;
var compose = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (trigger) {
        return fns.reduceRight(function (temp, fn) {
            if (typeof fn === 'function')
                return fn(temp);
            else
                return temp;
        }, trigger);
    };
};
exports.compose = compose;

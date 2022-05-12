"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonFormatter = function (space) {
    return function (object) {
        return JSON.stringify(object, null, space);
    };
};
exports.default = jsonFormatter;

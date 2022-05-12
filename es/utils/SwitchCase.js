"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchCase = void 0;
var SwitchCase = /** @class */ (function () {
    function SwitchCase(map) {
        this._map = map;
    }
    SwitchCase.of = function () {
        return new SwitchCase(new Map());
    };
    SwitchCase.prototype.case = function (condition, result) {
        var _map = new Map(this._map);
        _map.set(condition, result);
        return new SwitchCase(_map);
    };
    SwitchCase.prototype.switch = function (condition) {
        return this._map.get(condition);
    };
    return SwitchCase;
}());
exports.SwitchCase = SwitchCase;

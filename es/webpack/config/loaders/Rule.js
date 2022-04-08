"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rule = /** @class */ (function () {
    function Rule() {
        this._options = {};
    }
    Rule.of = function () {
        return new Rule();
    };
    Rule.prototype.getOptions = function () {
        return this._options;
    };
    Rule.prototype.test = function (regexp) {
        this._options.test = regexp;
        return this;
    };
    Rule.prototype.enforce = function (type) {
        this._options.enforce = type;
        return this;
    };
    Rule.prototype.include = function (path) {
        if (!this._options.include)
            this._options.include = [];
        this._options.include.push(path);
        return this;
    };
    Rule.prototype.exclude = function (path) {
        if (!this._options.exclude)
            this._options.exclude = [];
        this._options.exclude.push(path);
        return this;
    };
    // eslint-disable-next-line
    Rule.prototype.use = function (loader) {
        if (!this._options.use)
            this._options.use = [];
        this._options.use.unshift(loader);
        return this;
    };
    Rule.prototype.issuer = function (condition) {
        if (!this._options.issuer)
            this._options.issuer = [];
        this._options.issuer.push(condition);
        return this;
    };
    Rule.prototype.layer = function (layer) {
        this._options.layer = layer;
    };
    Rule.prototype.issuerLayer = function (condition) {
        if (!this._options.issuerLayer)
            this._options.issuerLayer = [];
        this._options.issuerLayer.push(condition);
        return this;
    };
    Rule.prototype.mimetype = function (mimetype) {
        this._options.mimetype = mimetype;
    };
    return Rule;
}());
exports.default = Rule;

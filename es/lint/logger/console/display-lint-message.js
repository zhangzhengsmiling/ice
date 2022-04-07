"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayLintMessage = void 0;
var chalk_1 = __importDefault(require("chalk"));
var utils_1 = require("../../utils");
var utils_2 = require("../../../utils");
var display_suggestions_1 = require("./display-suggestions");
var map_severity_string_1 = require("./map-severity-string");
var max = utils_1.math.max;
var padEnd = utils_1.logger.padEnd, padStart = utils_1.logger.padStart, space = utils_1.logger.space, toString = utils_1.logger.toString;
var displayLintMessage = function (options) { return function (lintResult) {
    var _a = options.showSuggestion, showSuggestion = _a === void 0 ? false : _a;
    var maxCol = max(lintResult.messages.map(function (msg) { return msg.column; }));
    var maxLine = max(lintResult.messages.map(function (msg) { return msg.line; }));
    var displayRow = (0, utils_2.compose)(chalk_1.default.gray, padStart(maxLine.toString().length, ' '), toString);
    var displayCol = (0, utils_2.compose)(chalk_1.default.gray, padEnd(maxCol.toString().length, ' '), toString);
    var displaySeverity = (0, utils_2.compose)(padEnd(17, space(1)), map_severity_string_1.mapSeverityString);
    if (lintResult.messages.length === 0)
        return;
    console.log(chalk_1.default.underline(lintResult.filePath));
    lintResult.messages.forEach(function (msg) {
        if (msg.line && msg.column) {
            var message = new Array().concat(space(2))
                .concat(displayRow(msg.line))
                .concat(chalk_1.default.gray(':'))
                .concat(displayCol(msg.column))
                .concat(space(3))
                .concat(displaySeverity(msg.severity))
                .concat(space(3))
                .concat(padEnd(28, space(1))(chalk_1.default.gray(msg.messageId)))
                .concat(chalk_1.default.gray(msg.message))
                .join('');
            console.log(message);
        }
        if (showSuggestion && msg.suggestions) {
            (0, display_suggestions_1.displaySuggestions)(msg);
        }
    });
    console.log('\n');
}; };
exports.displayLintMessage = displayLintMessage;

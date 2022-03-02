"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumEnvironment = void 0;
var css_loader_1 = require("./loaders/css-loader");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var js_loader_1 = __importDefault(require("./loaders/js-loader"));
var ts_loader_1 = __importDefault(require("./loaders/ts-loader"));
var less_loader_1 = require("./loaders/less-loader");
var sass_loader_1 = require("./loaders/sass-loader");
var img_loader_1 = __importDefault(require("./loaders/img-loader"));
var font_loader_1 = __importDefault(require("./loaders/font-loader"));
var plugin_mini_css_extract_1 = require("./plugins/plugin-mini-css-extract");
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var css_minimizer_webpack_plugin_1 = __importDefault(require("css-minimizer-webpack-plugin"));
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var cwd = process.cwd();
var EnumEnvironment;
(function (EnumEnvironment) {
    EnumEnvironment["PRODUCTION"] = "production";
    EnumEnvironment["DEVELOPMENT"] = "development";
})(EnumEnvironment = exports.EnumEnvironment || (exports.EnumEnvironment = {}));
var mergeDevServerConfig = function (devServerConfig) {
    if (devServerConfig === void 0) { devServerConfig = {}; }
    var DEFAULT_HOST = '127.0.0.1';
    var DEFAULT_PORT = 8000;
    return __assign({ host: DEFAULT_HOST, port: DEFAULT_PORT }, devServerConfig);
};
var mergeEntryConfig = function (entryConfig) {
    var DEFAULT_ENTRY_CONFIG = {
        app: path_1.default.resolve(cwd, './src/index.tsx'),
    };
    return entryConfig || DEFAULT_ENTRY_CONFIG;
};
var mergeOutputConfig = function (env) { return function (outputConfig) {
    var DEFAULT_OUTPUT_CONFIG = {
        path: path_1.default.resolve(cwd, './build'),
        filename: getBundledFilename(env),
    };
    return outputConfig || DEFAULT_OUTPUT_CONFIG;
}; };
var getBundledFilename = function (env) {
    switch (env) {
        case EnumEnvironment.DEVELOPMENT:
            return '[name].bundle.js';
        case EnumEnvironment.PRODUCTION:
            return '[name].bundle.[chunkhash:8].js';
    }
};
var getConfigFilePath = function (env) {
    switch (env) {
        case EnumEnvironment.DEVELOPMENT:
            return '/config/config.dev.js';
        case EnumEnvironment.PRODUCTION:
            return '/config/config.prod.js';
    }
};
var getCssExtractFileName = function (env) {
    switch (env) {
        case EnumEnvironment.DEVELOPMENT:
            return '[name].css';
        case EnumEnvironment.PRODUCTION:
            return '[name].[chunkhash:8].css';
    }
};
var addCopyConfig = function (configs, copyConfig) {
    if (!fs_1.default.existsSync(path_1.default.resolve(copyConfig.from)))
        return;
    if (fs_1.default.readdirSync(copyConfig.from).length <= 0)
        return;
    configs.push(copyConfig);
};
var getConfig = function (ENV) { return __awaiter(void 0, void 0, void 0, function () {
    var decratorKeyForList, DOC_TITLE, COPY_CONFIG, CONFIG_FILE_PATH, plugins, config, _a, addKey, removeKey, customConfig, _config;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                decratorKeyForList = function (key) {
                    return {
                        addKey: function (list) {
                            list.forEach(function (item, index) {
                                item[key] = index;
                            });
                        },
                        removeKey: function (list) {
                            list.forEach(function (item) {
                                delete item[key];
                            });
                        },
                    };
                };
                DOC_TITLE = 'title';
                COPY_CONFIG = [];
                addCopyConfig(COPY_CONFIG, {
                    from: path_1.default.resolve(cwd, 'public/imgs'),
                    to: path_1.default.resolve(cwd, 'build/imgs'),
                });
                addCopyConfig(COPY_CONFIG, {
                    from: path_1.default.resolve(cwd, 'public/config'),
                    to: path_1.default.resolve(cwd, 'build/config'),
                });
                CONFIG_FILE_PATH = getConfigFilePath(ENV);
                plugins = [
                    new clean_webpack_plugin_1.CleanWebpackPlugin(),
                    new html_webpack_plugin_1.default({
                        title: DOC_TITLE,
                        configPath: CONFIG_FILE_PATH,
                        template: path_1.default.resolve(cwd, './public/index.html'),
                        publicPath: '/',
                        filename: 'index.html',
                    }),
                    new plugin_mini_css_extract_1.MiniCssExtractPlugin({
                        filename: getCssExtractFileName(ENV),
                    }),
                ];
                if (COPY_CONFIG.length > 0) {
                    plugins.push(new copy_webpack_plugin_1.default({
                        patterns: COPY_CONFIG,
                    }));
                }
                config = {
                    entry: mergeEntryConfig(),
                    output: mergeOutputConfig(ENV)(),
                    plugins: plugins,
                    resolve: {
                        // ！important 动态配置，不必要的后缀配置不要加，出现频率高的后缀往前提
                        extensions: ['.ts', '.tsx', '.js', 'jsx', '.less', '.json', '.scss', '.sass'],
                        alias: {
                            '@': path_1.default.resolve(cwd, './src'),
                        },
                    },
                    module: {
                        rules: [
                            js_loader_1.default,
                            ts_loader_1.default,
                            less_loader_1.LOADER_LESS_MODULE,
                            less_loader_1.LOADER_LESS,
                            sass_loader_1.LOADER_SASS,
                            sass_loader_1.LOADER_SASS_MODULE,
                            img_loader_1.default,
                            font_loader_1.default,
                            css_loader_1.LOADER_CSS,
                            css_loader_1.LOADER_CSS_MODULE,
                        ],
                    },
                    stats: 'minimal',
                    optimization: {
                        minimizer: [new terser_webpack_plugin_1.default(), new css_minimizer_webpack_plugin_1.default()],
                    },
                };
                if (ENV === EnumEnvironment.DEVELOPMENT) {
                    ;
                    config.devServer = mergeDevServerConfig({
                        client: {
                            overlay: {
                                errors: true,
                                warnings: false,
                            },
                            progress: true,
                        },
                    });
                }
                _a = decratorKeyForList('_key'), addKey = _a.addKey, removeKey = _a.removeKey;
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(path_1.default.resolve(process.cwd(), 'ice.config.js'))); }).then(function (module) { return module.default; })
                    // merge config
                ];
            case 1:
                customConfig = _d.sent();
                _config = null;
                if (typeof customConfig === 'object') {
                    _config = (0, webpack_merge_1.default)({}, config, customConfig);
                    return [2 /*return*/, _config];
                }
                else if (typeof customConfig === 'function') {
                    addKey((_b = config.module) === null || _b === void 0 ? void 0 : _b.rules);
                    _config = customConfig(config, { env: process.env });
                    removeKey((_c = config.module) === null || _c === void 0 ? void 0 : _c.rules);
                    return [2 /*return*/, _config];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.default = getConfig;

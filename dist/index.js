"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStorageReducer = exports.useStorageState = void 0;
var state_1 = require("./state");
Object.defineProperty(exports, "useStorageState", { enumerable: true, get: function () { return __importDefault(state_1).default; } });
var reducer_1 = require("./reducer");
Object.defineProperty(exports, "useStorageReducer", { enumerable: true, get: function () { return __importDefault(reducer_1).default; } });
//# sourceMappingURL=index.js.map
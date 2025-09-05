"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var common_1 = require("./common");
function useStorageState(storage, key, defaultState) {
    if (defaultState === void 0) { defaultState = null; }
    var _a = (0, react_1.useState)((0, common_1.useInitialState)(storage, key, defaultState)), state = _a[0], setState = _a[1];
    (0, common_1.useStorageListener)(storage, key, defaultState, setState);
    var writeError = (0, common_1.useStorageWriter)(storage, key, state);
    return [state, setState, writeError];
}
exports.default = useStorageState;
//# sourceMappingURL=state.js.map
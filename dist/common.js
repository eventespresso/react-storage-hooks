"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStorageListener = exports.useStorageWriter = exports.useInitialState = void 0;
var react_1 = require("react");
function fromStorage(value) {
    return value !== null ? JSON.parse(value) : null;
}
function readItem(storage, key) {
    try {
        var storedValue = storage.getItem(key);
        return fromStorage(storedValue);
    }
    catch (e) {
        return null;
    }
}
function toStorage(value) {
    return JSON.stringify(value);
}
function writeItem(storage, key, value) {
    try {
        if (value !== null) {
            storage.setItem(key, toStorage(value));
        }
        else {
            storage.removeItem(key);
        }
        return Promise.resolve();
    }
    catch (error) {
        return Promise.reject(error);
    }
}
function useInitialState(storage, key, defaultState) {
    var defaultStateRef = (0, react_1.useRef)(defaultState);
    return (0, react_1.useMemo)(function () { var _a; return (_a = readItem(storage, key)) !== null && _a !== void 0 ? _a : defaultStateRef.current; }, [key, storage]);
}
exports.useInitialState = useInitialState;
function useStorageWriter(storage, key, state) {
    var _a = (0, react_1.useState)(undefined), writeError = _a[0], setWriteError = _a[1];
    (0, react_1.useEffect)(function () {
        writeItem(storage, key, state).catch(function (error) {
            if (!error || !error.message || error.message !== (writeError === null || writeError === void 0 ? void 0 : writeError.message)) {
                setWriteError(error);
            }
        });
        if (writeError) {
            return function () {
                setWriteError(undefined);
            };
        }
    }, [state, key, writeError, storage]);
    return writeError;
}
exports.useStorageWriter = useStorageWriter;
function useStorageListener(storage, key, defaultState, onChange) {
    var defaultStateRef = (0, react_1.useRef)(defaultState);
    var onChangeRef = (0, react_1.useRef)(onChange);
    var firstRun = (0, react_1.useRef)(true);
    (0, react_1.useEffect)(function () {
        var _a;
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }
        onChangeRef.current((_a = readItem(storage, key)) !== null && _a !== void 0 ? _a : defaultStateRef.current);
    }, [key, storage]);
    (0, react_1.useEffect)(function () {
        function onStorageChange(event) {
            var _a;
            if (event.key === key) {
                onChangeRef.current((_a = fromStorage(event.newValue)) !== null && _a !== void 0 ? _a : defaultStateRef.current);
            }
        }
        if (typeof window !== 'undefined' &&
            typeof window.addEventListener !== 'undefined') {
            window.addEventListener('storage', onStorageChange);
            return function () {
                window.removeEventListener('storage', onStorageChange);
            };
        }
    }, [key]);
}
exports.useStorageListener = useStorageListener;
//# sourceMappingURL=common.js.map
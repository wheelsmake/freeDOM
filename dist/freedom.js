/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/freeDOM-core.ts":
/*!*****************************!*\
  !*** ./src/freeDOM-core.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FreeDOMCore)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FreeDOMCore_rootNode, _FreeDOMCore_id, _FreeDOMCore_key, _FreeDOMCore_alerts;

class FreeDOMCore {
    constructor(rootNode, id, key) {
        _FreeDOMCore_rootNode.set(this, void 0);
        _FreeDOMCore_id.set(this, void 0);
        _FreeDOMCore_key.set(this, void 0);
        _FreeDOMCore_alerts.set(this, [
            "DO NOT CALL ME FROM OUTSIDE THE FreeDOM, PLUS YOU CANNOT DO ANYTHING WITHOUT SECRET KEY."
        ]);
        __classPrivateFieldSet(this, _FreeDOMCore_rootNode, rootNode, "f");
        __classPrivateFieldSet(this, _FreeDOMCore_id, id, "f");
        __classPrivateFieldSet(this, _FreeDOMCore_key, key, "f");
    }
    n() {
    }
    h() { return this.n(); }
    sync() {
    }
    rsync() {
    }
    d() {
    }
    getID() { return __classPrivateFieldGet(this, _FreeDOMCore_id, "f"); }
    getRootNode() { return __classPrivateFieldGet(this, _FreeDOMCore_rootNode, "f"); }
    __setRootNodeWithKey__(key, rootNode) {
        if (key === __classPrivateFieldGet(this, _FreeDOMCore_key, "f")) {
            __classPrivateFieldSet(this, _FreeDOMCore_rootNode, rootNode, "f");
            return __classPrivateFieldGet(this, _FreeDOMCore_rootNode, "f");
        }
        else
            _utils__WEBPACK_IMPORTED_MODULE_0__.EE(__classPrivateFieldGet(this, _FreeDOMCore_alerts, "f")[0]);
    }
    __setIDWithKey__(key, id) {
        if (key === __classPrivateFieldGet(this, _FreeDOMCore_key, "f")) {
            __classPrivateFieldSet(this, _FreeDOMCore_id, id, "f");
            return __classPrivateFieldGet(this, _FreeDOMCore_id, "f");
        }
        else
            _utils__WEBPACK_IMPORTED_MODULE_0__.EE(__classPrivateFieldGet(this, _FreeDOMCore_alerts, "f")[0]);
    }
}
_FreeDOMCore_rootNode = new WeakMap(), _FreeDOMCore_id = new WeakMap(), _FreeDOMCore_key = new WeakMap(), _FreeDOMCore_alerts = new WeakMap();


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ E),
/* harmony export */   "EE": () => (/* binding */ EE),
/* harmony export */   "checkNode": () => (/* binding */ checkNode),
/* harmony export */   "constantize": () => (/* binding */ constantize),
/* harmony export */   "e": () => (/* binding */ e),
/* harmony export */   "isDescendant": () => (/* binding */ isDescendant),
/* harmony export */   "isInDocument": () => (/* binding */ isInDocument),
/* harmony export */   "nouse": () => (/* binding */ nouse),
/* harmony export */   "precisePop": () => (/* binding */ precisePop),
/* harmony export */   "randoma2Z": () => (/* binding */ randoma2Z),
/* harmony export */   "randoma2Z029": () => (/* binding */ randoma2Z029),
/* harmony export */   "reduceToElement": () => (/* binding */ reduceToElement)
/* harmony export */ });
function checkNode(node) {
    if (node instanceof Text)
        return "Text";
    else if (node instanceof HTMLElement)
        return "HTMLElement";
    else if (node instanceof SVGElement)
        return "SVGElement";
    else
        return false;
}
function reduceToElement(input) {
    if (typeof input == "string")
        return e(input);
    else
        return input;
}
function isDescendant(element, target) {
    while (element.tagName != "HTML") {
        element = element.parentNode;
        if (element === target)
            return true;
    }
    return false;
}
function randoma2Z(length) {
    var s = "";
    for (let i = 0; i < length; i++) {
        let r = Math.floor(Math.random() * 52);
        if (r > 25)
            s += String.fromCharCode(r + 71);
        else
            s += String.fromCharCode(r + 65);
    }
    return s;
}
function randoma2Z029(length) {
    var s = "";
    for (let i = 0; i < length; i++) {
        let r = Math.floor(Math.random() * 36);
        if (r < 10)
            s += r;
        else
            s += String.fromCharCode(r + 87);
    }
    return s;
}
function e(s, scope) {
    if (scope === undefined || !(scope instanceof Element))
        scope = document;
    let a = scope.querySelectorAll(s);
    if (!a.length)
        return [];
    if (a.length == 1 && s.match(/^.*#[^\s]*$/))
        return a[0];
    else
        return Array.from(a);
}
function isInDocument(element) {
    return isDescendant(element, e("html")[0]);
}
function precisePop(ele, array) {
    if (array.indexOf(ele) === -1)
        return null;
    return array.splice(array.indexOf(ele), 1);
}
function constantize(obj) {
    Object.freeze(obj);
    for (let i = 0; i < Object.keys(obj).length; i++)
        if (typeof obj[Object.keys(obj)[i]] == "object")
            constantize(obj[Object.keys(obj)[i]]);
}
function E(argument, type, value) {
    if (argument === undefined)
        throw new Error("An error occured.");
    else
        throw new Error(`Argument '${argument}' ${type ? `should be a(an) ${type}` : "is invalid"}${value ? `, got ${value}` : ""}.`);
}
function EE(message) { throw new Error(message); }
function nouse() {
    return 7;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/freeDOM.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _freeDOM_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./freeDOM-core */ "./src/freeDOM-core.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FreeDOM_instances, _FreeDOM_keys;


console.warn("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
class FreeDOM {
    constructor() {
        _FreeDOM_instances.set(this, []);
        _FreeDOM_keys.set(this, []);
        console.log("creating new FreeDOM instance.");
    }
    id(id) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID() === id)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i];
        return null;
    }
    rootNode(rootNode) {
        rootNode = _utils__WEBPACK_IMPORTED_MODULE_1__.reduceToElement(rootNode);
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode() === rootNode)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i];
        return null;
    }
    new(args) {
        args.rootNode = _utils__WEBPACK_IMPORTED_MODULE_1__.reduceToElement(args.rootNode);
        var c = _utils__WEBPACK_IMPORTED_MODULE_1__.checkNode(args.rootNode);
        if (c != "HTMLElement" && c != "SVGElement")
            _utils__WEBPACK_IMPORTED_MODULE_1__.E("rootNode", "HTMLElement");
        if (!_utils__WEBPACK_IMPORTED_MODULE_1__.isInDocument(args.rootNode)) {
            console.warn(args.rootNode, " is not in document.");
            return false;
        }
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (_utils__WEBPACK_IMPORTED_MODULE_1__.isDescendant(args.rootNode, __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode()) || args.rootNode === __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode()) {
                console.warn(args.rootNode, " is already a descendant of a rootNode of an exist scope, thus freeDOM won't add it.");
                return false;
            }
        const key = _utils__WEBPACK_IMPORTED_MODULE_1__.randoma2Z029(10);
        __classPrivateFieldGet(this, _FreeDOM_instances, "f").push(new _freeDOM_core__WEBPACK_IMPORTED_MODULE_0__["default"](args.rootNode, args.id, key));
        __classPrivateFieldGet(this, _FreeDOM_keys, "f").push(key);
        return true;
    }
    existsID(id) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID() === id)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode();
        return null;
    }
    existsNode(rootNode) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode() === rootNode)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID();
        return null;
    }
    updateByID(args) {
        args.rootNode = _utils__WEBPACK_IMPORTED_MODULE_1__.reduceToElement(args.rootNode);
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID() === args.id)
                __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].__setRootNodeWithKey__(__classPrivateFieldGet(this, _FreeDOM_keys, "f")[i], args.rootNode);
        return null;
    }
    updateByNode(args) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode() === args.rootNode)
                __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].__setIDWithKey__(__classPrivateFieldGet(this, _FreeDOM_keys, "f")[i], args.id);
        return null;
    }
    delete(arg) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID() === arg || __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode() === arg) {
                _utils__WEBPACK_IMPORTED_MODULE_1__.precisePop(__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i], __classPrivateFieldGet(this, _FreeDOM_instances, "f"));
                return {
                    id: __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID(),
                    rootNode: __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode()
                };
            }
        return null;
    }
    e(s, scope) { return _utils__WEBPACK_IMPORTED_MODULE_1__.e(s, scope); }
}
_FreeDOM_instances = new WeakMap(), _FreeDOM_keys = new WeakMap();
_utils__WEBPACK_IMPORTED_MODULE_1__.constantize(FreeDOM);
window.FreeDOM = FreeDOM;

})();

/******/ })()
;
//# sourceMappingURL=freeDOM.js.map
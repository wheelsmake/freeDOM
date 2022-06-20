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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
var _parent, _messages, _numeralID, _rootNode, _id;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {
    constructor(parent, messages, numeralID, rootNode, id) {
        _parent.set(this, void 0);
        _messages.set(this, void 0);
        _numeralID.set(this, void 0);
        _rootNode.set(this, void 0);
        _id.set(this, void 0);
        __classPrivateFieldSet(this, _parent, parent, "f");
        __classPrivateFieldSet(this, _messages, messages, "f");
        __classPrivateFieldSet(this, _numeralID, numeralID, "f");
        __classPrivateFieldSet(this, _rootNode, rootNode, "f");
        __classPrivateFieldSet(this, _id, id, "f");
        __classPrivateFieldGet(this, _messages, "f")[__classPrivateFieldGet(this, _numeralID, "f")] = "ok";
    }
});
_parent = new WeakMap(), _messages = new WeakMap(), _numeralID = new WeakMap(), _rootNode = new WeakMap(), _id = new WeakMap();


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {
    return {
        isDescendant(element, target) {
            while (element.tagName != "HTML") {
                element = element.parentNode;
                if (element === target)
                    return true;
            }
            return false;
        },
        e(s, scope) {
            if (scope === undefined || !(scope instanceof HTMLElement))
                scope = document;
            let a = scope.querySelectorAll(s);
            if (!a.length)
                return [];
            if (a.length == 1 && s.match(/^.*#[^\s]*$/))
                return a[0];
            else
                return Array.from(a);
        },
        isInDocument(element) {
            return this.isDescendant(element, this.e("html")[0]);
        },
        precisePop(ele, array) {
            if (array.indexOf(ele) === -1)
                return null;
            return array.splice(array.indexOf(ele), 1);
        },
        constantize(obj) {
            Object.freeze(obj);
            for (let i = 0; i < Object.keys(obj).length; i++)
                if (typeof obj[Object.keys(obj)[i]] == "object")
                    this.constantize(obj[Object.keys(obj)[i]]);
        }
    };
})());


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
var _FreeDOM_instances, _FreeDOM_messages;


console.warn("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
class FreeDOM {
    constructor() {
        _FreeDOM_instances.set(this, []);
        _FreeDOM_messages.set(this, []);
        console.warn("creating new FreeDOM instance.");
    }
    new(args) {
        if (typeof args.rootNode == "string")
            args.rootNode = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].e(args.rootNode);
        if (!_utils__WEBPACK_IMPORTED_MODULE_1__["default"].isInDocument(args.rootNode)) {
            console.warn(`${args.rootNode} is not in document.`);
            return false;
        }
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (_utils__WEBPACK_IMPORTED_MODULE_1__["default"].isDescendant(args.rootNode, __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].rootNode) || args.rootNode === __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].rootNode) {
                console.warn(`${args.rootNode} is already a descendant of a rootNode of an exist scope, thus freeDOM won't add it.`);
                return false;
            }
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (_utils__WEBPACK_IMPORTED_MODULE_1__["default"].isDescendant(__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].rootNode, args.rootNode))
                _utils__WEBPACK_IMPORTED_MODULE_1__["default"].precisePop(__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].rootNode, __classPrivateFieldGet(this, _FreeDOM_instances, "f"));
        __classPrivateFieldGet(this, _FreeDOM_instances, "f").push({
            instance: new _freeDOM_core__WEBPACK_IMPORTED_MODULE_0__["default"](this, __classPrivateFieldGet(this, _FreeDOM_messages, "f"), __classPrivateFieldGet(this, _FreeDOM_instances, "f").length, args.rootNode, args.id),
            rootNode: args.rootNode,
            id: args.id
        });
        console.log(__classPrivateFieldGet(this, _FreeDOM_messages, "f")[__classPrivateFieldGet(this, _FreeDOM_instances, "f").length - 1]);
        return true;
    }
    existsID(id) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].id === id)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].rootNode;
        return null;
    }
    existsNode(rootNode) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].rootNode === rootNode)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].id;
        return null;
    }
    updateByID(args) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].id === args.id) {
            }
        return null;
    }
    updateByNode(args) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++) {
        }
        return null;
    }
    delete(arg) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++) {
        }
        return null;
    }
}
_FreeDOM_instances = new WeakMap(), _FreeDOM_messages = new WeakMap();
_utils__WEBPACK_IMPORTED_MODULE_1__["default"].constantize(FreeDOM);
window.FreeDOM = FreeDOM;

})();

/******/ })()
;
//# sourceMappingURL=freeDOM.js.map
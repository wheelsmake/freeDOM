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
var _FreeDOMCore_parent, _FreeDOMCore_messages, _FreeDOMCore_numeralID, _FreeDOMCore_rootNode, _FreeDOMCore_id, _FreeDOMCore_key, _FreeDOMCore_alerts;

class FreeDOMCore {
    constructor(parent, messages, numeralID, rootNode, id, key) {
        _FreeDOMCore_parent.set(this, void 0);
        _FreeDOMCore_messages.set(this, void 0);
        _FreeDOMCore_numeralID.set(this, void 0);
        _FreeDOMCore_rootNode.set(this, void 0);
        _FreeDOMCore_id.set(this, void 0);
        _FreeDOMCore_key.set(this, void 0);
        _FreeDOMCore_alerts.set(this, [
            "DO NOT CALL ME FROM OUTSIDE THE FreeDOM, PLUS YOU CANNOT DO ANYTHING WITHOUT SECRET KEY."
        ]);
        __classPrivateFieldSet(this, _FreeDOMCore_parent, parent, "f");
        __classPrivateFieldSet(this, _FreeDOMCore_messages, messages, "f");
        __classPrivateFieldSet(this, _FreeDOMCore_numeralID, numeralID, "f");
        __classPrivateFieldSet(this, _FreeDOMCore_rootNode, rootNode, "f");
        __classPrivateFieldSet(this, _FreeDOMCore_id, id, "f");
        __classPrivateFieldSet(this, _FreeDOMCore_key, key, "f");
    }
    render(cb) {
        var alerts = [
            "CANNOT CHANGE THE DOCUMENT OBJECT IN THE PROXY.",
            "DONT USE THIS IN THE PROXY IN ORDER TO PREVENT UNKNOWN BUGS."
        ];
        const p = new Proxy(document, {
            get(document, property, receiver) {
                if (property in document) {
                    const fuck_typescript = document[property];
                    if (fuck_typescript instanceof Function) {
                        return new Proxy(fuck_typescript, {
                            apply(target, thisArg, argArray) {
                                return target.bind(document)(...argArray);
                            }
                        });
                    }
                    else
                        return fuck_typescript;
                }
                else
                    return undefined;
            },
            has(document, property) {
                console.warn(alerts[1]);
                return Reflect.has(document, property);
            },
            isExtensible(document) {
                console.warn(alerts[1]);
                return Reflect.isExtensible(document);
            },
            getPrototypeOf(document) {
                console.warn(alerts[1]);
                return Reflect.getPrototypeOf(document);
            },
            ownKeys(document) {
                console.warn(alerts[1]);
                return Reflect.ownKeys(document);
            },
            setPrototypeOf(document, value) {
                console.warn(alerts[0]);
                return false;
            },
            set(document, property, value, receiver) {
                console.warn(alerts[0]);
                return false;
            },
            defineProperty(document, property, attributes) {
                console.warn(alerts[0]);
                return false;
            },
            deleteProperty(document, property) {
                console.warn(alerts[0]);
                return false;
            },
            preventExtensions(document) {
                console.warn(alerts[0]);
                return false;
            },
            getOwnPropertyDescriptor(document, property) {
                console.warn(alerts[0]);
                return undefined;
            }
        });
        cb(p);
    }
    getID() { return __classPrivateFieldGet(this, _FreeDOMCore_id, "f"); }
    getRootNode() { return __classPrivateFieldGet(this, _FreeDOMCore_rootNode, "f"); }
    __setRootNodeWithKey__(key, rootNode) {
        if (key === __classPrivateFieldGet(this, _FreeDOMCore_key, "f")) {
            __classPrivateFieldSet(this, _FreeDOMCore_rootNode, rootNode, "f");
            return __classPrivateFieldGet(this, _FreeDOMCore_rootNode, "f");
        }
        else
            _utils__WEBPACK_IMPORTED_MODULE_0__["default"].EE(__classPrivateFieldGet(this, _FreeDOMCore_alerts, "f")[0]);
    }
    __setIDWithKey__(key, id) {
        if (key === __classPrivateFieldGet(this, _FreeDOMCore_key, "f")) {
            __classPrivateFieldSet(this, _FreeDOMCore_id, id, "f");
            return __classPrivateFieldGet(this, _FreeDOMCore_id, "f");
        }
        else
            _utils__WEBPACK_IMPORTED_MODULE_0__["default"].EE(__classPrivateFieldGet(this, _FreeDOMCore_alerts, "f")[0]);
    }
}
_FreeDOMCore_parent = new WeakMap(), _FreeDOMCore_messages = new WeakMap(), _FreeDOMCore_numeralID = new WeakMap(), _FreeDOMCore_rootNode = new WeakMap(), _FreeDOMCore_id = new WeakMap(), _FreeDOMCore_key = new WeakMap(), _FreeDOMCore_alerts = new WeakMap();


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
        E(argument, type, value) {
            if (argument === undefined)
                throw new Error("An error occured.");
            else
                throw new Error(`Argument '${argument}' ${type ? `should be a ${type}` : "is invalid"}${value ? `, got ${value}` : ""}.`);
        },
        EE(message) { throw new Error(message); },
        parseIDOrString(input) {
            if (typeof input == "string")
                return this.e(input);
            else
                return input;
        },
        isDescendant(element, target) {
            while (element.tagName != "HTML") {
                element = element.parentNode;
                if (element === target)
                    return true;
            }
            return false;
        },
        randoma2z029(length) {
            var s = "";
            for (let i = 0; i < length; i++) {
                let r = Math.floor(Math.random() * 36);
                if (r < 10)
                    s += r;
                else
                    s += String.fromCharCode(r + 87);
            }
            return s;
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
var _FreeDOM_instances, _FreeDOM_keys, _FreeDOM_messages;


console.warn("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
class FreeDOM {
    constructor() {
        _FreeDOM_instances.set(this, []);
        _FreeDOM_keys.set(this, []);
        _FreeDOM_messages.set(this, []);
        console.warn("creating new FreeDOM instance.");
    }
    id(id) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID() === id)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i];
        return null;
    }
    rootNode(rootNode) {
        rootNode = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].parseIDOrString(rootNode);
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode() === rootNode)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i];
        return null;
    }
    new(args) {
        args.rootNode = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].parseIDOrString(args.rootNode);
        if (!_utils__WEBPACK_IMPORTED_MODULE_1__["default"].isInDocument(args.rootNode)) {
            console.warn(`${args.rootNode} is not in document.`);
            return false;
        }
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (_utils__WEBPACK_IMPORTED_MODULE_1__["default"].isDescendant(args.rootNode, __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode()) || args.rootNode === __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode()) {
                console.warn(`${args.rootNode} is already a descendant of a rootNode of an exist scope, thus freeDOM won't add it.`);
                return false;
            }
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (_utils__WEBPACK_IMPORTED_MODULE_1__["default"].isDescendant(__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode(), args.rootNode))
                _utils__WEBPACK_IMPORTED_MODULE_1__["default"].precisePop(__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode(), __classPrivateFieldGet(this, _FreeDOM_instances, "f"));
        const key = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].randoma2z029(20);
        __classPrivateFieldGet(this, _FreeDOM_instances, "f").push(new _freeDOM_core__WEBPACK_IMPORTED_MODULE_0__["default"](this, __classPrivateFieldGet(this, _FreeDOM_messages, "f"), __classPrivateFieldGet(this, _FreeDOM_instances, "f").length, args.rootNode, args.id, key));
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
        args.rootNode = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].parseIDOrString(args.rootNode);
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
                _utils__WEBPACK_IMPORTED_MODULE_1__["default"].precisePop(__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i], __classPrivateFieldGet(this, _FreeDOM_instances, "f"));
                return {
                    id: __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID(),
                    rootNode: __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode()
                };
            }
        return null;
    }
    e(s, scope) { return _utils__WEBPACK_IMPORTED_MODULE_1__["default"].e(s, scope); }
}
_FreeDOM_instances = new WeakMap(), _FreeDOM_keys = new WeakMap(), _FreeDOM_messages = new WeakMap();
_utils__WEBPACK_IMPORTED_MODULE_1__["default"].constantize(FreeDOM);
window.FreeDOM = FreeDOM;

})();

/******/ })()
;
//# sourceMappingURL=freeDOM.js.map
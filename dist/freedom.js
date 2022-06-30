/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/commons/commons.element.ts":
/*!****************************************!*\
  !*** ./src/commons/commons.element.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ e),
/* harmony export */   "isDescendant": () => (/* binding */ isDescendant),
/* harmony export */   "isInDocument": () => (/* binding */ isInDocument),
/* harmony export */   "removeIndentText": () => (/* binding */ removeIndentText)
/* harmony export */ });
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
function isDescendant(possibleDescendant, possibleParent) {
    while (possibleDescendant.tagName != "HTML") {
        possibleDescendant = possibleDescendant.parentNode;
        if (possibleDescendant === possibleParent)
            return true;
    }
    return false;
}
function isInDocument(element) {
    return isDescendant(element, e("html")[0]);
}
function removeIndentText(textNode) {
    textNode.textContent = textNode.textContent.replace(/\n\s+/g, "");
}


/***/ }),

/***/ "./src/commons/commons.generic.ts":
/*!****************************************!*\
  !*** ./src/commons/commons.generic.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ E),
/* harmony export */   "EE": () => (/* binding */ EE),
/* harmony export */   "constantize": () => (/* binding */ constantize),
/* harmony export */   "precisePop": () => (/* binding */ precisePop),
/* harmony export */   "randoma2Z": () => (/* binding */ randoma2Z),
/* harmony export */   "randoma2z029": () => (/* binding */ randoma2z029)
/* harmony export */ });
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
function randoma2z029(length) {
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
    else {
        console.error(argument, type, value);
        throw new Error(`Argument '${argument}' ${type ? `should be a(an) ${type}` : "is invalid"}${value ? `, got ${value}` : ""}.`);
    }
}
function EE(message) { throw new Error(message); }


/***/ }),

/***/ "./src/commons/commons.misc.ts":
/*!*************************************!*\
  !*** ./src/commons/commons.misc.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkSMArgsnReduce": () => (/* binding */ checkSMArgsnReduce),
/* harmony export */   "reduceToElement": () => (/* binding */ reduceToElement)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/commons/index.ts");

function checkSMArgsnReduce(args) {
    if (typeof args.id != "string")
        _index__WEBPACK_IMPORTED_MODULE_0__.generic.E("id", "string", args.id);
    args.rootNode = reduceToElement(args.rootNode);
}
function reduceToElement(input) {
    if (input instanceof Element)
        return input;
    else if (typeof input == "string") {
        const el = _index__WEBPACK_IMPORTED_MODULE_0__.element.e(input);
        if (el instanceof Node)
            return el;
    }
    else
        _index__WEBPACK_IMPORTED_MODULE_0__.generic.EE(`rootNode string should be a #id selector,but received ${input}.`);
}


/***/ }),

/***/ "./src/commons/commons.vdom.ts":
/*!*************************************!*\
  !*** ./src/commons/commons.vdom.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createVElementFromData": () => (/* binding */ createVElementFromData),
/* harmony export */   "createVTextFromData": () => (/* binding */ createVTextFromData),
/* harmony export */   "extractAttr": () => (/* binding */ extractAttr),
/* harmony export */   "getChildren": () => (/* binding */ getChildren),
/* harmony export */   "parseNode": () => (/* binding */ parseNode),
/* harmony export */   "testNodeType": () => (/* binding */ testNodeType)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/commons/index.ts");
/* harmony import */ var _vElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vElement */ "./src/vElement.ts");
/* harmony import */ var _vText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vText */ "./src/vText.ts");



function testNodeType(node) {
    if (node instanceof Text)
        return "Text";
    else if (node instanceof Element)
        return "Element";
    else
        return false;
}
function createVElementFromData(tagName, attributes, children) {
    return new _vElement__WEBPACK_IMPORTED_MODULE_1__["default"](tagName, attributes, children);
}
function createVElement(element) {
    return new _vElement__WEBPACK_IMPORTED_MODULE_1__["default"](element.tagName.toLocaleLowerCase(), extractAttr(element), getChildren(element), element);
}
function createVTextFromData(textContent) {
    return new _vText__WEBPACK_IMPORTED_MODULE_2__["default"](textContent);
}
function createVText(text) {
    _index__WEBPACK_IMPORTED_MODULE_0__.element.removeIndentText(text);
    return new _vText__WEBPACK_IMPORTED_MODULE_2__["default"](text.textContent, text);
}
function parseNode(node) {
    const test = testNodeType(node);
    if (test == "Text")
        return createVText(node);
    else if (test == "Element")
        return createVElement(node);
    else
        _index__WEBPACK_IMPORTED_MODULE_0__.generic.E("node", "Element | Text", node);
}
function extractAttr(element) {
    const test = testNodeType(element);
    if (test == "Text" || test === false)
        _index__WEBPACK_IMPORTED_MODULE_0__.generic.E("element", "Element", element);
    const attr = element.attributes;
    var result = {};
    for (let i = 0; i < attr.length; i++)
        result[attr[i].name] = attr[i].textContent;
    return result;
}
function getChildren(element) {
    const children = element.childNodes;
    var result = [];
    for (let i = 0; i < children.length; i++) {
        const test = testNodeType(children.item(i));
        if (test == "Element") {
            const child_i = children.item(i);
            result.push(createVElement(child_i));
        }
        else if (test == "Text") {
            const textNode = children.item(i);
            _index__WEBPACK_IMPORTED_MODULE_0__.element.removeIndentText(textNode);
            result.push(createVText(textNode));
        }
        else
            continue;
    }
    return result;
}


/***/ }),

/***/ "./src/commons/index.ts":
/*!******************************!*\
  !*** ./src/commons/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "element": () => (/* reexport module object */ _commons_element__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "generic": () => (/* reexport module object */ _commons_generic__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "misc": () => (/* reexport module object */ _commons_misc__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "vDOM": () => (/* reexport module object */ _commons_vdom__WEBPACK_IMPORTED_MODULE_3__)
/* harmony export */ });
/* harmony import */ var _commons_generic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons.generic */ "./src/commons/commons.generic.ts");
/* harmony import */ var _commons_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commons.element */ "./src/commons/commons.element.ts");
/* harmony import */ var _commons_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commons.misc */ "./src/commons/commons.misc.ts");
/* harmony import */ var _commons_vdom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commons.vdom */ "./src/commons/commons.vdom.ts");










/***/ }),

/***/ "./src/freedom-core.ts":
/*!*****************************!*\
  !*** ./src/freedom-core.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FreeDOMCore)
/* harmony export */ });
/* harmony import */ var _commons_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons/index */ "./src/commons/index.ts");
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
var _FreeDOMCore_rootNode, _FreeDOMCore_id, _FreeDOMCore_nodeTree, _FreeDOMCore_nodeStore, _FreeDOMCore_alerts;

class FreeDOMCore {
    constructor(rootNode, id) {
        _FreeDOMCore_rootNode.set(this, void 0);
        _FreeDOMCore_id.set(this, void 0);
        _FreeDOMCore_nodeTree.set(this, void 0);
        _FreeDOMCore_nodeStore.set(this, {});
        _FreeDOMCore_alerts.set(this, [
            "DO NOT CALL ME FROM OUTSIDE THE FreeDOM, PLUS YOU CANNOT DO ANYTHING WITHOUT SECRET KEY."
        ]);
        __classPrivateFieldSet(this, _FreeDOMCore_rootNode, rootNode, "f");
        __classPrivateFieldSet(this, _FreeDOMCore_id, id, "f");
        __classPrivateFieldSet(this, _FreeDOMCore_nodeTree, _commons_index__WEBPACK_IMPORTED_MODULE_0__.vDOM.parseNode(rootNode), "f");
    }
    m() {
    }
    mount() { }
    r() { }
    render() { }
    um() {
    }
    unmount() { }
    s() {
    }
    sync() { }
    rs() {
    }
    rsync() { }
    getID() { return __classPrivateFieldGet(this, _FreeDOMCore_id, "f"); }
    getRootNode() { return __classPrivateFieldGet(this, _FreeDOMCore_rootNode, "f"); }
    __setRootNode__(rootNode) {
        const oldRootNode = __classPrivateFieldGet(this, _FreeDOMCore_rootNode, "f");
        __classPrivateFieldSet(this, _FreeDOMCore_rootNode, rootNode, "f");
        return oldRootNode;
    }
    __setID__(id) {
        const oldID = __classPrivateFieldGet(this, _FreeDOMCore_id, "f");
        __classPrivateFieldSet(this, _FreeDOMCore_id, id, "f");
        return oldID;
    }
    __getNodeTree__() { return __classPrivateFieldGet(this, _FreeDOMCore_nodeTree, "f"); }
}
_FreeDOMCore_rootNode = new WeakMap(), _FreeDOMCore_id = new WeakMap(), _FreeDOMCore_nodeTree = new WeakMap(), _FreeDOMCore_nodeStore = new WeakMap(), _FreeDOMCore_alerts = new WeakMap();


/***/ }),

/***/ "./src/vElement.ts":
/*!*************************!*\
  !*** ./src/vElement.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ vElement)
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
var _vElement_tagName, _vElement_attributes, _vElement_children, _vElement_instance;
class vElement {
    constructor(tagName, attributes, children, instance) {
        _vElement_tagName.set(this, void 0);
        _vElement_attributes.set(this, void 0);
        _vElement_children.set(this, void 0);
        _vElement_instance.set(this, void 0);
        __classPrivateFieldSet(this, _vElement_tagName, tagName, "f");
        __classPrivateFieldSet(this, _vElement_attributes, attributes, "f");
        __classPrivateFieldSet(this, _vElement_children, children, "f");
        if (instance) {
            __classPrivateFieldSet(this, _vElement_instance, instance, "f");
        }
    }
    getInfo() {
        return {
            tagName: __classPrivateFieldGet(this, _vElement_tagName, "f"),
            attributes: __classPrivateFieldGet(this, _vElement_attributes, "f"),
            children: __classPrivateFieldGet(this, _vElement_children, "f"),
            instance: __classPrivateFieldGet(this, _vElement_instance, "f")
        };
    }
}
_vElement_tagName = new WeakMap(), _vElement_attributes = new WeakMap(), _vElement_children = new WeakMap(), _vElement_instance = new WeakMap();


/***/ }),

/***/ "./src/vText.ts":
/*!**********************!*\
  !*** ./src/vText.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ vText)
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
var _vText_textContent, _vText_instance;
class vText {
    constructor(textContent, instance) {
        _vText_textContent.set(this, void 0);
        _vText_instance.set(this, void 0);
        __classPrivateFieldSet(this, _vText_textContent, textContent, "f");
        if (instance) {
            __classPrivateFieldSet(this, _vText_instance, instance, "f");
        }
    }
    getInfo() {
        return {
            textContent: __classPrivateFieldGet(this, _vText_textContent, "f"),
            instance: __classPrivateFieldGet(this, _vText_instance, "f")
        };
    }
}
_vText_textContent = new WeakMap(), _vText_instance = new WeakMap();


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
  !*** ./src/freedom.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commons_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons/index */ "./src/commons/index.ts");
/* harmony import */ var _freedom_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./freedom-core */ "./src/freedom-core.ts");
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FreeDOM_instances;


console.info("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
class FreeDOM {
    constructor() {
        _FreeDOM_instances.set(this, []);
        console.info("creating new FreeDOM instance.");
    }
    new(args) {
        _commons_index__WEBPACK_IMPORTED_MODULE_0__.misc.checkSMArgsnReduce(args);
        args.rootNode = args.rootNode;
        if (!_commons_index__WEBPACK_IMPORTED_MODULE_0__.element.isInDocument(args.rootNode)) {
            console.warn(args.rootNode, " is not in document.");
            return null;
        }
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++) {
            if (_commons_index__WEBPACK_IMPORTED_MODULE_0__.element.isDescendant(args.rootNode, __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode()) || args.rootNode === __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode()) {
                console.warn(args.rootNode, " is already a descendant of a rootNode of an exist scope, thus freeDOM won't add it.");
                return null;
            }
            else if (args.id === __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID()) {
                console.error(args.id, "is duplicated.");
                return null;
            }
            else if (args.rootNode === __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode()) {
                console.error(args.rootNode, "is duplicated.");
                return null;
            }
        }
        const instance = new _freedom_core__WEBPACK_IMPORTED_MODULE_1__["default"](args.rootNode, args.id);
        __classPrivateFieldGet(this, _FreeDOM_instances, "f").push(instance);
        return instance;
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
        _commons_index__WEBPACK_IMPORTED_MODULE_0__.misc.checkSMArgsnReduce(args);
        args.rootNode = args.rootNode;
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID() === args.id)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].__setRootNode__(args.rootNode);
        return null;
    }
    updateByNode(args) {
        _commons_index__WEBPACK_IMPORTED_MODULE_0__.misc.checkSMArgsnReduce(args);
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode() === args.rootNode)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].__setID__(args.id);
        return null;
    }
    delete(arg) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID() === arg || __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode() === arg) {
                _commons_index__WEBPACK_IMPORTED_MODULE_0__.generic.precisePop(__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i], __classPrivateFieldGet(this, _FreeDOM_instances, "f"));
                return {
                    id: __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID(),
                    rootNode: __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode()
                };
            }
        return null;
    }
    id(id) {
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getID() === id)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i];
        return null;
    }
    rootNode(rootNode) {
        const trueRootNode = _commons_index__WEBPACK_IMPORTED_MODULE_0__.misc.reduceToElement(rootNode);
        for (let i = 0; i < __classPrivateFieldGet(this, _FreeDOM_instances, "f").length; i++)
            if (__classPrivateFieldGet(this, _FreeDOM_instances, "f")[i].getRootNode() === trueRootNode)
                return __classPrivateFieldGet(this, _FreeDOM_instances, "f")[i];
        return null;
    }
    h(tagName, attributes, children) { return _commons_index__WEBPACK_IMPORTED_MODULE_0__.vDOM.createVElementFromData(tagName, attributes, children); }
    createNode(tagName, attributes, children) { return _commons_index__WEBPACK_IMPORTED_MODULE_0__.vDOM.createVElementFromData(tagName, attributes, children); }
    p(node) { return _commons_index__WEBPACK_IMPORTED_MODULE_0__.vDOM.parseNode(node); }
    parseNode(node) { return _commons_index__WEBPACK_IMPORTED_MODULE_0__.vDOM.parseNode(node); }
    b(sda) {
    }
    buildNode() { }
    d() {
    }
    difu() { }
    e(s, scope) { return _commons_index__WEBPACK_IMPORTED_MODULE_0__.element.e(s, scope); }
}
_FreeDOM_instances = new WeakMap();
_commons_index__WEBPACK_IMPORTED_MODULE_0__.generic.constantize(FreeDOM);
window.FreeDOM = FreeDOM;

})();

/******/ })()
;
//# sourceMappingURL=freedom.js.map
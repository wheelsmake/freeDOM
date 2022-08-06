/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/freedom.ts":
/*!************************!*\
  !*** ./src/freedom.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "eventStore": () => (/* binding */ eventStore),
/* harmony export */   "instances": () => (/* binding */ instances)
/* harmony export */ });
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/index */ "../utils/index.ts");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/index */ "./src/utils/index.ts");
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
var _ScopeInstance_instances, _ScopeInstance_rootNode, _ScopeInstance_options, _ScopeInstance_vDOM, _ScopeInstance_observer, _ScopeInstance_searchStore, _ScopeInstance_observerCB;


console.info("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
const instances = [], eventStore = new Map();

const Ep = Element.prototype, Ep_A = Ep;
Ep_A.oddEventListener = Ep.addEventListener;
Ep.addEventListener = new Proxy(Ep_A.oddEventListener, {
    apply(oEL, callerElement, argArray) {
        const [eventName, handler, arg1, arg2] = argArray, record = eventStore.get(callerElement), useCapture = arg1 !== undefined ? typeof arg1 == "boolean" ? arg1 : arg1.capture || false : false;
        var processedHandler;
        if (typeof arg1 == "object" && arg1["once"] === true) {
            processedHandler = new Proxy(handler, {
                apply(target, thisArg, argArray) {
                    const recordValue = eventStore.get(callerElement)[eventName];
                    for (let i = 0; i < recordValue.length; i++) {
                        const thisArg1 = recordValue[i].arg1, thisUseCapture = thisArg1 !== undefined ? typeof thisArg1 == "boolean" ? thisArg1 : thisArg1.capture || false : false;
                        if (recordValue[i].handler === processedHandler && thisUseCapture === useCapture) {
                            _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.precisePop(recordValue[i], recordValue);
                        }
                    }
                    return Reflect.apply(target, thisArg, argArray);
                }
            });
        }
        else
            processedHandler = handler;
        if (record !== undefined) {
            if (record[eventName] === undefined) {
                record[eventName] = [{
                        handler: processedHandler, arg1, arg2
                    }];
                argArray[1] = processedHandler;
            }
            else {
                var isDuplicated = false;
                for (let i = 0; i < record[eventName].length; i++) {
                    const thisArg1 = record[eventName][i].arg1, thisUseCapture = thisArg1 !== undefined ? typeof thisArg1 == "boolean" ? thisArg1 : thisArg1.capture || false : false;
                    if (handler === record[eventName][i].handler && useCapture === thisUseCapture) {
                        isDuplicated = true;
                        break;
                    }
                }
                if (!isDuplicated) {
                    record[eventName].push({
                        handler: processedHandler, arg1, arg2
                    });
                    argArray[1] = processedHandler;
                }
            }
            eventStore.set(callerElement, record);
        }
        else {
            eventStore.set(callerElement, {
                [eventName]: [{
                        handler: processedHandler, arg1, arg2
                    }]
            });
            argArray[1] = processedHandler;
        }
        return Reflect.apply(oEL, callerElement, argArray);
    }
});
Ep_A.oemoveEventListener = Ep.removeEventListener;
Ep.removeEventListener = new Proxy(Ep_A.oemoveEventListener, {
    apply(omEL, callerElement, argArray) {
        const [eventName, handler, arg1] = argArray;
        if (eventStore.has(callerElement)) {
            const record = eventStore.get(callerElement), useCapture = arg1 !== undefined ? typeof arg1 == "boolean" ? arg1 : arg1.capture || false : false;
            if (record[eventName] !== undefined) {
                for (let i = 0; i < record[eventName].length; i++) {
                    const thisArg1 = record[eventName][i].arg1, thisUseCapture = thisArg1 !== undefined ? typeof thisArg1 == "boolean" ? thisArg1 : thisArg1.capture || false : false;
                    if (handler === record[eventName][i].handler && useCapture === thisUseCapture)
                        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.precisePop(record[eventName][i], record[eventName]);
                }
            }
            eventStore.set(callerElement, record);
        }
        return Reflect.apply(omEL, callerElement, argArray);
    }
});
class ScopeInstance {
    constructor(rootNode, options) {
        _ScopeInstance_instances.add(this);
        _ScopeInstance_rootNode.set(this, void 0);
        _ScopeInstance_options.set(this, void 0);
        _ScopeInstance_vDOM.set(this, void 0);
        _ScopeInstance_observer.set(this, void 0);
        _ScopeInstance_searchStore.set(this, [[], [], []]);
        console.info("creating new freeDOM instance with rootNode", rootNode, "and options", options);
        rootNode = _utils_index__WEBPACK_IMPORTED_MODULE_1__.misc.reduceToElement(rootNode);
        __classPrivateFieldSet(this, _ScopeInstance_rootNode, rootNode, "f");
        const tree = _utils_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.parseNode(rootNode);
        if (_utils_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.misc.isVText(tree) || tree === null)
            _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("rootNode", "Elementy", rootNode, "rootNode should be an Element or a #id selector");
        else
            __classPrivateFieldSet(this, _ScopeInstance_vDOM, tree, "f");
        __classPrivateFieldSet(this, _ScopeInstance_options, options, "f");
        __classPrivateFieldSet(this, _ScopeInstance_observer, new MutationObserver(__classPrivateFieldGet(this, _ScopeInstance_instances, "m", _ScopeInstance_observerCB)), "f");
        __classPrivateFieldGet(this, _ScopeInstance_observer, "f").observe(__classPrivateFieldGet(this, _ScopeInstance_rootNode, "f"), {
            childList: true,
            subtree: true,
            characterData: true,
            characterDataOldValue: true,
            attributes: true,
            attributeOldValue: true
        });
        instances.push(this);
    }
    get rootNode() { return __classPrivateFieldGet(this, _ScopeInstance_rootNode, "f"); }
    get options() { return __classPrivateFieldGet(this, _ScopeInstance_options, "f"); }
    get vDOM() { return __classPrivateFieldGet(this, _ScopeInstance_vDOM, "f"); }
    m() {
    }
    mount() {
    }
    u() {
    }
    unmount() {
    }
    s() {
    }
    sync() {
    }
    r() {
    }
    rsync() {
    }
}
_ScopeInstance_rootNode = new WeakMap(), _ScopeInstance_options = new WeakMap(), _ScopeInstance_vDOM = new WeakMap(), _ScopeInstance_observer = new WeakMap(), _ScopeInstance_searchStore = new WeakMap(), _ScopeInstance_instances = new WeakSet(), _ScopeInstance_observerCB = function _ScopeInstance_observerCB(mutations) {
    for (let i = 0; i < mutations.length; i++) {
    }
};
const FreeDOM = {
    new(rootNode, options) {
        return new ScopeInstance(rootNode, options);
    },
    get instances() {
        return [...instances];
    },
    get eventStore() {
        return new Map(eventStore);
    },
    c(tagName, attrs, children) {
        return _utils_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.createVElement(tagName, attrs || null, null, children || null, null);
    },
    createVElement(tagName, attrs, children) {
        return _utils_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.createVElement(tagName, attrs || null, null, children || null, null);
    },
    h(tagName, attrs, children) {
        return _utils_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.createVElement(tagName, attrs || null, null, children || null, null);
    },
    t(text) {
        if (text === null)
            _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("text", "string", text);
        return _utils_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.createVText(text, null);
    },
    createVText(text) {
        if (text === null)
            _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("text", "string", text);
        return _utils_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.createVText(text, null);
    },
    p(node) {
        return _utils_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.parseNode(node);
    },
    parseNode(node) {
        return _utils_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.parseNode(node);
    },
    b(vElement) {
        return _utils_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.buildNode(vElement);
    },
    buildNode(vElement) {
        return _utils_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.buildNode(vElement);
    },
    d() {
    },
    diff() {
    },
    e(s, scope) { return _utils_index__WEBPACK_IMPORTED_MODULE_0__.element.e(s, scope); },
};
_utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.constantize(FreeDOM);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FreeDOM);


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "misc": () => (/* reexport module object */ _misc__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "vDOM": () => (/* reexport module object */ _vdom__WEBPACK_IMPORTED_MODULE_1__)
/* harmony export */ });
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ "./src/utils/misc.ts");
/* harmony import */ var _vdom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vdom */ "./src/utils/vdom.ts");






/***/ }),

/***/ "./src/utils/misc.ts":
/*!***************************!*\
  !*** ./src/utils/misc.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reduceToElement": () => (/* binding */ reduceToElement)
/* harmony export */ });
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index */ "../utils/index.ts");

function reduceToElement(input) {
    if (input instanceof Element)
        return input;
    else if (typeof input == "string") {
        const el = _utils_index__WEBPACK_IMPORTED_MODULE_0__.element.e(input);
        if (el instanceof Node)
            return el;
    }
    else
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("rootNode", "string | Element", input, "rootNode should be a #id selector or an Element");
    return new Element();
}


/***/ }),

/***/ "./src/utils/vdom.build.ts":
/*!*********************************!*\
  !*** ./src/utils/vdom.build.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Attr": () => (/* binding */ Attr),
/* harmony export */   "Children": () => (/* binding */ Children),
/* harmony export */   "Event": () => (/* binding */ Event),
/* harmony export */   "deltaAttr": () => (/* binding */ deltaAttr),
/* harmony export */   "deltaChildren": () => (/* binding */ deltaChildren),
/* harmony export */   "deltaEvent": () => (/* binding */ deltaEvent)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/utils/index.ts");

function Attr(element, data) {
    const attrs = data.attrs;
    for (let i in attrs)
        deltaAttr(element, i, attrs[i]);
}
function Event(element, data) {
}
function Children(element, data) {
    if (data.children === null)
        return;
    else {
        const children = data.children;
        for (let i = 0; i < children.length; i++)
            deltaChildren(element, children[i]);
    }
}
function deltaAttr(element, key, value) {
    element.setAttribute(key, value);
}
function deltaEvent(element) {
}
function deltaChildren(element, childrenVDOM) {
    element.appendChild(_index__WEBPACK_IMPORTED_MODULE_0__.vDOM.buildNode(childrenVDOM));
}


/***/ }),

/***/ "./src/utils/vdom.get.ts":
/*!*******************************!*\
  !*** ./src/utils/vdom.get.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Attr": () => (/* binding */ Attr),
/* harmony export */   "Children": () => (/* binding */ Children),
/* harmony export */   "Event": () => (/* binding */ Event)
/* harmony export */ });
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index */ "../utils/index.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/utils/index.ts");
/* harmony import */ var _freedom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../freedom */ "./src/freedom.ts");
/* harmony import */ var _vdom_misc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vdom.misc */ "./src/utils/vdom.misc.ts");




function Attr(element) {
    const test = _vdom_misc__WEBPACK_IMPORTED_MODULE_3__.testNodeType(element);
    if (test == "Text" || test === false)
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("element", "Element", element, "only Element have attributes");
    const attr = element.attributes;
    var result = {};
    for (let i = 0; i < attr.length; i++)
        result[attr[i].name] = attr[i].textContent;
    if (Object.keys(result).length === 0)
        return null;
    else
        return result;
}
function Event(node) {
    if (_freedom__WEBPACK_IMPORTED_MODULE_2__.eventStore.has(node)) {
        const record = _freedom__WEBPACK_IMPORTED_MODULE_2__.eventStore.get(node), result = {};
        for (let eventName in record) {
            result[eventName] = [];
            for (let i = 0; i < record[eventName].length; i++) {
                result[eventName][i] = {};
                for (let member in record[eventName][i]) {
                    result[eventName][i][member] = record[eventName][i][member];
                }
            }
        }
        return result;
    }
    else
        return null;
}
function Children(element) {
    const children = Array.from(element.childNodes);
    var result = [];
    for (let i = 0; i < children.length; i++) {
        const item = children[i];
        if (item === null) {
            console.warn("DOM structure was changed during freeDOM's parsing nodes. Please avoid that.");
            continue;
        }
        const test = _vdom_misc__WEBPACK_IMPORTED_MODULE_3__.testNodeType(item);
        if (test == "Element")
            result.push(_index__WEBPACK_IMPORTED_MODULE_1__.vDOM.parseNode(item));
        else if (test == "Text") {
            const node = _index__WEBPACK_IMPORTED_MODULE_1__.vDOM.parseNode(item);
            if (node !== null)
                result.push(node);
        }
    }
    if (result.length == 0)
        return null;
    else
        return result;
}


/***/ }),

/***/ "./src/utils/vdom.misc.ts":
/*!********************************!*\
  !*** ./src/utils/vdom.misc.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isVElement": () => (/* binding */ isVElement),
/* harmony export */   "isVText": () => (/* binding */ isVText),
/* harmony export */   "processNLIText": () => (/* binding */ processNLIText),
/* harmony export */   "testNodeType": () => (/* binding */ testNodeType)
/* harmony export */ });
function testNodeType(node) {
    if (node instanceof Text)
        return "Text";
    else if (node instanceof Element)
        return "Element";
    else
        return false;
}
function isVText(input) {
    return (typeof input == "object"
        && "id" in input
        && "text" in input
        && "instance" in input
        && Object.keys(input).length == 3);
}
function isVElement(input) {
    return (typeof input == "object"
        && "id" in input
        && "tagName" in input
        && "attrs" in input
        && "events" in input
        && "children" in input
        && "instance" in input
        && Object.keys(input).length == 6);
}
function processNLIText(textNode) {
    const textContent = textNode.textContent, signContent = textContent.replace(/\n\s*/g, ""), parent = textNode.parentElement;
    if (parent.tagName == "TEXTAREA" || (parent instanceof HTMLElement && parent.isContentEditable))
        return textContent;
    else {
        if (signContent === "") {
            textNode.remove();
            return null;
        }
        else if (signContent !== textContent) {
            textNode.textContent = textContent.replace(/\n\s*/g, " ");
            return textNode.textContent;
        }
        else
            return textContent;
    }
}


/***/ }),

/***/ "./src/utils/vdom.ts":
/*!***************************!*\
  !*** ./src/utils/vdom.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "build": () => (/* reexport module object */ _vdom_build__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   "buildNode": () => (/* binding */ buildNode),
/* harmony export */   "createVElement": () => (/* binding */ createVElement),
/* harmony export */   "createVText": () => (/* binding */ createVText),
/* harmony export */   "get": () => (/* reexport module object */ _vdom_get__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "misc": () => (/* reexport module object */ _vdom_misc__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "parseNode": () => (/* binding */ parseNode)
/* harmony export */ });
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index */ "../utils/index.ts");
/* harmony import */ var _vdom_misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vdom.misc */ "./src/utils/vdom.misc.ts");
/* harmony import */ var _vdom_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vdom.get */ "./src/utils/vdom.get.ts");
/* harmony import */ var _vdom_build__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vdom.build */ "./src/utils/vdom.build.ts");










function createVElement(tagName, attrs, events, children, instance) {
    if (typeof tagName != "string")
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("tagName", "string", tagName);
    if (attrs !== null && attrs.toString() != "[object Object]")
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("attrs", "SSkvObject", attrs);
    if (events !== null && events.toString() != "[object Object]")
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("events", "eventRecord", events);
    if (children !== null && !(children instanceof Array))
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("children", "childrenArray", children);
    if (instance !== null && !(instance instanceof Element))
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("instance", "Element", instance);
    return {
        id: _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.randoma2Z(15),
        tagName: tagName.toLocaleLowerCase(),
        attrs,
        events,
        children,
        instance
    };
}
function createVText(text, instance) {
    if (instance !== null && !(instance instanceof Text))
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("instance", "Text", instance);
    if (typeof text == "string")
        return {
            id: _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.randoma2Z(15),
            text,
            instance
        };
    else if (text === null)
        return null;
    else {
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("text", "string | null", text);
        return null;
    }
}
function parseNode(node) {
    const test = _vdom_misc__WEBPACK_IMPORTED_MODULE_1__.testNodeType(node);
    if (test == "Text") {
        const text = node;
        return createVText(_vdom_misc__WEBPACK_IMPORTED_MODULE_1__.processNLIText(text), text);
    }
    else if (test == "Element") {
        const element = node;
        return createVElement(element.tagName, _vdom_get__WEBPACK_IMPORTED_MODULE_2__.Attr(element), _vdom_get__WEBPACK_IMPORTED_MODULE_2__.Event(element), _vdom_get__WEBPACK_IMPORTED_MODULE_2__.Children(element), element);
    }
    else {
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("node", "instance", node);
        return null;
    }
}
function buildNode(vDOM) {
    if (_vdom_misc__WEBPACK_IMPORTED_MODULE_1__.isVElement(vDOM)) {
        vDOM = vDOM;
        const instance = document.createElement(vDOM.tagName);
        _vdom_build__WEBPACK_IMPORTED_MODULE_3__.Attr(instance, vDOM);
        _vdom_build__WEBPACK_IMPORTED_MODULE_3__.Event(instance, vDOM);
        _vdom_build__WEBPACK_IMPORTED_MODULE_3__.Children(instance, vDOM);
        return instance;
    }
    else if (_vdom_misc__WEBPACK_IMPORTED_MODULE_1__.isVText(vDOM)) {
        vDOM = vDOM;
        return document.createTextNode(vDOM.text);
    }
    else {
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("vDOM", "vDOM", vDOM);
        return new Element();
    }
}


/***/ }),

/***/ "../utils/element.ts":
/*!***************************!*\
  !*** ../utils/element.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ e),
/* harmony export */   "getInnerNodes": () => (/* binding */ getInnerNodes),
/* harmony export */   "hatch": () => (/* binding */ hatch),
/* harmony export */   "isChild": () => (/* binding */ isChild),
/* harmony export */   "isDescendant": () => (/* binding */ isDescendant),
/* harmony export */   "isInDocument": () => (/* binding */ isInDocument),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "toHTML": () => (/* binding */ toHTML)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "../utils/index.ts");

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
function isChild(element, target) {
    const children = target.childNodes;
    for (let i = 0; i < children.length; i++)
        if (element === children[i])
            return true;
    return false;
}
function toHTML(HTML) {
    if (HTML === "" || typeof HTML != "string")
        _index__WEBPACK_IMPORTED_MODULE_0__.generic.E("HTML", "string", HTML);
    const ele = document.createElement("div");
    ele.innerHTML = HTML;
    return getInnerNodes(ele);
}
function getInnerNodes(el) {
    var nodes = [];
    for (let i = 0; i < el.childNodes.length; i++)
        nodes[i] = el.childNodes[i].cloneNode(true);
    return nodes;
}
function hatch(element, remove) {
    const par = element.parentElement, children = Array.from(element.childNodes);
    for (let i = 0; i < children.length; i++)
        par.insertBefore(children[i], element);
    if (remove === true)
        element.remove();
    return children;
}
function render(HTML, element, insertAfter, append, disableDF) {
    if (element.parentElement === null)
        _index__WEBPACK_IMPORTED_MODULE_0__.generic.EE("cannot render by '<html>' element, since it's root of document.");
    var html = [];
    if (typeof HTML == "string")
        html = toHTML(HTML);
    else if (HTML instanceof Element || HTML instanceof Node)
        html[0] = HTML.cloneNode(true);
    else if (HTML instanceof HTMLCollection || HTML instanceof NodeList)
        for (let i = 0; i < HTML.length; i++)
            html[i] = HTML.item(i).cloneNode(true);
    else
        html = HTML;
    const Rhtml = [...html].reverse(), parent = element.parentElement;
    if (append === true)
        for (let i = 0; i < html.length; i++)
            element.append(html[i]);
    else if (append === false)
        for (let i = 0; i < Rhtml.length; i++)
            element.prepend(Rhtml[i]);
    else if (insertAfter === true) {
        if (!element.nextSibling)
            for (let i = 0; i < Rhtml.length; i++)
                parent.append(Rhtml[i]);
        else
            for (let i = 0; i < Rhtml.length; i++)
                parent.insertBefore(Rhtml[i], element.nextSibling);
    }
    else if (insertAfter === false)
        for (let i = 0; i < html.length; i++)
            parent.insertBefore(html[i], element);
    else
        for (let i = 0; i < html.length; i++)
            element.append(html[i]);
    return html;
}


/***/ }),

/***/ "../utils/generic.ts":
/*!***************************!*\
  !*** ../utils/generic.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ E),
/* harmony export */   "EE": () => (/* binding */ EE),
/* harmony export */   "constantize": () => (/* binding */ constantize),
/* harmony export */   "precisePop": () => (/* binding */ precisePop),
/* harmony export */   "randoma2Z": () => (/* binding */ randoma2Z),
/* harmony export */   "randoma2z029": () => (/* binding */ randoma2z029),
/* harmony export */   "repeat": () => (/* binding */ repeat)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "../utils/index.ts");

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
function E(argument, type, value, reason) {
    if (argument === undefined)
        throw new Error("An error occured.");
    else {
        console.info("ERROR INFO: argument", argument, ",type", type, ",value", value, ",reason", reason);
        throw new Error(`Argument '${argument}' ${type ? `should be a(an) ${type}` : "is invalid"}${reason ? `, reason: ${reason}` : ""}${value ? `, got ${value}` : ""}.`);
    }
}
function EE(message) { throw new Error(message); }
function repeat(item, count) {
    if (typeof count != "number" || count < 1)
        _index__WEBPACK_IMPORTED_MODULE_0__.generic.E("count", "number smaller than 1", count);
    var arr = [];
    arr[count - 1] = " ";
    return arr.fill(item, 0, count);
}


/***/ }),

/***/ "../utils/index.ts":
/*!*************************!*\
  !*** ../utils/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "element": () => (/* reexport module object */ _element__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "generic": () => (/* reexport module object */ _generic__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _generic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generic */ "../utils/generic.ts");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "../utils/element.ts");






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
/*!*******************************!*\
  !*** ./src/freedom.export.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _freedom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./freedom */ "./src/freedom.ts");

Object.defineProperty(window, "FreeDOM", {
    configurable: false,
    writable: false,
    enumerable: true,
    value: _freedom__WEBPACK_IMPORTED_MODULE_0__["default"]
});

})();

/******/ })()
;
//# sourceMappingURL=freedom.js.map
/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../utils/index";
import * as localUtils from "./utils/index";
console.info("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
var instances :FreeDOM[] = [];
const Ep = Element.prototype;
(Ep as anyObject).oddEventListener = Ep.addEventListener;
Ep.addEventListener = new Proxy((Ep as anyObject).oddEventListener, {
    apply(oEL :Function, callerElement :Element, argArray :[]){
        //todo:获取事件
        return Reflect.apply(oEL, callerElement, argArray);
    }
});
class FreeDOM{
    #rootNode :Element;
    #vDOMTree? :vElement; //hack:ts真无聊
    #options? :fdOptions;
    constructor(rootNode :Elementy, options? :fdOptions){
        console.info("creating new FreeDOM instance with rootNode", rootNode, "and options", options);
        rootNode = localUtils.misc.reduceToElement(rootNode);
        this.#rootNode = rootNode;
        const tree = localUtils.vDOM.parseNode(rootNode);
        if(typeof tree == "string" || tree === null) utils.generic.E("rootNode", "Element | string", rootNode, "rootNode should be an Element or a #id selector");
        else this.#vDOMTree = tree;
        this.#options = options;
        instances.push(this); //记录实例
/**/}
//////API
/**///utils那边都做了检测了，这边只管调用
    //创建vDOM
    c(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    }
    createNode(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    }
    createElement(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    }
    createVElement(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    }
    h(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    }
    createVNode(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    }
    createNodeDescription(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    }
    //结束 创建vDOM
    p(node :Node) :vElement | string | null{
        return localUtils.vDOM.parseNode(node);
    }
    parseNode(node :Node) :vElement | string | null{
        return localUtils.vDOM.parseNode(node);
    }
    b(vElement :vElement | string) :instance{
        return localUtils.vDOM.buildNode(vElement);
    }
    buildNode(vElement :vElement | string) :instance{
        return localUtils.vDOM.buildNode(vElement);
    }
    s(){

    }
    sync(){

    }
    r(){

    }
    rsync(){
        
    }
    __extractAttr__(element :Element) :SSkvObject | null{
        return localUtils.vDOM.extractAttr(element);
    }
/**/
//////工具方法
/**/e(s :string, scope? :Element | Document) :Node | Node[]{return utils.element.e(s, scope);}
}
utils.generic.constantize(FreeDOM);
(window as anyObject).FreeDOM = FreeDOM;
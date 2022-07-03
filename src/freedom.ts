/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../utils/index";
import * as localUtils from "./utils/index";
console.info("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
class FreeDOM{
    #rootNode :Element;
    constructor(rootNode :Elementy, options? :fdOptions){
        this.#rootNode = localUtils.misc.reduceToElement(rootNode);
        console.info("creating new FreeDOM instance with rootNode", rootNode);
/**/}
//////API
/**///utils那边都做了检测了，这边只管调用
    h(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    }
    createNode(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    }
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
    __extractAttr__(element :Element) :SSkvObject | null{
        return localUtils.vDOM.extractAttr(element);
    }
/**/
//////工具方法
/**/e(s :string, scope? :Element | Document) :Node | Node[]{return utils.element.e(s, scope);}
}
utils.generic.constantize(FreeDOM);
(window as anyObject).FreeDOM = FreeDOM;
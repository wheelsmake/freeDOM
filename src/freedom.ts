/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../utils/index";
import * as localUtils from "./utils";
console.info("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
class FreeDOM{
    constructor(){
        console.info("creating new FreeDOM instance.");
/**/}
//////API
/**/h(tagName :string, attr :SSkvObject, children :childrenArray) :vElement{return utils.vDOM.createVElement(tagName, attr, children);}
    createNode(tagName :string, attr :SSkvObject, children :childrenArray) :vElement{return utils.vDOM.createVElement(tagName, attr, children);}
    p(node :Node) :vElement{return utils.vDOM.parseNode(node)!;}
    parseNode(node :Node) :vElement{return utils.vDOM.parseNode(node)!;}
    
/**/
//////工具方法
/**/e(s :string, scope? :Element | Document) :Node | Node[]{return utils.element.e(s, scope);}
}
utils.generic.constantize(FreeDOM);
(window as anyObject).FreeDOM = FreeDOM;
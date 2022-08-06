/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../../utils/index";
import * as localUtils from "./index";
import * as misc from "./vdom.misc";

//全量
export function Attr(element :Element, data :vElement) :void{
    const attrs = data.attrs;
    for(let i in attrs) deltaAttr(element, i, attrs[i]);
}
export function Event(element :Element, data :vElement){
    //todo:
}
export function Children(element :Element, data :vElement) :void{
    if(data.children === null) return;
    else{
        const children = data.children;
        for(let i = 0; i < children.length; i++) deltaChildren(element, children[i]); //递归产生处
    }
}

//增量
export function deltaAttr(element :Element, key :string, value :string) :void{
    element.setAttribute(key, value);
}
export function deltaEvent(element :Element) :void{
    //todo:
    
}
export function deltaChildren(element :Element, childrenVDOM :vDOM) :void{
    element.appendChild(localUtils.vDOM.buildNode(childrenVDOM));
}
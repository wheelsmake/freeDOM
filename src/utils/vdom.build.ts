/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../../utils/index";
import * as localUtils from "./index";
import * as misc from "./vdom.misc";
export function Attr(element :Element, data :vElement) :void{
    const attrs = data.attrs;
    for(let i in attrs){
        
    }
}
export function Event(element :Element, data :vElement){
    //todo:
}
//review:这个方法不知道能不能用
export function Children(element :Element, data :vElement) :void{
    if(data.children === null) return;
    else{
        const children = data.children;
        for(let i = 0; i < children.length; i++) element.appendChild(localUtils.vDOM.buildNode(children[i])); //递归产生处
    }
}
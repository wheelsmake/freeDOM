/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../../utils/index";
import * as localUtils from "./index";
//这个东西不能导出，否则ts会无法编译
import * as FreeDOM from "../freedom";
import * as misc from "./vdom.misc";
export function Attr(element :Element) :anyObject | null{
    const test = misc.testNodeType(element);
    if(test == "Text" || test === false) utils.generic.E("element", "Element", element, "only Element have attributes"); //文本节点不存在attr
    const attr = element.attributes; //typeof NamedNodeMap
    var result :anyObject = {};
    for(let i = 0; i < attr.length; i++) result[attr[i].name] = attr[i].textContent!; //只要传入已有name就不会出null
    if(Object.keys(result).length === 0) return null;
    else return result;
}
export function Event(node :Element) :eventRecord | null{
    //传回的是对于Map Entry的引用，也就是说once:true的事件触发并删除后在vDOM里的events也会同步
    if(FreeDOM.eventStore.has(node)) return FreeDOM.eventStore.get(node)!;
    else return null;
}
export function Children(element :Element/* | Text*/) :childrenArray | null{
    const children :NodeList = element.childNodes;
    //argument_solved:用NodeList能避免出现错误，并且可以获得尽可能最新的列表。
    var result :vDOM[] = [];
    for(let i = 0; i < children.length; i++){
        const item = children.item(i);
        if(item === null){ //这里可以避免缺陷for循环，因为i是对的，一个Element的childNodes不可能item出非Node，走到这里的唯一可能就是NodeList出缺陷了
            console.warn("DOM structure was changed during freeDOM is parsing nodes. Please avoid that.");
            continue;
        }
        const test = misc.testNodeType(item);
        if(test == "Element") result.push(localUtils.vDOM.parseNode(item)!); //递归产生处，Element不会null
        else if(test == "Text"){
            const node = localUtils.vDOM.parseNode(item); //递归产生处
            if(node !== null) result.push(node);
            //else null表示垃圾文本节点已经被删除，不需要记录了
        }
        //else 应该永远不会走到这里吧
    }console.log(result);
    if(result.length === 0) return null;
    else return result;
}
/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../../utils/index";
import * as localUtils from "./index";
//这个东西不能导出，否则ts会无法编译
import * as FreeDOM from "../freedom";
import * as misc from "./vdom.misc";
export function Attr(element :Element) :SSkvObject | null{
    const test = misc.testNodeType(element);
    if(test == "Text" || test === false) utils.generic.E("element", "Element", element, "only Element have attributes"); //文本节点不存在attr
    const attr = element.attributes; //typeof NamedNodeMap
    var result :SSkvObject = {};
    for(let i = 0; i < attr.length; i++) result[attr[i].name] = attr[i].textContent!; //只要传入已有name就不会出null
    if(Object.keys(result).length === 0) return null;
    else return result;
}
export function Event(node :Element) :eventRecord | null{
    //fixed:这边可以这样写，通过import/export的FreeDOM.eventStore传回的就是eventStore本身，具有关联性
    if(FreeDOM.eventStore.has(node)){
        //浅复制eventStore，等于是保存元素当前的事件状态快照
        //浅复制即可，浏览器删除事件监听器时不会销毁对象
        const record = FreeDOM.eventStore.get(node)!, result :anyObject = {}; //ts真无聊
        for(let eventName in record){
            result[eventName] = [];
            for(let i = 0; i < record[eventName].length; i++){
                result[eventName][i] = {};
                for(let member in record[eventName][i]){
                    result[eventName][i][member] = (record[eventName][i] as anyObject)[member]; //ts真无聊
                }
            }
        }
        return result;
    }
    else return null;
}
export function Children(element :Element/* | Text*/) :childrenArray | null{
    const children :Node[] = Array.from(element.childNodes);
    //argument_solved 2022.7.31:只能用Node[]，因为垃圾文本节点会被删除造成必然缺陷。
    var result :vDOM[] = [];
    for(let i = 0; i < children.length; i++){
        const item = children[i];
        if(item === null){ //这里可以避免缺陷for循环，因为i是对的，一个Element的childNodes不可能item出非Node，走到这里的唯一可能就是NodeList出缺陷了
            console.warn("DOM structure was changed during freeDOM's parsing nodes. Please avoid that.");
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
    }
    if(result.length == 0) return null;
    else return result;
}
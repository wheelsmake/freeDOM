/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../../utils/index";
import * as localUtils from "./index";
//这个东西不能导出，否则ts会无法编译
import * as FreeDOM from "../freedom";
function testNodeType(node :Node) :"Text" | "Element" | false{
    if(node instanceof Text) return "Text";
    else if(node instanceof Element) return "Element";
    else return false;
}
function isVElement(input :any) :boolean{
    return(
        typeof input == "object"
     && "id" in input
     && "tagName" in input
     && "attrs" in input
     && "children" in input
     && "instance" in input
    );
}
function processNLIText(textNode :Text) :string | null{
    const textContent = textNode.textContent!,
          //这个是用来标记原字符串是否需要处理的
          signContent = textContent.replace(/\n\s*/g, ""), //只有\n也要删
          parent = textNode.parentElement as Element; //replace不改动原字符串
    const shouldKeepNLI = parent.tagName == "TEXTAREA" || (parent instanceof HTMLElement && parent.isContentEditable); //排除可编辑内容的元素的内容
    if(shouldKeepNLI) return textContent;
    else{
        if(signContent === ""){ //完全就是垃圾节点
            textNode.remove();
            return null;
        }
        else if(signContent !== textContent){ //部分垃圾
            textNode.textContent = textContent.replace(/\n\s*/g, " "); //更新文本节点，插入空格，保持视觉效果
            return signContent;
        }
        else return textContent; //没有垃圾
    }
}
export function createVElement(tagName :string, attrs? :SSkvObject | null, children? :childrenArray, instance? :Element) :vElement{
    return{
        id: utils.generic.randoma2Z(15),
        tagName: tagName.toLocaleLowerCase(), //fixed:我是傻逼
        attrs: attrs || null,
        children: children || null,
        instance: instance || null
    };
}
/**`null` 仅在垃圾文本节点会出现*/
export function parseNode(node :Node) :vElement | string | null{
    const test = testNodeType(node);
    if(test == "Text") return processNLIText(node as Text);
    else if(test == "Element"){
        const element = node as Element;
        return createVElement(element.tagName, extractAttr(element), getChildren(element), element);
    }
    else{
        utils.generic.E("node", "Element | Text" , node);
        return ""; //hack:ts真无聊
    }
}
function extractAttr(element :Element) :anyObject | null{
    const test = testNodeType(element);
    if(test == "Text" || test === false) utils.generic.E("element", "Element", element, "only Element have attributes"); //文本节点不存在attr
    const attr = element.attributes; //typeof NamedNodeMap
    var result :anyObject = {};
    for(let i = 0; i < attr.length; i++) result[attr[i].name] = attr[i].textContent!; //只要传入已有name就不会出null
    /* fixed:已经通过修改addEventListener完成
     * 不能获取元素通过addEventListener绑定的事件
    */
    //从eventStore里弄事件
    if(FreeDOM.eventStore.has(element)){
        const events = FreeDOM.eventStore.get(element)!;
        for(let i = 0; i< Object.keys(events).length; i++){

        }
    }
    if(Object.keys(result).length === 0) return null;
    else return result;
}
function buildAttr(element :Element, data :vElement) :void{
    const attrs = data.attrs;
    for(let i in attrs){
        //todo:别忘了事件
    }
}
function getChildren(element :Element/* | Text*/) :childrenArray | undefined{
    const children :NodeList = element.childNodes;
    //argument_solved:用NodeList能避免出现错误，并且可以获得尽可能最新的列表。
    var result :vDOM[] = [];
    for(let i = 0; i < children.length; i++){
        const item = children.item(i);
        if(item === null){ //这里可以避免缺陷for循环，因为i是对的，一个Element的childNodes不可能item出非Node，走到这里的唯一可能就是NodeList出缺陷了
            console.warn("DOM structure was changed during freeDOM is parsing nodes. Please avoid that.");
            continue;
        }
        else parseNode(item); //fixed:我是傻逼，放着现成的parse不用 //递归产生处
    }
    if(result.length === 0) return undefined;
    else return result;
}
function buildChildren(element :Element, data :vElement) :void{
    if(data.children === null) return;
    else{
        const children = data.children;
        for(let i = 0; i < children.length; i++) buildNode(children[i]); //递归产生处
    }
}
export function buildNode(vElement :vElement | string) :instance{
    if(isVElement(vElement)){
        vElement = vElement as vElement; //ts真无聊
        const instance = document.createElement(vElement.tagName);
        buildAttr(instance, vElement);
        buildChildren(instance, vElement);
        return instance;
    }
    else if(typeof vElement == "string") return document.createTextNode(vElement);
    else{
        utils.generic.E("vElement", "vElement", vElement);
        return new Element(); //hack:ts真无聊
    }
}
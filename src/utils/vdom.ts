/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../../utils/index";
import * as localUtils from "./index";

//本地导入
import * as misc from "./vdom.misc";
import * as get from "./vdom.get";
import * as build from "./vdom.build";
import * as diff from "./vdom.diff";

export * as misc from "./vdom.misc";
export * as get from "./vdom.get";
export * as build from "./vdom.build";
export * as diff from "./vdom.diff";

export function createVElement(
        id :string,
        tagName :string,
        attrs :SSkvObject | null,
        events :eventRecord | null,
        children :childrenArray,
        instance :Element | null
    ) :vElement{
    if(typeof tagName != "string") utils.generic.E("tagName", "string", tagName);
    //不完整验证
    if(attrs !== null && attrs.toString() != "[object Object]") utils.generic.E("attrs", "SSkvObject", attrs);
    if(events !== null && events.toString() != "[object Object]") utils.generic.E("events", "eventRecord", events);
    if(children !== null && !(children instanceof Array)) utils.generic.E("children", "childrenArray", children);
    if(instance !== null && !(instance instanceof Element)) utils.generic.E("instance", "Element", instance);
    return{
        id,
        tagName: tagName.toLocaleLowerCase(), //fixed:我是傻逼
        attrs,
        events,
        children: children,
        instance
    };
}
export function createVText(id :string, text :string, instance :Text | null) :vText | void{
    //不完整验证
    if(instance !== null && !(instance instanceof Text)) utils.generic.E("instance", "Text", instance);
    if(typeof text == "string") return{
        id,
        text,
        instance
    };
    else utils.generic.E("text", "string | null" , text);
}
/**`null` 仅在垃圾文本节点会出现*/
export function parseNode(node :Node) :vDOM | void{
    const test = misc.testNodeType(node), id = utils.generic.randoma2Z(15);
    if(test == "Text"){
        const textNode = node as Text,
              NLIresult = misc.processNLIText(textNode);
        if(NLIresult !== null) return createVText(id, NLIresult , textNode)!;
        //fixed:太多方法将null作为错误返回值了，其实应该返回void的
    }
    else if(test == "Element"){
        const element = node as Element,
              result = createVElement(id, element.tagName, get.Attr(element), get.Event(element), get.Children(element), element);
        return result;
    }
    else utils.generic.E("node", "instance" , node);
}
export function buildNode(vDOM :vDOM) :instance{
    if(misc.isVElement(vDOM)){
        vDOM = vDOM as vElement; //ts真无聊
        const instance = document.createElement(vDOM.tagName);
        build.Attr(instance, vDOM);
        build.Event(instance, vDOM);
        build.Children(instance, vDOM);
        return instance;
    }
    else if(misc.isVText(vDOM)){
        vDOM = vDOM as vText; //ts真无聊
        return document.createTextNode(vDOM.text);
    }
    else{
        utils.generic.E("vDOM", "vDOM", vDOM);
        return new Element(); //ts真无聊
    }
}
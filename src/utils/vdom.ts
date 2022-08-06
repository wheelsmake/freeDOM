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

export * as misc from "./vdom.misc";
export * as get from "./vdom.get";
export * as build from "./vdom.build";

export function createVElement(
        tagName :string,
        attrs :SSkvObject | null,
        events :eventRecord | null,
        children :childrenArray | null,
        instance :Element | null
    ) :vElement{
    if(typeof tagName != "string") utils.generic.E("tagName", "string", tagName);
    //不完整验证
    if(attrs !== null && attrs.toString() != "[object Object]") utils.generic.E("attrs", "SSkvObject", attrs);
    if(events !== null && events.toString() != "[object Object]") utils.generic.E("events", "eventRecord", events);
    if(children !== null && !(children instanceof Array)) utils.generic.E("children", "childrenArray", children);
    if(instance !== null && !(instance instanceof Element)) utils.generic.E("instance", "Element", instance);
    return{
        id: utils.generic.randoma2Z(15),
        tagName: tagName.toLocaleLowerCase(), //fixed:我是傻逼
        attrs,
        events,
        children,
        instance
    };
}
export function createVText(text :string | null, instance :Text | null) :vText | null{
    //不完整验证
    if(instance !== null && !(instance instanceof Text)) utils.generic.E("instance", "Text", instance);
    if(typeof text == "string") return{
        id: utils.generic.randoma2Z(15),
        text,
        instance
    };
    else if(text === null) return null;
    else{
        utils.generic.E("text", "string | null" , text);
        return null; //ts真无聊
    }
}
/**`null` 仅在垃圾文本节点会出现*/
export function parseNode(node :Node) :vDOM | null{
    const test = misc.testNodeType(node);
    if(test == "Text"){
        const text = node as Text;
        return createVText(misc.processNLIText(text), text); //createVText已经自动处理null情况了
    }
    else if(test == "Element"){
        const element = node as Element;
        return createVElement(element.tagName, get.Attr(element), get.Event(element), get.Children(element), element);
    }
    else{
        utils.generic.E("node", "instance" , node);
        return null; //ts真无聊
    }
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
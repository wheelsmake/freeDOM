/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./index";
import vElement from "../vElement";
import vText from "../vText";
import * as tagNames from "../tagNames";
export function testNodeType(node :Node) :"Text" | "Element" | false{
    if(node instanceof Text) return "Text";
    else if(node instanceof Element) return "Element";
    else return false;
}
export function createVElementFromData(tagName :string, attr :nNullkvObject, children :vDOM_A) :vElement{
    return new vElement(tagName, attr, children);
}
function createVElement(element :Element) :vElement{
    return new vElement(element.tagName.toLocaleLowerCase(), extractAttr(element), getChildren(element), element);
}
export function createVTextFromData(textContent :string) :vText{
    return new vText(textContent);
}
function createVText(text :Text) :vText{
    utils.element.removeIndentText(text);
    return new vText(text.textContent!, text); //!：https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#:~:text=%E5%A6%82%E6%9E%9C%E8%8A%82%E7%82%B9%E6%98%AF%E4%B8%80%E4%B8%AA%20document%EF%BC%8C%E6%88%96%E8%80%85%E4%B8%80%E4%B8%AA%C2%A0DOCTYPE%20%EF%BC%8C%E5%88%99%C2%A0textContent%C2%A0%E8%BF%94%E5%9B%9E%20null
}
/**其实只可能得到 `vDOM`，大胆用 `!` 吧*/
export function parseNode(node :Node) :vDOM | undefined/*hack:ts真无聊*/{
    const test = testNodeType(node);
    if(test == "Text") return createVText(node as Text);
    else if(test == "Element") return createVElement(node as Element);
    else utils.generic.E("node", "Element | Text" , node);
}
export function extractAttr(element :Element) :nNullkvObject{
    const test = testNodeType(element);
    if(test == "Text" || test === false) utils.generic.E("element", "Element", element, "only Element have attributes"); //文本节点不存在attr
    const attr = element.attributes; //typeof NamedNodeMap
    var result :nNullkvObject = {};
    for(let i = 0; i < attr.length; i++) result[attr[i].name] = attr[i].textContent!; //!：同#L19
    //fixme:还有事件！！！别忘了事件啊！！！
    for(let i in element){
        if(i.indexOf("on") === 0){ //随便吧，还是全等比较好
            console.log((element as anyObject)[i]);
        }
    }
    return result;
}
export function getChildren(element :Element/* | Text*/) :vDOM_A{
    const children :NodeList = element.childNodes;
    //argument:这里用Node[]会更正常一点，因为NodeList是动态变化的？
    //argument:不行，就是要使用动态变化的nodeList来实时监测节点是否动了，否则等一下建了个错误的vDOM树
    //argument:但是…………………………这样不会造成缺陷for循环吗？？？
    var result :vDOM_A = [];
    for(let i = 0; i < children.length; i++){
        const test = testNodeType(children.item(i)!);
        if(test == "Element"){
            const child_i = children.item(i) as Element;
            result.push(createVElement(child_i)); //产生递归处
        }
        else if(test == "Text"){
            const textNode = children.item(i) as Text;
            utils.element.removeIndentText(textNode);
            result.push(createVText(textNode));
        }
        else continue; //argument:这里可以避免缺陷for循环
    }
    return result;
}
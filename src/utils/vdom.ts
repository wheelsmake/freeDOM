/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../utils/index";
export function testNodeType(node :Node) :"Text" | "Element" | false{
    if(node instanceof Text) return "Text";
    else if(node instanceof Element) return "Element";
    else return false;
}
export function createVElement(tagName :string, attrs :SSkvObject, children :childrenArray) :vElement{
    return{
        tagName,
        attrs,
        children
    };
}
export function mount() :Element | null{

}
/**其实只可能得到 `vDOM`，大胆用 `!` 吧
export function parseNode(node :Node) :vElement | string | undefined/*hack:ts真无聊{
    const test = testNodeType(node);
    if(test == "Text") return createVText(node as Text);
    else if(test == "Element") return createVElement(node as Element);
    else utils.generic.E("node", "Element | Text" , node);
}*/
export function extractAttr(element :Element) :SSkvObject{
    const test = testNodeType(element);
    if(test == "Text" || test === false) utils.generic.E("element", "Element", element, "only Element have attributes"); //文本节点不存在attr
    const attr = element.attributes; //typeof NamedNodeMap
    var result :SSkvObject = {};
    for(let i = 0; i < attr.length; i++) result[attr[i].name] = attr[i].textContent!; //!：同#L19
    //fixme:还有事件！！！别忘了事件啊！！！
    for(let i in element){
        if(i.indexOf("on") === 0){ //随便吧，还是全等比较好
            console.log((element as anyObject)[i]);
        }
    }
    return result;
}
export function getChildren(element :Element/* | Text*/) :childrenArray{
    const children :NodeList = element.childNodes;
    //argument:这里用Node[]会更正常一点，因为NodeList是动态变化的？
    //argument:不行，就是要使用动态变化的nodeList来实时监测节点是否动了，否则等一下建了个错误的vDOM树
    //argument:但是…………………………这样不会造成缺陷for循环吗？？？
    var result :vDOM_A = [];
    for(let i = 0; i < children.length; i++){.
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
        else continue; //这里可以避免缺陷for循环
    }
    return result;
}
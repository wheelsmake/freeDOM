/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../../utils/index";
import * as localUtils from "./index";
export function testNodeType(node :Node) :"Text" | "Element" | false{
    if(node instanceof Text) return "Text";
    else if(node instanceof Element) return "Element";
    else return false;
}
export function isVText(input :any) :boolean{
    return(
        typeof input == "object"
     && "id" in input
     && "text" in input
     && "instance" in input
     && Object.keys(input).length == 3
    );
}
export function isVElement(input :any) :boolean{
    return(
        typeof input == "object"
     && "id" in input
     && "tagName" in input
     && "attrs" in input
     && "events" in input
     && "children" in input
     && "instance" in input
     && Object.keys(input).length == 6
    );
}
/****!PURE 非纯函数**
 * 
 * 检测某个文本节点是否为垃圾文本节点（即缩进造成的文本节点）
 * 
 * 这种文本节点会造成 vDOM 大小明显变大，必须处理
 * 
 * 如果全部垃圾，那么就直接删除这个节点并返回 `null`
 * 
 * 如果不完全垃圾，那么删除垃圾部分并返回剩下的 `textContent`
 * 
 * 如果没有垃圾或**被判定为豁免节点**，那么直接返回 `textContent`
 */
export function processNLIText(textNode :Text) :string | null{
    //fixme:存在末尾\n文本节点被浏览器自动加回去的问题（但并未影响vDOM）
    const textContent = textNode.textContent!,
          //这个是用来标记原字符串是否需要处理的
          signContent = textContent.replace(/\n\s*/g, ""), //只有\n也要删
          parent = textNode.parentElement as Element; //replace不改动原字符串
    //排除可编辑内容的元素的内容
    if(parent.tagName == "TEXTAREA" || (parent instanceof HTMLElement && parent.isContentEditable)) return textContent;
    else{
        if(signContent === ""){ //完全就是垃圾节点
            textNode.remove();
            return null;
        }
        else if(signContent !== textContent){ //部分垃圾
            textNode.textContent = textContent.replace(/\n\s*/g, " "); //更新文本节点，插入空格，保持视觉效果
            return textNode.textContent; //fixed:signContent和textContent都不一样，干嘛返回signContent啊
        }
        else return textContent; //没有垃圾
    }
}
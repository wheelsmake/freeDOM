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
     && "children" in input
     && "instance" in input
     && Object.keys(input).length == 5
    );
}
export function processNLIText(textNode :Text) :string | null{
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
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
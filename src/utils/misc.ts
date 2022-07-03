/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../../utils/index";
import * as localUtils from "./index";
export function reduceToElement(input :Elementy) :Element{
    if(input instanceof Element) return input;
    else if(typeof input == "string"){
        const el = utils.element.e(input);
        if(el instanceof Node) return el as Element;
    }
    else utils.generic.E("rootNode", "string | Element", input, "rootNode should be a #id selector or an Element");
    return new Element(); //hack:ts真无聊
}
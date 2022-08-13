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
        else utils.generic.E("rootNode", "string | Element", input, "rootNode should be a VALID #id selector"); //fixed:现在不会走到new Element()那儿了
    }
    else utils.generic.E("rootNode", "string | Element", input, "rootNode should be a #id selector or an Element");
    return new Element(); //ts真无聊
}
export function pushSearchStore(searchStore :searchStore, searchBlock :searchBlock) :void{
    //id基本不可能重复，vDOM是独立object，不可能判定相等，由于一个
}
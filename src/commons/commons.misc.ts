/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./index";
export function checkSMArgsnReduce(args :scopeManageArgs) :void{
    if(typeof args.id != "string") utils.generic.E("id", "string", args.id);
    args.rootNode = reduceToElement(args.rootNode)! as Element;
}
export function reduceToElement(input :Element | string) :Element | undefined/*hack:ts真无聊*/{
    if(input instanceof Element) return input;
    else if(typeof input == "string"){
        const el = utils.element.e(input);
        if(el instanceof Node) return el as Element;
    }
    else utils.generic.EE(`rootNode string should be a #id selector,but received ${input}.`);
}
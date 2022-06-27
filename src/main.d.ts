/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import FreeDOMCore from "./freeDOM-core";
import vElement from "./vElement";
import vText from "./vText";
declare global{
    interface scopeManageArgs{
        id :string;
        rootNode :Element | string;
    }
    type anyObject = Record<string, any>;
    type kvObject = Record<string, string | null>;
    type nNullkvObject = Record<string, string>;
    /*interface nodeDescription{
        fID: string;
        tagName :string;
        instance :Element | Text | null;
        attributes :nNullkvObject;
        parentNodeID? :string;
        childNodeIDs? :string[];
        childNodes :Array<>;
    }*/
    type nodeTree = vElement;
    type nodeStore = Record<string, vElement | vText>;
}
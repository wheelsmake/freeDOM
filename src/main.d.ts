/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import FreeDOMCore from "./freeDOM-core";
declare global{
    interface generalArgs{
        id :string;
        rootNode :Element | string;
    }
    type anyObject = Record<string, any>;
    type kvObject = Record<string, string | null>;
    type nNullkvObject = Record<string, string>;
    interface nodeDescription{
        tagName :string;
        instance :Element | Text | null;
        attributes :nNullkvObject;
        parentNodeID? :string;
        childNodeIDs? :string[];
        childNodes :Array<nodeDescription | string>;
    }
    type nodeTree = nodeDescription;
    type nodeStore = Record<string, nodeDescription>;
}
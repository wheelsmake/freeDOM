/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import FreeDOMCore from "./freedom-core";
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
    type instance = Element | Text;
    type vDOM = vElement | vText;
    type nodeTree = vElement; //不需要加vText，因为nodeStore均由程序生成，不可能指定文本节点为根节点 2022.6.29
    type nodeStore = Record<string, vDOM>;
    type vDOM_A = vDOM[];
}
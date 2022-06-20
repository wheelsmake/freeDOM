/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import freeDOMCore from "./freeDOM-core";
declare global{
    type anyObject = Record<string, any>;
    interface freeDOMInstance{
        id :string;
        instance :freeDOMCore;
        rootNode :HTMLElement;
    }
    interface nodeDescription{
        id :string;
        type :"element"|"text";
        tagName? :string;
        attributes :anyObject;
        parentNode :string;
        childNodes :string;
    }
    class FreeDOM{

    }
}
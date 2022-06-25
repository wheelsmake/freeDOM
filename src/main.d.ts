/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import FreeDOMCore from "./freeDOM-core";
declare global{
    type anyObject = Record<string, any>;
    type kvObject = Record<string, string | null>;
    type nNullkvObject = Record<string, string>;
    interface nodeDescription{
        fID :string;
        type :"e"|"t";
        tagName? :string;
        instance? :Element | Text;
        attributes :nNullkvObject;
        parentNodeID? :string;
        parentNode? :nodeDescription;
        childNodeIDs? :string[];
        childNodes? :nodeDescription[];
    }
    interface nodeTree{

    }
    type nodeStore = nodeDescription[];
    class FreeDOM{
        //note:私有成员不能暴露在d.ts中，否则会让typescript误认为将该类传入参数后可以获取到私有成员，然后报错
        id :(id :string) => FreeDOMCore | null;
        rootNode :(rootNode :HTMLElement | string) => FreeDOMCore | null;
        new :(rootNode :HTMLElement | string, id :string) => boolean;
        existsID :(id :string) => HTMLElement | null;
        existsNode :(rootNode :HTMLElement) => string | null;
        updateByID :(args :updateByIDArgs) => HTMLElement | null;
        updateByNode :(args :updateByNodeArgs) => string | null;
        delete :(arg :string | HTMLElement) => {id :string, rootNode :HTMLElement} | null;
    }
}
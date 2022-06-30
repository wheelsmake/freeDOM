/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./commons/index";
export default class vElement{
    #tagName :string;
    #attributes :nNullkvObject;
    //#childIDs? :string[];
    #children :vDOM_A;
    #instance? :Element;
    //#parent? :vElement;
    constructor(tagName :string, attributes :nNullkvObject, children :vDOM_A, instance? :Element){
        this.#tagName = tagName;
        this.#attributes = attributes;
        this.#children = children;
        //this.#fID = utils.generic.randoma2Z(10); //144,555,105,949,057,024了，不会撞上吧？
        if(instance){
            this.#instance = instance;
            //if(parent) this.#parent = parent;
            //else utils.generic.E("parent", "vElement", parent); //note:如果这个是根节点，那么就不需要搞parent了
            //else this.#fID = "rootNode";
        }
/**/}
//////CRUD
/**/getInfo() :{tagName: string; attributes: nNullkvObject; children: vDOM_A; instance: Element | undefined;}{
        return{
            tagName: this.#tagName,
            attributes: this.#attributes,
            children: this.#children,
            instance: this.#instance
        }
    }
    //__getParent__() :string | undefined{return this.#parentID;}
    //__getID__() :string{return this.#fID;}
}
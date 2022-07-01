/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./commons/index";
export default class vElement{
    #tagName :string;
    #attr :nNullkvObject;
    #instance? :Element;
    #parent? :vElement;
    #children :vDOM_A;
    #changed :vEChangeRecord = {};
    constructor(tagName :string, attr :nNullkvObject, children :vDOM_A, instance? :Element, parent? :vElement){
        this.#tagName = tagName;
        this.#attr = attr;
        this.#children = children;
        if(instance) this.#instance = instance;
        if(parent) this.#parent = parent;
/**/}
//////CRUD
/**/getInfo() :{tagName: string; attr: nNullkvObject; instance?: Element; parent?: vElement; children: vDOM_A;}{
        return{
            tagName: this.#tagName,
            attr: this.#attr,
            instance: this.#instance,
            parent: this.#parent,
            children: this.#children
        }
    }
}
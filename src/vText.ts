/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./commons/index";
import vElement from "./vElement";
export default class vText{
    #textContent :string;
    #instance? :Text;
    #parent? :vElement;
    #changed :vTChangeRecord = {};
    constructor(textContent :string, instance? :Text, parent? :vElement){
        if(typeof textContent != "string") utils.generic.EE("?"); //绝不可能走到这里
        this.#textContent = textContent;
        if(instance) this.#instance = instance;
        if(parent) this.#parent = parent;
/**/}
//////CRUD
/**/getInfo() :{textContent: string; instance?: Text; parent? :vElement;}{
        return{
            textContent: this.#textContent,
            instance: this.#instance,
            parent: this.#parent
        }
/**/}
//////API
/**/adopt(){

    }
    abandon(){
        
    }
    parent(){

    }
    separate(){

    }
}
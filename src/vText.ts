/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./commons/index";
import vElement from "./vElement";
export default class vText{
    #textContent :string;
    #instance? :Text;
    //#fID :string;
    constructor(textContent :string, instance? :Text){
        this.#textContent = textContent;
        if(instance){
            this.#instance = instance;
        }
        //this.#fID = utils.generic.randoma2Z(10); //144,555,105,949,057,024了，不会撞上吧？
/**/}
//////CRUD
/**/getInfo() :{textContent: string; instance: Text | undefined;}{
        return{
            textContent: this.#textContent,
            instance: this.#instance
        }
    }
    //__getParent__() :string | undefined{return this.#parentID;}
}
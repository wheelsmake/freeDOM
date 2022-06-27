/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./utils";
import vElement from "./vElement";
export default class FreeDOMCore{
    #rootNode :Element;
    #id :string;
    #key :string;
    #nodeTree :nodeTree;
    #nodeStore :nodeStore = {};
    #alerts = [
        "DO NOT CALL ME FROM OUTSIDE THE FreeDOM, PLUS YOU CANNOT DO ANYTHING WITHOUT SECRET KEY."
    ];
    constructor(rootNode :Element, id :string, key :string){
        this.#rootNode = rootNode;
        this.#id = id;
        this.#key = key;
        this.#nodeTree = utils.parseNode(rootNode) as vElement; //rootNode不可能是文本节点，new做过判断了
    }
    n(){
        
    }
    h(){return this.n();}
    sync() :void{

    }
    rsync() /*:nodeDescription*/{

    }
    d(){

    }
    getID() :string{return this.#id;}
    getRootNode() :Element{return this.#rootNode;}
    __setRootNodeWithKey__(key :string, rootNode :Element) :Element | undefined{
        if(key === this.#key){
            this.#rootNode = rootNode;
            return this.#rootNode;
        }
        else utils.EE(this.#alerts[0]);
    }
    __setIDWithKey__(key :string, id :string) :string | undefined{
        if(key === this.#key){
            this.#id = id;
            return this.#id;
        }
        else utils.EE(this.#alerts[0]);
    }
}
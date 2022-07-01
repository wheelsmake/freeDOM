/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./commons/index";
import vElement from "./vElement";
export default class FreeDOMCore{
    #rootNode :Element;
    #id :string;
    #nodeTree :nodeTree;
    #nodeStore :nodeStore = {};
    #alerts = [
        "DO NOT CALL ME FROM OUTSIDE THE FreeDOM, PLUS YOU CANNOT DO ANYTHING WITHOUT SECRET KEY."
    ];
    constructor(rootNode :Element, id :string){
        this.#rootNode = rootNode;
        this.#id = id;
        //生成根节点vDOM树
        this.#nodeTree = utils.vDOM.parseNode(rootNode) as vElement; //rootNode不可能是文本节点，new做过判断了
/**/}
//////API
/**/m(){

    }
    mount(){}
    r(){}
    render(){}
    um(){

    }
    unmount(){}
    s(){

    }
    sync(){}
    rs(){

    }
/**/rsync(){}
//////CRUD
/**/getID() :string{return this.#id;}
    getRootNode() :Element{return this.#rootNode;}
    __setRootNode__(rootNode :Element) :Element{
        const oldRootNode = this.#rootNode;
        this.#rootNode = rootNode;
        return oldRootNode;
    }
    __setID__(id :string) :string{
        const oldID = this.#id;
        this.#id = id;
        return oldID;
    }
    __getNodeTree__(){return this.#nodeTree;}
}
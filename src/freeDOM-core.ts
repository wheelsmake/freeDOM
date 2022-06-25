import utils from "./utils";
export default class FreeDOMCore{
    #parent :FreeDOM;
    #messages :any[];
    #numeralID :number;
    #rootNode :HTMLElement;
    #id :string;
    #key :string;
    //#nodeStore :nodeDescription[];
    //#nodeTree :nodeDescription;
    #alerts = [
        "DO NOT CALL ME FROM OUTSIDE THE FreeDOM, PLUS YOU CANNOT DO ANYTHING WITHOUT SECRET KEY."
    ];
    constructor(parent :FreeDOM, messages :any[], numeralID :number, rootNode :HTMLElement, id :string, key :string){
        this.#parent = parent;
        this.#messages = messages;
        this.#numeralID = numeralID;
        this.#rootNode = rootNode;
        this.#id = id;
        this.#key = key;
    }
    n(
        tagNameOrArgs :string | anyObject,
        attributes :nNullkvObject,
        parentNodeInfo? :nodeDescription | string | Element,
        childNodes? :nodeDescription[] | string[] | Element[] | Text[]
    ){
        //todo:创建虚拟节点
    }
    createElement(tagNameOrArgs :string | anyObject, attributes :nNullkvObject, parentNodeInfo? :nodeDescription | string | Element, childNodes? :nodeDescription[] | string[] | Element[] | Text[]){
        return this.n(tagNameOrArgs, attributes, parentNodeInfo, childNodes);
    }
    ne(){
        
    }
    createElementFromExistNode(){return this.ne();}
    u(){

    }
    buildElement(){return this.u();}
    getID() :string{return this.#id;}
    getRootNode() :HTMLElement{return this.#rootNode;}
    __setRootNodeWithKey__(key :string, rootNode :HTMLElement) :HTMLElement | undefined{
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
    /*#generateNodeStore = (rootNode :HTMLElement) :nodeDescription[]=>{
        var o :nodeDescription;
        while(true){
            o.id = 
        }
    }
    #generateNodeTree = (rootNode :HTMLElement) :nodeDescription=>{

    }
    #parseNodeTree = (nodeTree :nodeDescription) :nodeDescription[]=>{

    }
    #parseNodeStore = (nodeStore :nodeDescription[]) :nodeDescription=>{

    }*/
}
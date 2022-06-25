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
        var proxyAlerts = [
            "CANNOT CHANGE THE ROOTNODE OBJECT IN THE PROXY.",
            "DONT USE THIS IN THE PROXY IN ORDER TO PREVENT UNKNOWN BUGS."
        ];
        this.#proxy = new Proxy(rootNode, {
            get(rootNode, property, receiver){
                //console.log(rootNode, property, receiver); //succeed:没必要发一堆东西进控制台了
                if(property in rootNode){
                    const fuck_typescript :any = (rootNode as anyObject)[property as string];
                    if(fuck_typescript instanceof Function){ //拦截rootNode的函数
                        return new Proxy(fuck_typescript, {
                            apply(target, thisArg, argArray){
                                //todo:实现拦截！
                                return target.bind(rootNode)(...argArray); //note:暂时不作拦截，结果是真实DOM
                            }
                        });
                    }
                    else return fuck_typescript;
                }
                else return undefined;
            },
            //警告以下操作
            has(rootNode, property){
                console.warn(proxyAlerts[1]);
                return Reflect.has(rootNode, property);
            },
            isExtensible(rootNode){
                console.warn(proxyAlerts[1]);
                return Reflect.isExtensible(rootNode);
            },
            getPrototypeOf(rootNode){
                console.warn(proxyAlerts[1]);
                return Reflect.getPrototypeOf(rootNode);
            },
            ownKeys(rootNode){
                console.warn(proxyAlerts[1]);
                return Reflect.ownKeys(rootNode);
            },
            //拦截以下操作
            setPrototypeOf(rootNode, value){
                console.warn(proxyAlerts[0]);
                return false;
            },
            set(rootNode, property, value, receiver){
                console.warn(proxyAlerts[0]);
                return false;
            },
            defineProperty(rootNode, property, attributes){
                console.warn(proxyAlerts[0]);
                return false;
            },
            deleteProperty(rootNode, property){
                console.warn(proxyAlerts[0]);
                return false;
            },
            preventExtensions(rootNode){
                console.warn(proxyAlerts[0]);
                return false;
            },
            getOwnPropertyDescriptor(rootNode, property){
                console.warn(proxyAlerts[0]);
                return undefined;
            }
            //construct(target, argArray, newTarget){} //note:rootNode不具有[[Construct]]内部方法。https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct
        });
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
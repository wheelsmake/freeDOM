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
        //this.#nodeTree = this.#generateNodeTree(this.#rootNode);
        //this.#nodeStore = this.#parseNodeTree(this.#nodeTree); //parse比generate快一点。
    }
    render(cb :(arg :Document) => any) :void{
        var alerts = [
            "CANNOT CHANGE THE DOCUMENT OBJECT IN THE PROXY.",
            "DONT USE THIS IN THE PROXY IN ORDER TO PREVENT UNKNOWN BUGS."
        ];
        const p = new Proxy(document, {
            get(document, property, receiver){
                //console.log(document, property, receiver); //succeed:没必要发一堆东西进控制台了
                if(property in document){
                    const fuck_typescript :any = (document as anyObject)[property as string];
                    if(fuck_typescript instanceof Function){ //拦截document的函数
                        return new Proxy(fuck_typescript, {
                            apply(target, thisArg, argArray){
                                //todo:实现拦截！
                                return target.bind(document)(...argArray); //note:暂时不作拦截，结果是真实DOM
                            }
                        });
                    }
                    else return fuck_typescript;
                }
                else return undefined;
            },
            //警告以下操作
            has(document, property){
                console.warn(alerts[1]);
                return Reflect.has(document, property);
            },
            isExtensible(document){
                console.warn(alerts[1]);
                return Reflect.isExtensible(document);
            },
            getPrototypeOf(document){
                console.warn(alerts[1]);
                return Reflect.getPrototypeOf(document);
            },
            ownKeys(document){
                console.warn(alerts[1]);
                return Reflect.ownKeys(document);
            },
            //拦截以下操作
            setPrototypeOf(document, value){
                console.warn(alerts[0]);
                return false;
            },
            set(document, property, value, receiver){
                console.warn(alerts[0]);
                return false;
            },
            defineProperty(document, property, attributes){
                console.warn(alerts[0]);
                return false;
            },
            deleteProperty(document, property){
                console.warn(alerts[0]);
                return false;
            },
            preventExtensions(document){
                console.warn(alerts[0]);
                return false;
            },
            getOwnPropertyDescriptor(document, property){
                console.warn(alerts[0]);
                return undefined;
            }
            //construct(target, argArray, newTarget){} //note:document不具有[[Construct]]内部方法。https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct
        });
        cb(p);
    }
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
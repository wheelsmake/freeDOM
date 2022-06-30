/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./commons/index";
import FreeDOMCore from "./freedom-core";
import vElement from "./vElement";
import vText from "./vText";
console.info("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
class FreeDOM{
    #instances :FreeDOMCore[] = [];
    constructor(){
        console.info("creating new FreeDOM instance.");
/**/}
//////作用域CRUD
/**/new(args :scopeManageArgs) :FreeDOMCore | null{
        utils.misc.checkSMArgsnReduce(args);
        args.rootNode = args.rootNode as Element; //hack:ts真无聊
        //排除已经是目前作用域或目前作用域子元素的新增
        if(!utils.element.isInDocument(args.rootNode)){
            console.warn(args.rootNode, " is not in document.");
            return null;
        }
        for(let i = 0; i < this.#instances.length; i++){
            if(utils.element.isDescendant(args.rootNode, this.#instances[i].getRootNode()) || args.rootNode === this.#instances[i].getRootNode()){
                console.warn(args.rootNode, " is already a descendant of a rootNode of an exist scope, thus freeDOM won't add it.");
                return null;
            }
            else if(args.id === this.#instances[i].getID()){
                console.error(args.id, "is duplicated.");
                return null;
            }
            else if(args.rootNode === this.#instances[i].getRootNode()){
                console.error(args.rootNode, "is duplicated.");
                return null;
            }
        }
        //note:不能随便删除作用域实例！！！！！
        const instance = new FreeDOMCore(args.rootNode, args.id);
        this.#instances.push(instance);
        return instance;
    }
    existsID(id :string) :Element | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === id) return this.#instances[i].getRootNode();
        return null;
    }
    existsNode(rootNode :Element) :string | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getRootNode() === rootNode) return this.#instances[i].getID();
        return null;
    }
    updateByID(args :scopeManageArgs) :Element | null{
        utils.misc.checkSMArgsnReduce(args);
        args.rootNode = args.rootNode as Element; //hack:ts真无聊
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === args.id) return this.#instances[i].__setRootNode__(args.rootNode);
        return null;
    }
    updateByNode(args :scopeManageArgs) :string | null{
        utils.misc.checkSMArgsnReduce(args);
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getRootNode() === args.rootNode) return this.#instances[i].__setID__(args.id);
        return null;
    }
    delete(arg :string | Element) :{id :string, rootNode :Element} | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === arg || this.#instances[i].getRootNode() === arg){
            utils.generic.precisePop(this.#instances[i], this.#instances);
            return{
                id: this.#instances[i].getID(),
                rootNode: this.#instances[i].getRootNode()
            }
        }
        return null;
    }
    id(id :string) :FreeDOMCore | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === id) return this.#instances[i];
        return null;
    }
    rootNode(rootNode :Element | string) :FreeDOMCore | null{
        const trueRootNode = utils.misc.reduceToElement(rootNode);
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getRootNode() === trueRootNode) return this.#instances[i];
        return null;
/**/}
//////工具方法
/**/h(tagName :string, attributes :nNullkvObject, children :vDOM_A) :vElement{return utils.vDOM.createVElementFromData(tagName, attributes, children);}
    createNode(tagName :string, attributes :nNullkvObject, children :vDOM_A) :vElement{return utils.vDOM.createVElementFromData(tagName, attributes, children);}
    p(node :Node) :vDOM{return utils.vDOM.parseNode(node)!;}
    parseNode(node :Node) :vDOM{return utils.vDOM.parseNode(node)!;}
    b(sda :anyObject){
        
    }
    buildNode(){}
    d(){

    }
    difu(){}
    e(s :string, scope? :Element | Document) :Node | Node[]{return utils.element.e(s, scope);}
}
utils.generic.constantize(FreeDOM);
(window as any).FreeDOM = FreeDOM;
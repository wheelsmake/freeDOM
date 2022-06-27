/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./utils";
import FreeDOMCore from "./freeDOM-core";
console.warn("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
class FreeDOM{
    #instances :FreeDOMCore[] = [];
    #keys :string[] = [];
    constructor(){
        console.log("creating new FreeDOM instance.");
    }

    new(args :scopeManageArgs) :FreeDOMCore | null{
        utils.checkSMArgsnReduce(args);
        args.rootNode = args.rootNode as Element; //hack:ts真无聊
        //排除已经是目前作用域或目前作用域子元素的新增
        if(!utils.isInDocument(args.rootNode)){
            console.warn(args.rootNode, " is not in document.");
            return null;
        }
        for(let i = 0; i < this.#instances.length; i++) if(utils.isDescendant(args.rootNode, this.#instances[i].getRootNode()) || args.rootNode === this.#instances[i].getRootNode()){
            console.warn(args.rootNode, " is already a descendant of a rootNode of an exist scope, thus freeDOM won't add it.");
            return null;
        }
        //note:不能随便删除作用域实例！！！！！
        const key = utils.randoma2Z029(10);
        this.#keys.push(key);
        const instance = new FreeDOMCore(args.rootNode, args.id, key);
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
        utils.checkSMArgsnReduce(args);
        args.rootNode = args.rootNode as Element; //hack:ts真无聊
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === args.id) this.#instances[i].__setRootNodeWithKey__(this.#keys[i], args.rootNode);
        return null;
    }
    updateByNode(args :scopeManageArgs) :string | null{
        utils.checkSMArgsnReduce(args);
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getRootNode() === args.rootNode) this.#instances[i].__setIDWithKey__(this.#keys[i], args.id);
        return null;
    }
    delete(arg :string | Element) :{id :string, rootNode :Element} | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === arg || this.#instances[i].getRootNode() === arg){
            utils.precisePop(this.#instances[i], this.#instances);
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
        rootNode = utils.reduceToElement(rootNode)! as Element; //hack:ts真无聊
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getRootNode() === rootNode) return this.#instances[i];
        return null;
    }
    e(s :string, scope? :Element | Document) :Node | Node[]{return utils.e(s, scope);}
}
utils.constantize(FreeDOM);
(window as any).FreeDOM = FreeDOM;
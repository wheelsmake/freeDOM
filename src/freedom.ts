/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import FreeDOMCore from "./freeDOM-core";
import utils from "./utils";
interface updateByIDArgs{
    id :string;
    rootNode :HTMLElement | string;
}
interface updateByNodeArgs{
    id :string;
    rootNode :HTMLElement | string;
}
console.warn("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
class FreeDOM{
    #instances :FreeDOMCore[] = [];
    #keys :string[] = [];
    #messages :any[] = [];
    constructor(){
        console.warn("creating new FreeDOM instance.");
    }
    id(id :string) :FreeDOMCore | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === id) return this.#instances[i];
        return null;
    }
    rootNode(rootNode :HTMLElement | string) :FreeDOMCore | null{
        rootNode = utils.parseIDOrString(rootNode);
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getRootNode() === rootNode) return this.#instances[i];
        return null;
    }
    new(rootNode :HTMLElement | string, id :string) :boolean{
        rootNode = utils.parseIDOrString(rootNode);
        //排除已经是目前作用域或目前作用域子元素的新增
        if(!utils.isInDocument(rootNode)){
            console.warn(`${rootNode} is not in document.`);
            return false;
        }
        for(let i = 0; i < this.#instances.length; i++) if(utils.isDescendant(rootNode, this.#instances[i].getRootNode()) || rootNode === this.#instances[i].getRootNode()){
            console.warn(`${rootNode} is already a descendant of a rootNode of an exist scope, thus freeDOM won't add it.`);
            return false;
        }
        //排除原数组中是新增作用域子元素的元素
        for(let i = 0; i < this.#instances.length; i++) if(utils.isDescendant(this.#instances[i].getRootNode(), rootNode)) utils.precisePop(this.#instances[i].getRootNode(), this.#instances);
        const key = utils.randoma2z029(20);
        this.#instances.push(new FreeDOMCore(this, this.#messages, this.#instances.length, rootNode, id, key));
        this.#keys.push(key);
        return true;
    }
    existsID(id :string) :HTMLElement | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === id) return this.#instances[i].getRootNode();
        return null;
    }
    existsNode(rootNode :HTMLElement) :string | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getRootNode() === rootNode) return this.#instances[i].getID();
        return null;
    }
    updateByID(args :updateByIDArgs) :HTMLElement | null{
        args.rootNode = utils.parseIDOrString(args.rootNode);
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === args.id) this.#instances[i].__setRootNodeWithKey__(this.#keys[i], args.rootNode);
        return null;
    }
    updateByNode(args :updateByNodeArgs) :string | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getRootNode() === args.rootNode) this.#instances[i].__setIDWithKey__(this.#keys[i], args.id);
        return null;
    }
    delete(arg :string | HTMLElement) :{id :string, rootNode :HTMLElement} | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === arg || this.#instances[i].getRootNode() === arg){
            utils.precisePop(this.#instances[i], this.#instances);
            return{
                id: this.#instances[i].getID(),
                rootNode: this.#instances[i].getRootNode()
            }
        }
        return null;
    }
    e(s :string, scope? :HTMLElement | Document) :Node | Node[]{return utils.e(s, scope);}
}
utils.constantize(FreeDOM);
(window as any).FreeDOM = FreeDOM;
/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import FreeDOMCore from "./freeDOM-core";
import * as utils from "./utils";
console.warn("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
class FreeDOM{
    #instances :FreeDOMCore[] = [];
    #keys :string[] = [];
    constructor(){
        console.log("creating new FreeDOM instance.");
    }
    id(id :string) :FreeDOMCore | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === id) return this.#instances[i];
        return null;
    }
    rootNode(rootNode :Element | string) :FreeDOMCore | null{
        rootNode = utils.reduceToElement(rootNode);
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getRootNode() === rootNode) return this.#instances[i];
        return null;
    }
    //parseNode(node :Node) :nodeDescription | string{return utils.parseNode(node);}
    new(args :generalArgs) :boolean{
        args.rootNode = utils.reduceToElement(args.rootNode);
        var c = utils.checkNode(args.rootNode);
        if(c != "HTMLElement" && c != "SVGElement") utils.E("rootNode", "HTMLElement");
        //排除已经是目前作用域或目前作用域子元素的新增
        if(!utils.isInDocument(args.rootNode)){
            console.warn(args.rootNode, " is not in document.");
            return false;
        }
        for(let i = 0; i < this.#instances.length; i++) if(utils.isDescendant(args.rootNode, this.#instances[i].getRootNode()) || args.rootNode === this.#instances[i].getRootNode()){
            console.warn(args.rootNode, " is already a descendant of a rootNode of an exist scope, thus freeDOM won't add it.");
            return false;
        }
        //排除原数组中是新增作用域子元素的元素 //note:不能随便删除作用域实例！！！！！
        //for(let i = 0; i < this.#instances.length; i++) if(utils.isDescendant(this.#instances[i].getRootNode(), args.rootNode)) utils.precisePop(this.#instances[i].getRootNode(), this.#instances);
        
        const key = utils.randoma2Z029(10);
        this.#instances.push(new FreeDOMCore(args.rootNode, args.id, key));
        this.#keys.push(key);
        return true;
    }
    existsID(id :string) :Element | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === id) return this.#instances[i].getRootNode();
        return null;
    }
    existsNode(rootNode :Element) :string | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getRootNode() === rootNode) return this.#instances[i].getID();
        return null;
    }
    updateByID(args :generalArgs) :Element | null{
        args.rootNode = utils.reduceToElement(args.rootNode);
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].getID() === args.id) this.#instances[i].__setRootNodeWithKey__(this.#keys[i], args.rootNode);
        return null;
    }
    updateByNode(args :generalArgs) :string | null{
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
    e(s :string, scope? :Element | Document) :Node | Node[]{return utils.e(s, scope);}
}
utils.constantize(FreeDOM);
(window as any).FreeDOM = FreeDOM;
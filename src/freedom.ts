/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import tagNames from "./tagNames";
import FreeDOMCore from "./freeDOM-core";
import utils from "./utils";
interface newArgs{
    id :string;
    rootNode :HTMLElement | string;
}
interface updateByIDArgs{
    id :string;
    rootNode :HTMLElement;
}
interface updateByNodeArgs{
    id :string;
    rootNode :HTMLElement;
}
console.warn("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");
class FreeDOM{
    #instances :freeDOMInstance[] = [];
    #messages :any[] = [];
    constructor(){
        console.warn("creating new FreeDOM instance.");
    }
    new(args :newArgs) :boolean{
        if(typeof args.rootNode == "string") args.rootNode = utils.e(args.rootNode) as HTMLElement; //不管乱写了
        //排除已经是目前作用域或目前作用域子元素的新增
        if(!utils.isInDocument(args.rootNode)){
            console.warn(`${args.rootNode} is not in document.`);
            return false;
        }
        for(let i = 0; i < this.#instances.length; i++) if(utils.isDescendant(args.rootNode, this.#instances[i].rootNode) || args.rootNode === this.#instances[i].rootNode){
            console.warn(`${args.rootNode} is already a descendant of a rootNode of an exist scope, thus freeDOM won't add it.`);
            return false;
        }
        //排除原数组中是新增作用域子元素的元素
        for(let i = 0; i < this.#instances.length; i++) if(utils.isDescendant(this.#instances[i].rootNode, args.rootNode)) utils.precisePop(this.#instances[i].rootNode, this.#instances);
        this.#instances.push({
            instance: new FreeDOMCore(this, this.#messages, this.#instances.length, args.rootNode, args.id), //先求值再push，没问题
            rootNode: args.rootNode,
            id: args.id
        });
        console.log(this.#messages[this.#instances.length - 1]);
        return true;
    }
    existsID(id :string) :HTMLElement | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].id === id) return this.#instances[i].rootNode;
        return null;
    }
    existsNode(rootNode :HTMLElement) :string | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].rootNode === rootNode) return this.#instances[i].id;
        return null;
    }
    updateByID(args :updateByIDArgs) :HTMLElement | null{
        for(let i = 0; i < this.#instances.length; i++) if(this.#instances[i].id === args.id){

        }
        return null;
    }
    updateByNode(args :updateByNodeArgs) :string | null{
        for(let i = 0; i < this.#instances.length; i++){
            
        }
        return null;
    }
    delete(arg :string | HTMLElement) :object | null{
        for(let i = 0; i < this.#instances.length; i++){
            
        }
        return null;
    }
}
utils.constantize(FreeDOM);
(window as any).FreeDOM = FreeDOM;
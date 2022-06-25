﻿/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
export default{
    checkNode(node :Node) :"Text" | "HTMLElement" | "SVGElement" | false{
        if(node instanceof Text) return "Text";
        else if(node instanceof HTMLElement) return "HTMLElement";
        else if(node instanceof SVGElement) return "SVGElement";
        else return false;
    },
    E(argument? :string, type? :string, value? :any) :never{
        if(argument === undefined) throw new Error("An error occured.");
        else throw new Error(`Argument '${argument}' ${type ? `should be a ${type}` : "is invalid"}${value ? `, got ${value}` : ""}.`);
    },
    EE(message :any) :never{throw new Error(message);},
    parseIDOrString(input :HTMLElement | string) :HTMLElement{
        if(typeof input == "string") return this.e(input) as HTMLElement;
        else return input;
    },
    isDescendant(element :HTMLElement, target :HTMLElement) :boolean{
        while(element.tagName != "HTML"){
            element = element.parentNode! as HTMLElement;
            if(element === target) return true; 
        }
        return false;
    },
    randoma2z029(length :number) :string{
        var s :string = "";
            for(let i = 0; i < length; i++){
            let r = Math.floor(Math.random() * 36);
            if(r < 10) s += r;
            else s += String.fromCharCode(r + 87);
        }
        return s;
    },
    e(s :string, scope? :HTMLElement | Document) :Node[] | Node{
        if(scope === undefined || !(scope instanceof HTMLElement)) scope = document;
            let a :NodeList = scope.querySelectorAll(s);
            if(!a.length) return [];
            //note:当一个页面存在相同ID元素时不会走这里，而会返回数组，因为说好了是querySelectorAll了并且本来就不应该有重复ID，不能怪我啊
            if(a.length == 1 && s.match(/^.*#[^\s]*$/)) return a[0];
            else return Array.from(a);
    },
    isInDocument(element :HTMLElement) :boolean{
        return this.isDescendant(element, (this.e("html") as Node[])[0] as HTMLElement);
    },
    precisePop(ele :any, array :any[]) :any[] | null{
        if(array.indexOf(ele) === -1) return null;
        return array.splice(array.indexOf(ele), 1);
    },
    //递归冻结对象
    constantize(obj :anyObject) :void{
        Object.freeze(obj);
        for(let i = 0; i < Object.keys(obj).length; i++) if(typeof obj[Object.keys(obj)[i]] == "object") this.constantize(obj[Object.keys(obj)[i]]);
    }
};
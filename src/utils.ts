/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
export function checkNode(node :Node) :"Text" | "HTMLElement" | "SVGElement" | false{
    if(node instanceof Text) return "Text";
    else if(node instanceof HTMLElement) return "HTMLElement";
    else if(node instanceof SVGElement) return "SVGElement";
    else return false;
}
export function parseNode(node :Node) :nodeDescription | string{
    switch(checkNode(node)){
        case "Text": return (node as Text).textContent || "";
        case "HTMLElement" || "SVGElement":
            var vdom :nodeDescription = {
                tagName: (node as Element).tagName,
                instance: null,
                attributes: getAttr(node),
                childNodes: getChildNodes(node)
            }
            break;
        case false:
            break;
    }
    return ""; //hack:永远不会走到这里，都怪ts
}
export function getAttr(element :Element) :nNullkvObject{
    if(checkNode(element) == "Text") E("element", "Element", element);
}
export function getChildNodes(element :Element) :Array<nodeDescription | string>{

}
export function reduceToElement(input :Element | string) :Element{
    if(typeof input == "string") return e(input) as Element;
    else return input;
}
export function isDescendant(element :Element, target :Element) :boolean{
    while(element.tagName != "HTML"){
        element = element.parentNode! as Element;
        if(element === target) return true; 
    }
    return false;
}
export function randoma2Z(length :number) :string{
    var s :string = "";
    for(let i = 0; i < length; i++){
        let r = Math.floor(Math.random() * 52);
        if(r > 25) s += String.fromCharCode(r + 71);
        else s += String.fromCharCode(r + 65);
    }
    return s;
}
export function randoma2Z029(length :number) :string{
    var s :string = "";
    for(let i = 0; i < length; i++){
        let r = Math.floor(Math.random() * 36);
        if(r < 10) s += r;
        else s += String.fromCharCode(r + 87);
    }
    return s;
}
export function e(s :string, scope? :Element | Document) :Node[] | Node{
    if(scope === undefined || !(scope instanceof Element)) scope = document;
        let a :NodeList = scope.querySelectorAll(s);
        if(!a.length) return [];
        //note:当一个页面存在相同ID元素时不会走这里，而会返回数组，因为说好了是querySelectorAll了并且本来就不应该有重复ID，不能怪我啊
        if(a.length == 1 && s.match(/^.*#[^\s]*$/)) return a[0];
        else return Array.from(a);
}
export function isInDocument(element :Element) :boolean{
    return isDescendant(element, (e("html") as Node[])[0] as Element);
}
export function precisePop(ele :any, array :any[]) :any[] | null{
    if(array.indexOf(ele) === -1) return null;
    return array.splice(array.indexOf(ele), 1);
}
//递归冻结对象
export function constantize(obj :anyObject) :void{
    Object.freeze(obj);
    for(let i = 0; i < Object.keys(obj).length; i++) if(typeof obj[Object.keys(obj)[i]] == "object") constantize(obj[Object.keys(obj)[i]]);
}
export function E(argument? :string, type? :string, value? :any) :never{
    if(argument === undefined) throw new Error("An error occured.");
    else throw new Error(`Argument '${argument}' ${type ? `should be a(an) ${type}` : "is invalid"}${value ? `, got ${value}` : ""}.`);
}
export function EE(message :any) :never{throw new Error(message);}
export function nouse(){
    return 7;
}
/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./index";
export function e(s :string, scope? :Element | Document) :Node[] | Node{
    if(scope === undefined || !(scope instanceof Element)) scope = document;
        let a :NodeList = scope.querySelectorAll(s);
        if(!a.length) return [];
        //note:当一个页面存在相同ID元素时不会走这里，而会返回数组，因为说好了是querySelectorAll了并且本来就不应该有重复ID，不能怪我啊
        if(a.length == 1 && s.match(/^.*#[^\s]*$/)) return a[0];
        else return Array.from(a);
}
export function isDescendant(possibleDescendant :Element, possibleParent :Element) :boolean{
    while(possibleDescendant.tagName != "HTML"){
        possibleDescendant = possibleDescendant.parentNode! as Element;
        if(possibleDescendant === possibleParent) return true; 
    }
    return false;
}
export function isInDocument(element :Element) :boolean{
    return isDescendant(element, (e("html") as Node[])[0] as Element);
}
/**删除 HTML 文档中因缩进而导致的文本，`\n (数个空格)`。
*/
export function removeIndentText(textNode :Text) :void{
    textNode.textContent = textNode.textContent!.replace(/\n\s+/g, "");
}
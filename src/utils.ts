/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
export default (()=>{
    return{
        isDescendant(element :HTMLElement, target :HTMLElement) :boolean{
            while(element.tagName != "HTML"){
                element = element.parentNode! as HTMLElement;
                if(element === target) return true; 
            }
            return false;
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
        }
    }
})();
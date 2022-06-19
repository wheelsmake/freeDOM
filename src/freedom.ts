/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import tagNames from "./tagNames";
import utils from "./utils";
(window as any).freeDOM = (()=>{
    var scopes :DOMScope[] = [];
    function _new(element :HTMLElement) :boolean{
        //排除已经是目前作用域或目前作用域子元素的新增
        if(!utils.isInDocument(element)){
            console.warn(`${element} is not in document.`);
            return false;
        }
        for(let i = 0; i < scopes.length; i++) if(utils.isDescendant(element, scopes[i].element) || element === scopes[i].element){
            console.warn(`${element} is already a descendant of an exist scope, thus freeDOM won't add it.`);
            return false;
        }
        //排除原数组中是新增作用域子元素的元素
        for(let i = 0; i < scopes.length; i++) if(utils.isDescendant(scopes[i].element, element)) utils.precisePop(scopes[i].element, scopes);
        scopes.push({
            element,
            level:1
        });
        return true;
    }
    return{
        new: _new, //new是保留词
    };
})();
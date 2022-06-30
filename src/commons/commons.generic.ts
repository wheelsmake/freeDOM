/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./index";
export function randoma2Z(length :number) :string{ //52
    var s :string = "";
    for(let i = 0; i < length; i++){
        let r = Math.floor(Math.random() * 52);
        if(r > 25) s += String.fromCharCode(r + 71);
        else s += String.fromCharCode(r + 65);
    }
    return s;
}
export function randoma2z029(length :number) :string{ //36
    var s :string = "";
    for(let i = 0; i < length; i++){
        let r = Math.floor(Math.random() * 36);
        if(r < 10) s += r;
        else s += String.fromCharCode(r + 87);
    }
    return s;
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
    else{
        console.error(argument, type, value); //为了拿到真正的value，其他类型toString后啥信息都没了
        throw new Error(`Argument '${argument}' ${type ? `should be a(an) ${type}` : "is invalid"}${value ? `, got ${value}` : ""}.`);
    }
}
export function EE(message :any) :never{throw new Error(message);}
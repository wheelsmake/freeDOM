/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../utils/index";
import * as localUtils from "./utils/index";

//开发模式记录
console.info("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");

//事件捕获相关hack变量
const instances :FreeDOMCore[] = [], eventStore :eventStore = new Map(); //Map浏览器支持率＞96% on 2022.7.23
export {instances, eventStore}; //暴露这两个变量给utils

//hack addEventListener
//不能用window.onload，实际上它是最迟执行的
const Ep = Element.prototype, Ep_A = Ep as anyObject;

Ep_A.oddEventListener = Ep.addEventListener;
Ep.addEventListener = new Proxy(Ep_A.oddEventListener, {
    apply(
        oEL :Function,
        callerElement :Element,
        argArray :[string, Function, boolean | AddEventListenerOptions | undefined, boolean | undefined]
        //第四个参数兼容wantUntrusted
    ){
        //note:不需要检查type是否合法，因为存在自定义事件的可能
        //note:选择记录所有DOM的所有事件，其实也不大
        console.log(callerElement, argArray);
        const [eventName, handler, arg1, arg2] = argArray;
        if(eventStore.has(callerElement)){ //本元素已被记录
            const record = eventStore.get(callerElement)!;
            if(record[eventName] === undefined) record[eventName] = [{ //本元素未有该事件，新建数组
                handler, arg1, arg2
            }];
            else{  //本元素已有该事件
                /* note:排除会被浏览器丢弃的调用。
                 * 浏览器将type、handler和useCapture完全一致listener认为是同一个，不管其他参数是否相同。
                 * 所以我们需要在这里比较handler和useCapture是否一致，如果没找到完全一致的listener就需要存新的listener
                 * 否则浏览器不会更改已有listener，我们也不会对eventStore作更改
                */
                var isDuplicated = false; //为了能正常return的flag
                const useCapture = arg1 !== undefined ? typeof arg1 == "boolean" ? arg1 : arg1.capture || false : false; //适应调用参数，https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#syntax
                console.log(useCapture);
                for(let i = 0; i < record[eventName].length; i++){
                    const thisArg1 = record[eventName][i].arg1,
                          thisUseCapture = thisArg1 !== undefined ? typeof thisArg1 == "boolean" ? thisArg1 : thisArg1.capture || false : false; //适应调用参数L43
                    if(handler === record[eventName][i].handler && useCapture === thisUseCapture){ //找到了所谓完全一致的listener，走吧
                        isDuplicated = true;
                        break;
                    }
                }
                if(!isDuplicated) record[eventName].push({
                    handler, arg1, arg2
                });
            }
            eventStore.set(callerElement, record);
        }
        else eventStore.set(callerElement, { //本元素未被记录
            [eventName]: [{
                handler, arg1, arg2
            }]
        });
        //todo:对于once:true的事件需要在执行一次后删除，做法：传入一个hook过的函数
        if(typeof arg1 == "object" && arg1["once"] === true){
            
        }
        return Reflect.apply(oEL, callerElement, argArray);
    }
});

Ep_A.oemoveEventListener = Ep.removeEventListener;
Ep.removeEventListener = new Proxy(Ep_A.oemoveEventListener, {
    apply(
        omEL :Function,
        callerElement :Element,
        argArray :[string, Function, boolean | AddEventListenerOptions | undefined]
    ){
        console.log(callerElement, argArray);
        const [eventName, handler, arg1] = argArray;
        if(eventStore.has(callerElement)){ //本元素已被记录
            const record = eventStore.get(callerElement)!;
            if(record[eventName] !== undefined){ //本元素已有该类型事件
                /* note:识别会被浏览器移除的listener。
                 * 对于大多数浏览器来说，会检查remove的type、handler和useCapture是否一致
                 * 我们也是这样
                 * 对于其他浏览器暂不做支持，因为需要查很多资料，留个todo:吧
                 * https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener#:~:text=%E5%8F%AA%E6%9C%89%20capture%20%E9%85%8D%E7%BD%AE%E5%BD%B1%E5%93%8D%20removeEventListener().
                */
                const useCapture = arg1 !== undefined ? typeof arg1 == "boolean" ? arg1 : arg1.capture || false : false; //适应调用参数，https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#syntax
                for(let i = 0; i < record[eventName].length; i++){
                    const thisArg1 = record[eventName][i].arg1,
                          thisUseCapture = thisArg1 !== undefined ? typeof thisArg1 == "boolean" ? thisArg1 : thisArg1.capture || false : false; //适应调用参数
                    if(handler === record[eventName][i].handler && useCapture === thisUseCapture) utils.generic.precisePop(record[eventName][i], record[eventName]); //存在对应handler，删除
                }
            }
            //else 本类型事件未被记录，不管了
            eventStore.set(callerElement, record);
        }
        //else 本元素未被记录，不知道调用者在干嘛
        return Reflect.apply(omEL, callerElement, argArray);
    }
});

//全局mutationobserver
const observer = new MutationObserver(observerCB);
observer.observe(document, {
    subtree: true,
    childList: true
});
function observerCB(mutations :MutationRecord[]){
    console.log(mutations);
}

//主类
class FreeDOMCore{
    #rootNode :Element;
    #options? :fdOptions;
    #vDOM? :vElement; //hack:ts真无聊
    constructor(rootNode :Elementy, options? :fdOptions){
        //开发模式记录
        console.info("creating new FreeDOM instance with rootNode", rootNode, "and options", options);

        //输入rootNode
        rootNode = localUtils.misc.reduceToElement(rootNode);
        this.#rootNode = rootNode;

        //获取vDOM并检测其合法性
        const tree = localUtils.vDOM.parseNode(rootNode);
        if(typeof tree == "string" || tree === null) utils.generic.E("rootNode", "Element | string", rootNode, "rootNode should be an Element or a #id selector");
        else this.#vDOM = tree;
        
        //输入options
        this.#options = options;

        //记录实例，用于事件捕获
        instances.push(this);
    }
    //属性获取
    get rootNode() :Element{return this.#rootNode;}
    get options() :fdOptions | undefined{return this.#options;}
    //vDOM API
    m(){

    }
    mount(){

    }
    u(){

    }
    unmount(){

    }
    s(){

    }
    sync(){

    }
    r(){

    }
    rsync(){
        
    }
}

//主对象
const FreeDOM = {
    //创建实例
    new(rootNode: Elementy, options?: fdOptions | undefined) :FreeDOMCore{
        return new FreeDOMCore(rootNode, options);
    },
    //信息获取
    get instances(){
        /* 不能将instances直接传出！
         * 第一：会暴露内部变量的地址；
         * ???:第二，会奇怪地导致instances被自动取消可扩展性（Object.isExtensible(instances) === false），进而导致创建新实例无法记录
         * 所以我们选择复制一份
         */
        return [...instances];
    },
    get eventStore(){
        //问题同上第一条
        return new Map(eventStore);
    },
    //创建vDOM
    c(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    },
    createNode(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    },
    h(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs, children);
    },
    //结束 创建vDOM
    //转换DOM
    p(node :Node) :vElement | string | null{
        return localUtils.vDOM.parseNode(node);
    },
    parseNode(node :Node) :vElement | string | null{
        return localUtils.vDOM.parseNode(node);
    },
    b(vElement :vElement | string) :instance{
        return localUtils.vDOM.buildNode(vElement);
    },
    buildNode(vElement :vElement | string) :instance{
        return localUtils.vDOM.buildNode(vElement);
    },
    //结束 转换vDOM
    //工具方法
    e(s :string, scope? :Element | Document) :Node | Node[]{return utils.element.e(s, scope);},
}

//对象导出
utils.generic.constantize(FreeDOM);
Object.defineProperty(window, "FreeDOM", {
    configurable: false,
    writable: false,
    enumerable: true,
    value: FreeDOM
});
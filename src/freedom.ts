/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import * as utils from "../../utils/index";
import * as localUtils from "./utils/index";

//开发模式记录
console.info("freeDOM ©LJM12914. https://github.com/openink/freeDOM \r\nYou are using an unminified version of freeDOM, which is not suitable for production use.");

//事件捕获相关hack变量
const instances :ScopeInstance[] = [], eventStore :eventStore = new Map(); //Map浏览器支持率＞96% on 2022.7.23
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
        //note:不需要检查type是否合法，因为存在自定义事件的可能；选择记录所有HTML DOM的所有事件，其实也不多
        //console.log(callerElement, argArray);
        const [eventName, handler, arg1, arg2] = argArray,
              record = eventStore.get(callerElement),
              useCapture = arg1 !== undefined ? typeof arg1 == "boolean" ? arg1 : arg1.capture || false : false; //适应调用参数https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#syntax
        var processedHandler :Function;
        if(typeof arg1 == "object" && arg1["once"] === true){ //处理once情况，调用后立即删除
            processedHandler = new Proxy(handler, {
                apply(target, thisArg, argArray){
                    //console.log(processedHandler);
                    //不知道record会不会保存之前的值，我们还是再获取一遍吧
                    const recordValue = eventStore.get(callerElement)![eventName]; //既然运行了这个方法就不可能是undefined
                    //还是得找才能删除
                    for(let i = 0; i < recordValue.length; i++){
                        const thisArg1 = recordValue[i].arg1,
                              thisUseCapture = thisArg1 !== undefined ? typeof thisArg1 == "boolean" ? thisArg1 : thisArg1.capture || false : false; //适应调用参数L32
                        if(recordValue[i].handler === processedHandler && thisUseCapture === useCapture){
                            utils.generic.precisePop(recordValue[i], recordValue);
                        }
                    }
                    return Reflect.apply(target, thisArg, argArray);
                }
            });
        }
        else processedHandler = handler;
        if(record !== undefined){ //本元素已被记录
            if(record[eventName] === undefined){
                record[eventName] = [{ //本元素未有该事件，新建数组
                    handler: processedHandler, arg1, arg2
                }];
                argArray[1] = processedHandler; //同L80
            }
            else{  //本元素已有该事件
                /* note:排除会被浏览器丢弃的调用。
                 * 浏览器将type、handler和useCapture完全一致listener认为是同一个，不管其他参数是否相同。
                 * 所以我们需要在这里比较handler和useCapture是否一致，如果没找到完全一致的listener就需要存新的listener
                 * 否则浏览器不会更改已有listener，我们也不会对eventStore作更改
                */
                var isDuplicated = false; //为了能正常return的flag
                //console.log(useCapture);
                for(let i = 0; i < record[eventName].length; i++){
                    const thisArg1 = record[eventName][i].arg1,
                          thisUseCapture = thisArg1 !== undefined ? typeof thisArg1 == "boolean" ? thisArg1 : thisArg1.capture || false : false; //适应调用参数L32
                    if(handler === record[eventName][i].handler && useCapture === thisUseCapture){ //找到了所谓完全一致的listener，走吧
                        isDuplicated = true;
                        break;
                    }
                }
                if(!isDuplicated){
                    record[eventName].push({
                        handler: processedHandler, arg1, arg2
                    });
                    //这个不能放到最后，因为如果浏览器没有添加的话就会多出一个，必须在确保浏览器会添加这个事件后再修改参数
                    argArray[1] = processedHandler;
                }
            }
            eventStore.set(callerElement, record);
        }
        else{
            eventStore.set(callerElement, { //本元素未被记录
                [eventName]: [{
                    handler: processedHandler, arg1, arg2
                }]
            });
            argArray[1] = processedHandler; //同L80
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
        //console.log(callerElement, argArray);
        const [eventName, handler, arg1] = argArray;
        if(eventStore.has(callerElement)){ //本元素已被记录
            const record = eventStore.get(callerElement)!,
                  useCapture = arg1 !== undefined ? typeof arg1 == "boolean" ? arg1 : arg1.capture || false : false; //适应调用参数;
            if(record[eventName] !== undefined){ //本元素已有该类型事件
                /* note:识别真正会被浏览器移除的listener。
                 * 对于大多数浏览器来说，会检查remove的type、handler和useCapture是否一致
                 * 我们也是这样
                 * 对于其他浏览器暂不做支持，因为需要查很多资料，留个todo:吧
                 * https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener#:~:text=%E5%8F%AA%E6%9C%89%20capture%20%E9%85%8D%E7%BD%AE%E5%BD%B1%E5%93%8D%20removeEventListener().
                */
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

//主类
class ScopeInstance{
    #rootNode :Element;
    #options? :fdOptions;
    #vDOM? :vElement;
    #observer :MutationObserver;
    #searchStore :searchStore = [[],[],[]];
    constructor(rootNode :Elementy, options? :fdOptions){
        //开发模式记录
        console.info("creating new freeDOM instance with rootNode", rootNode, "and options", options);

        //输入rootNode
        rootNode = localUtils.misc.reduceToElement(rootNode);
        this.#rootNode = rootNode;

        //获取vDOM并检测其合法性
        const tree = localUtils.vDOM.parseNode(rootNode);
        if(localUtils.vDOM.misc.isVText(tree) || tree === null) utils.generic.E("rootNode", "Elementy", rootNode, "rootNode should be an Element or a #id selector");
        else this.#vDOM = tree as vElement; //ts真无聊
        
        //输入options
        this.#options = options;

        //初始化DOM监测器
        this.#observer = new MutationObserver(this.#observerCB);
        this.#observer.observe(this.#rootNode, {
            childList: true,
            subtree: true,
            characterData: true,
            characterDataOldValue: true,
            attributes: true,
            attributeOldValue: true
        });

        //记录实例
        instances.push(this);
    }
    //DOM监测回调
    #observerCB(mutations :MutationRecord[]) :void{
        for(let i = 0; i < mutations.length; i++){

        }
    }
    //属性获取note:get访问器返回值必须可以赋给set访问器
    get rootNode() :Element{return this.#rootNode;}
    get options() :fdOptions | undefined{return this.#options;}
    get vDOM() :vElement | undefined{return this.#vDOM;}
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
    new(rootNode: Elementy, options?: fdOptions) :ScopeInstance{
        return new ScopeInstance(rootNode, options);
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
//vDOM创建
    c(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs || null, null, children || null, null);
    },
    createVElement(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs || null, null, children || null, null);
    },
    h(tagName :string, attrs? :SSkvObject | null, children? :childrenArray) :vElement{
        return localUtils.vDOM.createVElement(tagName, attrs || null, null, children || null, null);
    },
    t(text :string) :vText{
        if(text === null) utils.generic.E("text", "string", text);
        return localUtils.vDOM.createVText(text, null)!;
    },
    createVText(text :string) :vText{
        if(text === null) utils.generic.E("text", "string", text);
        return localUtils.vDOM.createVText(text, null)!;
    },
//vDOM与DOM的转换
    p(node :Node) :vDOM | null{
        return localUtils.vDOM.parseNode(node);
    },
    parseNode(node :Node) :vDOM | null{
        return localUtils.vDOM.parseNode(node);
    },
    b(vElement :vDOM) :instance{
        return localUtils.vDOM.buildNode(vElement);
    },
    buildNode(vElement :vDOM) :instance{
        return localUtils.vDOM.buildNode(vElement);
    },
//vDOM对比
    d(){
        
    },
    diff(){

    },
//工具方法
    e(s :string, scope? :Element | Document) :Node | Node[]{return utils.element.e(s, scope);},
}

//对象导出
utils.generic.constantize(FreeDOM);
export default FreeDOM;
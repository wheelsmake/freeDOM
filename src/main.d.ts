/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/

/*通用缩写类型*/
type anyObject = Record<string, any>;
type kvObject = Record<string, string | undefined | null>;
type SSkvObject = Record<string, string>;

/*缩写类型*/
type Elementy = Element | string;
type instance = Element | Text;
type vDOM = vElement | string;
type childrenArray = (string | vElement)[];

/*参数类型*/
interface fdOptions{
	ignoreNLIText :boolean;
}

/*定义类型*/
interface vElement{
    id :string | null;
    tagName :string;
    attrs :SSkvObject | null;
    children :childrenArray | null;
    instance :Element | null;
}
type eventStore = Map<Element, Record<string, [{
    handler: Function,
    arg1: boolean | AddEventListenerOptions | undefined,
    arg2: boolean | undefined
}]>>;
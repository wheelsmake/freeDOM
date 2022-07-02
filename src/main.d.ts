/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
type anyObject = Record<string, any>;
type kvObject = Record<string, string | undefined | null>;
type SSkvObject = Record<string, string>;
type instance = Element | Text;
type childrenArray = Array<string | vElement>;
interface scopeManageArgs{
    id :string;
    rootNode :Element | string;
}
interface vElement{
    tagName :string;
    attrs :nNullkvObject;
    children :children;
    instance? :Element;
}
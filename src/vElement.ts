/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./utils";
import vText from "./vText";
interface vElementConstructArgs{
    tagName :string;
    instance :Element | null;
    attributes :nNullkvObject;
    parentID? :string;
    childIDs? :string[];
    children :Array<vElement | vText>;
}
export default class vElement{
    fID :string;
    tagName :string;
    instance :Element | null;
    attributes :nNullkvObject;
    parentID? :string;
    childIDs? :string[];
    children :Array<vElement | vText>;
    constructor(args :vElementConstructArgs){
        this.tagName = args.tagName;
        this.instance = args.instance;
        this.attributes = args.attributes;
        this.parentID = args.parentID;
        this.children = args.children;
    }
}
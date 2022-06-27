/* freeDOM
 * ©2022 LJM12914. https://github.com/openink/freeDOM
 * Licensed under MIT License. https://github.com/openink/freeDOM/blob/main/LICENSE
*/
import * as utils from "./utils";
interface vTextConstructArgs{
    instance :Text | null;
    parentID? :string;
}
export default class vText{
    fID :string;
    instance :Text | null;
    parentID? :string;
    constructor(args :vTextConstructArgs){
        this.instance = args.instance;
        this.parentID = args.parentID;
    }
}
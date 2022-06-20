export default class{
    #parent :FreeDOM;
    #messages :any[];
    #numeralID :number;
    #rootNode :HTMLElement;
    #id :string;
    constructor(parent :FreeDOM, messages :any[], numeralID :number, rootNode :HTMLElement, id :string){
        this.#parent = parent;
        this.#messages = messages;
        this.#numeralID = numeralID;
        this.#rootNode = rootNode;
        this.#id = id;
    }
}
import vElement from "./vElement";
export default class FreeDOMCore {
    #private;
    constructor(rootNode: Element, id: string);
    m(): void;
    mount(): void;
    r(): void;
    render(): void;
    um(): void;
    unmount(): void;
    s(): void;
    sync(): void;
    rs(): void;
    rsync(): void;
    getID(): string;
    getRootNode(): Element;
    __setRootNode__(rootNode: Element): Element;
    __setID__(id: string): string;
    __getNodeTree__(): vElement;
}
//# sourceMappingURL=freedom-core.d.ts.map
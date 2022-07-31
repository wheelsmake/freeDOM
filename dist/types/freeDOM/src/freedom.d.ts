declare const instances: ScopeInstance[], eventStore: eventStore;
export { instances, eventStore };
declare class ScopeInstance {
    #private;
    constructor(rootNode: Elementy, options?: fdOptions);
    get rootNode(): Element;
    get options(): fdOptions | undefined;
    get vDOM(): vElement | undefined;
    m(): void;
    mount(): void;
    u(): void;
    unmount(): void;
    s(): void;
    sync(): void;
    r(): void;
    rsync(): void;
}
declare const FreeDOM: {
    new(rootNode: Elementy, options?: fdOptions | undefined): ScopeInstance;
    readonly instances: ScopeInstance[];
    readonly eventStore: Map<Element, eventRecord>;
    c(tagName: string, attrs?: SSkvObject | null, children?: childrenArray): vElement;
    createVElement(tagName: string, attrs?: SSkvObject | null, children?: childrenArray): vElement;
    h(tagName: string, attrs?: SSkvObject | null, children?: childrenArray): vElement;
    t(text: string): vText;
    createVText(text: string): vText;
    p(node: Node): vDOM | null;
    parseNode(node: Node): vDOM | null;
    b(vElement: vDOM): instance;
    buildNode(vElement: vDOM): instance;
    u(vDOM: vDOM): vDOM;
    unlink(vDOM: vDOM): vDOM;
    e(s: string, scope?: Element | Document): Node | Node[];
};
export default FreeDOM;
//# sourceMappingURL=freedom.d.ts.map
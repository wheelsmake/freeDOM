declare const instances: ScopeInstance[], eventStore: eventStore;
export { instances, eventStore };
declare class ScopeInstance {
    #private;
    constructor(rootNode: Elementy, options?: fdOptions);
    get rootNode(): Element;
    get options(): fdOptions | undefined;
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
    c(tagName: string, attrs?: SSkvObject | null, events?: eventRecord | null, children?: childrenArray): vElement | null;
    createNode(tagName: string, attrs?: SSkvObject | null, children?: childrenArray): vElement | null;
    h(tagName: string, attrs?: SSkvObject | null, children?: childrenArray): vElement | null;
    p(node: Node): vDOM | null;
    parseNode(node: Node): vDOM | null;
    b(vElement: vDOM): instance;
    buildNode(vElement: vDOM): instance;
    e(s: string, scope?: Element | Document): Node | Node[];
};
export default FreeDOM;
//# sourceMappingURL=freedom.d.ts.map
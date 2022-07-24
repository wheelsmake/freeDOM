declare const instances: FreeDOMCore[], eventStore: eventStore;
export { instances, eventStore };
declare class FreeDOMCore {
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
//# sourceMappingURL=freedom.d.ts.map
export * as misc from "./vdom.misc";
export * as get from "./vdom.get";
export * as build from "./vdom.build";
export declare function createVElement(tagName: string, attrs: SSkvObject | null, events: eventRecord | null, children: childrenArray | null, instance: Element | null): vElement | null;
export declare function createVText(text: string | null, instance: Text | null): vText | null;
export declare function parseNode(node: Node): vDOM | null;
export declare function buildNode(vDOM: vDOM): instance;
//# sourceMappingURL=vdom.d.ts.map
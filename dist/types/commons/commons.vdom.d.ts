import vElement from "../vElement";
import vText from "../vText";
export declare function testNodeType(node: Node): "Text" | "Element" | false;
export declare function createVElementFromData(tagName: string, attributes: nNullkvObject, children: vDOM_A): vElement;
export declare function createVTextFromData(textContent: string): vText;
export declare function parseNode(node: Node): vDOM | undefined;
export declare function extractAttr(element: Element): nNullkvObject;
export declare function getChildren(element: Element): vDOM_A;
//# sourceMappingURL=commons.vdom.d.ts.map
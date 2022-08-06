/* freeDOM
 * ©2022 LJM12914. https://github.com/wheelsmake/freeDOM
 * Licensed under MIT License. https://github.com/wheelsmake/freeDOM/blob/main/LICENSE
*/
import FreeDOM from "./freedom";
//fixed:将freeDOM当作模块使用的时候不需要将它弄到全局作用域，所以将这个东西抽出来了
Object.defineProperty(window, "FreeDOM", {
    configurable: false,
    writable: false,
    enumerable: true,
    value: FreeDOM
});
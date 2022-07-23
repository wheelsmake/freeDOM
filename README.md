# freeDOM
虚拟 DOM 实现库。

## 没有的功能

1. 不支持 shadow DOM。在含有 shadow DOM 的页面上会出现未知错误。//todo

# 定义

虚拟 DOM 节点（简称 vDOM）：虚拟 DOM 结构的最小单元，在程序中叫 `vElement`。

```typescript
interface vElement{
    id :string | null;
    tagName :string;
    attrs :Record<string, string> | null;
    children :(string | vElement)[] | null;
    instance :Element | null;
}
```

vDOM 树（`nodeTree`）：由嵌套 vDOM 组成的对象。嵌套区域为 `children`。

```typescript
//代码中实际上不存在nodeTree类型，因为vDOM树的根节点类型还是vElement
type nodeTree = vElement;
```

# 开始使用

实例化。

```typescript
const freeDOM = new FreeDOM(rootNode :Element | string, options? :fdOptions) :FreeDOM;
```

|    属性    |               描述                |
| :--------: | :-------------------------------: |
| `rootNode` | 根节点，该实例在 DOM 树中的作用域 |
| `options`  |             配置参数              |

```typescript
interface fdOptions{
	ignoreNLIText :boolean;
}
```

后文默认使用名为 `freeDOM` 的实例。

# 特性

1. freeDOM 针对日常 HTML 的书写存在换行缩进（`/\n\s+/`）的空白字符会被浏览器识别为合法文本节点的问题，**在创建实例时会自动将根节点子树上所有的此类文本进行处理**。虽然 freeDOM 在处理上已经比较智能，但如果确实有这样的排版需求，请在 [`options`](#开始使用) 中添加 `ignoreNLIText` 选项为 `true`。

2. freeDOM 不需要扩展任何语言的语法，但由于浏览器不对页面加载的 JavaScript 暴露元素的事件信息，freeDOM 无法获取元素已设置的事件。因此 freeDOM 使用了修改 `Element.prototype.addEventListener()` 的方法来达到监控元素的事件设置。所以，**请务必只使用 `element.addEvenetListener()` 为元素添加事件**，并且添加事件的时机必须在其 freeDOM 实例创建**后**。如果仍要使用原先的方法（强烈不建议），可使用 `Element.oddEventListener()`。

   ```html
   <script src="freedom.js"></script><!--建议在<head>元素中导入freedom-->
   <script>
       var freeDOM = new FreeDOM("#el");
       el.addEventListener( //一个Proxy对象
           ...
       );
   </script>
   ```

# API

## `createNode()`（`c()`）

从参数创建 vDOM。

```typescript
freeDOM.c(tagName :string, attr? :Record<string, string> | null, children? :(string | vElement)[]) :vElement;
```

|    属性    |    描述    |
| :--------: | :--------: |
| `tagName`  |   标签名   |
|   `attr`   | 属性和事件 |
| `children` | 子节点数组 |

为了兼容，这个玩意也同时叫做 `createElement()`、`createVElement()`、`h()`、`createVNode()`、`createNodeDescription()`。

为了合乎 JSX 编译的标准，在不需要传入 `attr` 参数时可以使用 `null` 占位；并且 `children` 参数是可选的。

## `parseNode()`（`p()`）

将 DOM 转换为 vDOM。

```typescript
freeDOM.p(node :Node) :vElement | string | null;
```

|  属性  |   描述   |
| :----: | :------: |
| `node` | DOM 节点 |

如果传入的节点是文本节点，那么该方法会返回其文本内容或 `null`（当文本节点完全是换行缩进时）。

## `buildNode()`（`b()`）

将 vDOM 转换为 DOM。

```typescript
freeDOM.b(vElement :vElement | string) :instance;
```

|    属性    | 描述 |
| :--------: | :--: |
| `vElement` | vDOM |

如果传入的不是 vDOM，将会引发错误。

## `sync()`（`s()`）

将 vDOM 树同步至 DOM 树。没错，**需要开发者主动同步**，freeDOM 不会自动同步，目的是让开发者自己决定最终渲染的时机，以达到最佳性能，避免重复渲染。当然你也可以直接写 `requestAnimationFrame()` 来调用这个东西。

## `rsync()`（`r()`）

将真实 DOM 树同步至 vDOM 树，通常用于处理用户输入。



# 工具方法

## e

> 开发者拥有选择 DOM 的权利。

```typescript
freeDOM.e(s :string, scope? :Element | Document) :Node | Node[];
```

|  属性   |                     描述                      |
| :-----: | :-------------------------------------------: |
|   `s`   |                  css 选择器                   |
| `scope` | `querySelector` 的作用域，不填默认 `document` |

仅当传入选择器的最终选择器为 ID 选择器（即 `#` ）且获取到元素时返回 `Node` 类型单个元素，否则返回  `Node[]` 类型。

# vDOM API

## `adopt()`



## `parent()`



# 不应使用的 API

无论在任何地方，以双下划线 `__` 作为开头和结尾的方法都不应调用。调用它们造成的问题均不作讨论或修复。

# 其他

## 为 freeDOM 的开发搭建开发环境

```shell
npm install -D typescript ts-loader webpack webpack-cli terser-webpack-plugin
```

```shell
tsc -init
```

## 搭建基于 freeDOM 的开发环境

不需要搭建，随时随地开发 :-)

如果需要使用 `jsx` 之类的东西当然也可以自己加。`jsx` 的映射方法为 `freeDOM.h()` / `freeDOM.createNode()`（记得要改实例名称！）。

## 版权声明

本软件以 MIT License 协议开源。

©2020-2022 LJM12914

## 互动

- 欢迎提出issue，但请保持冷静的态度和对事不对人的基本道德准则。
- 请不要在未与我沟通的情况下发起PR。
- 随便 fork。

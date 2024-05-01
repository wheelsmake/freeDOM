# freeDOM

## 注意：本仓库为临时公开，公开目的仅限于作为林峻茗转专业的支持材料。公开期内对仓库的一切修改都为临时修改，将会在公开期结束后完全回退。

虚拟 DOM 实现库。

## 没有的功能

1. 不支持 shadow DOM。在含有 shadow DOM 的页面上会出现未知错误。//todo

# 定义

vDOM：虚拟 DOM 结构的最小单元，叫 `vElement`。

```typescript
interface vElement{
    id :string;
    instance :Element | null;
    tagName :string;
    attrs :SSkvObject | null;
    events :eventRecord | null;
    children :childrenArray | null;
}
```

vDOM 树：由嵌套 vDOM 组成的对象。嵌套区域为 `children`。

虚拟文本节点：叫 `vText`。

```typescript
interface vText{
    id :string;
    instance :Text | null;
    text :string;
}
```

以下代码使用了 [`main.d.ts`](freeDOM/blob/main/src/main.d.ts) 文件中的定义类型。建议同时打开该文件以获得更佳的理解。

# 开始使用

实例化。

```typescript
const freeDOM = FreeDOM.new(rootNode :Elementy, options? :fdOptions) :ScopeInstance;
```

|    属性    |               描述                |
| :--------: | :-------------------------------: |
| `rootNode` | 根节点，该实例在 DOM 树中的作用域 |
| `options`  |             配置参数              |

后文默认使用名为 `freeDOM` 的实例。注意区分大小写。

# 特性

## 被动式 DOM 管理

freeDOM 不会将实例的 vDOM 与 DOM 状态保持一致，也完全不确定 vDOM 和 DOM 是否一致——直到开发者调用 `sync()` 将 vDOM 状态覆盖至 DOM，或 `rsync()` 将 DOM 状态覆盖至 vDOM。

freeDOM 无法直接「融合」 DOM 和 vDOM，但通过 `FreeDOM.buildNode()` + `FreeDOM.diff()` + `mount()` 可以间接实现。不建议这样做，因为大多数因为不知道用户对 DOM 进行了什么操作以至于需要「融合」DOM 和 vDOM 的场景都可以通过向 `sync()` 或 `rsync()` 传入作用域参数来解决。

## 垃圾文本节点处理

freeDOM 针对日常 HTML 的书写存在换行缩进（`/\n\s*/`）的空白字符会被浏览器识别为合法文本节点的问题，**在创建实例时会自动将根节点子树上所有的此类文本进行处理**。

## 事件 hack

freeDOM 不需要扩展任何语言的语法，但由于浏览器不对页面加载的 JavaScript 暴露元素的事件信息，freeDOM 无法获取元素已设置的事件。因此 freeDOM 使用了修改 `Element.addEventListener()` 的方法来监控元素的事件设置。

如果需要让 freeDOM 精确重建节点的事件数据，**请务必只使用 `element.addEventListener()` 为元素添加事件**，不要使用 `on*` 属性；并且务必最先在页面中导入 freeDOM。如果要绕开 freeDOM 的监测，可使用 `Element.oddEventListener()`。

同时也修改了 `Element.removeEventListener()` 来接收删除信息，可用 `Element.oemoveEventListener()` 绕开。

```html
<script src="freedom.js"></script>
<script>
    var freeDOM = new FreeDOM("#el");
    el.addEventListener( //一个Proxy对象
        ...
    );
</script>
```

- 游离态 vDOM 中的·`events` 字段是创建时从 freeDOM 的事件存储 `eventStore` 中获取的元素**当时的事件监听器**。vDOM 保存的是「快照化」的元素。
- 对于 `once:true` 的事件监听器（一次性），freeDOM 采取了修改传入函数为一个 `Proxy` 的方式来正确地在事件触发并被浏览器删除后同步删除 `eventStore` 中的记录。这对事件本身的执行并无影响。

# 通用 API

通用 API 不针对某个特定的 DOM，使用全局作用域 `FreeDOM` 调用。

## `createVElement()`（`c()`）

从参数创建 vElement。

```typescript
FreeDOM.c(tagName :string, attr? :SSkvObject | null, children? :childrenArray) :vElement;
```

|    属性    |    描述    |
| :--------: | :--------: |
| `tagName`  |   标签名   |
|   `attr`   | 属性和事件 |
| `children` | 子节点数组 |

为了兼容，这个玩意也同时叫做 `h()`。

为了合乎 JSX 编译的标准，在不需要传入 `attr` 参数时可以使用 `null` 占位；并且 `children` 参数是可选的。

## `createVText()`（`t()`）

从参数创建 vText。

```typescript
FreeDOM.t(text :string) :vText;
```

|  属性  |       描述       |
| :----: | :--------------: |
| `text` | 文本节点内容数据 |

## `parseNode()`（`p()`）

将 DOM 转换为 vDOM。

```typescript
FreeDOM.p(node :Node) :vDOM | null;
```

|  属性  |   描述   |
| :----: | :------: |
| `node` | DOM 节点 |

如果传入的节点是文本节点，那么该方法会返回其文本内容或 `null`（当文本节点完全符合 `/\n\s*/` 时）。

## `buildNode()`（`b()`）

将 vDOM 转换为 DOM。

```typescript
FreeDOM.b(vDOM :vDOM) :instance;
```

|  属性  | 描述 |
| :----: | :--: |
| `vDOM` | vDOM |

如果传入的不是 vDOM，将会引发错误。

## `diff()`（`d()`）

对比两个 vDOM，得出最简单的将第一个转换为第二个的信息。

在许多框架中，这个过程被融合在 `patch` 中——即生成转换方案后立即应用；但是 freeDOM 采用了交给开发者自主选择的另一种方案：`diff()` 和 `patch` 是分开的。实际上 freeDOM 的 `patch` 就是 `sync()`，为了方便才弄了 `patch()` 方法。

```typescript
FreeDOM.d(oldVDOM :vDOM, vDOM :vDOM) :vDOMBridge;
```

|   属性    |    描述     |
| :-------: | :---------: |
| `oldVDOM` | 前一个 vDOM |
|  `vDOM`   | 后一个 vDOM |

`typeof vDOMBridge` 是 freeDOM 中的 vDOM 转换指令数据结构，它非常容易理解，具体可查看 [`main.d.ts`](freeDOM/blob/main/src/main.d.ts)。

# 作用域内 API

作用域内 API 需要在特定实例中调用。注意大小写——下面的方法均以 `freeDOM`（小写的 `f`）这个**实例**为例。

## `mount()`（`m()`）

将 vDOM 片段添加到实例现有的 vDOM 上。

- 为什么 freeDOM 不支持将 vDOM 添加到 DOM 上？因为不同于其他框架，freeDOM 完全不会知道 DOM 变成了什么样子，所以



## `unmount()`（`u()`）

将实例现有的 vDOM 上的 vDOM 片段删除。



## `sync()`（`s()`）

将 vDOM 树同步至 DOM 树。没错，**需要开发者主动同步**，freeDOM 不会自动同步，目的是让开发者自己决定最终渲染的时机，以达到最佳性能，避免重复渲染。当然你也可以直接写 `requestAnimationFrame()` 来调用这个东西。



## `rsync()`（`r()`）

将真实 DOM 树同步至 vDOM 树，通常用于处理用户输入。



## `patch()`（`p()`）

可以理解为 `mount()` 和 `sync()` 的结合。这个方法完全可以被前面两个方法取代，为了方便起见提供了这个东西。



# 工具方法

## e

选择 DOM。

```typescript
FreeDOM.e(s :string, scope? :Element | Document) :Node | Node[];
```

|  属性   |                     描述                      |
| :-----: | :-------------------------------------------: |
|   `s`   |                  css 选择器                   |
| `scope` | `querySelector` 的作用域，不填默认 `document` |

仅当传入选择器的最终选择器为 ID 选择器（即 `#` ）且获取到元素时返回 `Node` 类型单个元素，否则返回  `Node[]` 类型。

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

如果需要使用 `jsx` 之类的东西当然也可以自己加。`jsx` 的映射方法为 `FreeDOM.createNode()`。

## 版权声明

本软件以 MIT License 协议开源。

©2020-2022 LJM12914

## 互动

- 欢迎提出 issue，但请保持冷静的态度和对事不对人的基本道德准则。
- 请不要在未与我沟通的情况下发起 PR。
- 随便 fork。

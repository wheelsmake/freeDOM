# freeDOM
虚拟 DOM 实现 JavaScript 库。

## 功能

追踪指定的 DOM，并友好地将数据交给用户 / 高效地将数据交给 DOM。

## 没有的功能

不支持动态渲染、响应式渲染、数据绑定、模板等等，**freeDOM 不是 JavaScript 框架**，而是框架的一部分。它只负责通过 vDOM 管理 DOM。

## 特性

- freeDOM 大量使用了 `Proxy`。
- freeDOM 的 API 是完全命令式的。

## vDOM

虚拟 DOM（vDOM）是一种通过简化、合并、代理 DOM 操作来达到节约开销或响应式渲染的技术。

vDOM 技术是在浏览器 DOM API 的性能表现不佳并且没有提供响应式渲染的背景下的一种补救性技术。

# 开始使用

实例化。

```typescript
const freeDOM = new FreeDOM();
```

后文默认使用 `freeDOM` 进行交互。一般来说一个页面只需创建一个实例即可。

# 作用域

freeDOM 会监测的 DOM 子树被称为 `作用域`。

## 新增

```typescript
freeDOM.new({
    id :string,
    rootNode :Element | string
}) :boolean;
```

|    参数    |                            描述                             |
| :--------: | :---------------------------------------------------------: |
| `rootNode` | 作用域的根节点或根节点的 `id` 属性（以 `#element-id` 形式） |
|    `id`    |                     作用域的唯一标识符                      |

如果创建成功，则返回 `true`，否则返回 `false`。创建失败的情况通常可能是：新作用域是某一已注册作用域或某一已注册作用域的子作用域；传入了未挂载到页面中的节点（为了防止误操作而限制）；`id` 不是唯一的。

## 按 `id` 查询

```typescript
freeDOM.existsID(id :string) :Element | null;
```

| 参数 |        描述        |
| :--: | :----------------: |
| `id` | 作用域的唯一标识符 |

如存在相应 `id` 则返回作用域根节点，不存在则返回 `null`。

## 按根节点查询

```typescript
freeDOM.existsNode(rootNode :Element | string) :string | null;
```

|    参数    |                            描述                             |
| :--------: | :---------------------------------------------------------: |
| `rootNode` | 作用域的根节点或根节点的 `id` 属性（以 `#element-id` 形式） |

如存在相应根节点则返回作用域 `id`，不存在则返回 `null`。

## 按 `id` 更新根节点

```typescript
freeDOM.updateByID({
    id :string,
    rootNode :Element | string
}) :Element | null;
```

|    参数    |                             描述                             |
| :--------: | :----------------------------------------------------------: |
|    `id`    |                      作用域的唯一标识符                      |
| `rootNode` | 作用域的新根节点或新根节点的 `id` 属性（以 `#element-id` 形式） |

如存在相应 `id` 则更新并返回旧的根节点，不存在则返回 `null`。

## 按根节点更新 `id`

```typescript
freeDOM.updateByNode({
    id :string,
    rootNode :Element | string
}) :string | null;
```

|    参数    |                            描述                             |
| :--------: | :---------------------------------------------------------: |
|    `id`    |                    作用域的新唯一标识符                     |
| `rootNode` | 作用域的根节点或根节点的 `id` 属性（以 `#element-id` 形式） |

如存在相应根节点则更新并返回旧的 `id`，不存在则返回 `null`。

## 删除

```typescript
freeDOM.delete(arg :string | Element) :{id :string, rootNode :Element} | null;
```

| 参数  |            描述            |
| :---: | :------------------------: |
| `arg` | 作用域的唯一标识符或根节点 |

如存在相应唯一标识符或根节点则删除作用域并返回作用域对象，不存在则返回 `null`。

因为根节点的 `id` 属性和唯一标识符都是字符串，会造成歧义，所以不允许传入根节点的 `id` 属性。

- 删除作用域操作不可逆。所有相关数据都将被删除。请谨慎进行删除操作。

## 获取作用域

每个作用域维护一份专有的 vDOM，所以调用 API 前要获取作用域。

- 通过 `id` 获取：

```typescript
freeDOM.id(id :string) :FreeDOMCore | null;
```

| 参数 |        描述        |
| :--: | :----------------: |
| `id` | 作用域的唯一标识符 |

- 通过 `rootNode` 获取：

```typescript
freeDOM.rootNode(rootNode :Element | string) :FreeDOMCore | null;
```

|    参数    |                           描述                            |
| :--------: | :-------------------------------------------------------: |
| `rootNode` | 作用域的根节点根节点的 `id` 属性（以 `#element-id` 形式） |

如果不存在相应作用域则返回 `null`。

- `FreeDOMCore` 是作用域的类名。

# vDOM API

创建作用域后即可用 freeDOM 提供的新命令式 API 构建 vDOM。

## 概念

虚拟 DOM 节点（简称 vDOM）：虚拟 DOM 结构的最小单元。

```typescript
interface nodeDescription{
    tagName? :string;
    instance :Element | Text | null;
    attributes :Record<string, string>;
    parentNodeID? :string;
    childNodeIDs? :string[];
    childNodes :Array<nodeDescription | string>;
}
```

|      属性      |                     描述                     |
| :------------: | :------------------------------------------: |
|   `tagName`    |                    标签名                    |
|   `instance`   |         已渲染的实例，`null`：未渲染         |
|  `attributes`  |                     属性                     |
| `parentNodeID` |       父元素 `fID`，用于虚拟 DOM 数组        |
| `childNodeIDs` |           子元素中为 vDOM 的 `fID`           |
|  `childNodes`  | 子元素数组，文本节点为 `string`，否则为 vDOM |

vDOM 树（`nodeTree`）：由嵌套 vDOM 组成的对象。嵌套区域为 `childNodes`。

vDOM 字典（`nodeStore`）：freeDOM 中 vDOM 树不只是以树的形式存储，还将作用域下所有 vDOM（因为是对象所以两边都是引用，值并不会复制）放到一个对象中，其键名即为随机生成的唯一标识符 `fID`，用于快速遍历 vDOM 树。

- 根节点的 `fID` 永远是 `"rootNode"`。

## API 速览

- `sync()`：将 vDOM 树同步至 DOM 树。这个方法的用途非常少，因为用常规 API 对 vDOM 树进行修改时 freeDOM 会自动同步更改至 DOM 树。
- `rsync()`：将真实 DOM 树同步至 vDOM 树，通常用于处理用户输入。
- `d()`：比较两个 vDOM 树间的区别，并生成将第一个 vDOM 树变成第二个 vDOM 树的 `转换代码`。

# 管理 API

## 获取信息

获取作用域的 ID：

```typescript
freeDOM.id("id").getID() :string; //"id"
```

> 听君一席话，如听一席话。

获取作用域的 rootNode：

```typescript
freeDOM.rootNode("rootNodeID").getRootNode() :Element; //"#rootNodeID"
```

> 还是听君一席话，如听一席话。

不过交换着用就有意义了。

## 不应使用的方法

在作用域实例中，以 `__` 作为开头和结尾的方法不应在 freeDOM 外部使用。这些方法都需要验证创建作用域实例时提供的 `key` 才能工作，因此外部也无法正常调用。

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

## parseNode

将 DOM 对象转换为（游离的）vDOM 对象。

```typescript
freeDOM.parseNode(element :Element);
```



## buildNode

将（游离的）vDOM 对象转换为 DOM 对象。

# 版权声明

本软件以 MIT License 协议开源。

©2020-2022 LJM12914

# 互动

- 欢迎提出issue，但请保持冷静的态度和对事不对人的基本道德准则。
- 请不要在未与我沟通的情况下发起PR，否则PR大概率被拒绝。
- 随便 fork。

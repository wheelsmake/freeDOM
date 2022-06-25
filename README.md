# freeDOM
单独的 vDOM 实现库。

## 功能

追踪指定的 DOM，并友好地将数据交给用户 / 高效地将数据交给 DOM。

## 没有的功能

- 不支持 MathML。
- 不支持动态渲染、响应式渲染、数据绑定、模板等等，**freeDOM 不是 JavaScript 框架**，而是框架的一部分。它只负责通过 vDOM 管理 DOM。

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
freeDOM.new(rootNode :HTMLElement | string， id :string) :boolean;
```

|    参数    |                            描述                             |
| :--------: | :---------------------------------------------------------: |
| `rootNode` | 作用域的根节点或根节点的 `id` 属性（以 `#element-id` 形式） |
|    `id`    |                     作用域的唯一标识符                      |

如果创建成功，则返回 `true`，否则返回 `false`。创建失败的情况通常可能是：新作用域是某一已注册作用域的子作用域；传入了不在页面中的节点；`id` 不是唯一的。

## 按 `id` 查询

```typescript
freeDOM.existsID(id :string) :HTMLElement | null;
```

| 参数 |        描述        |
| :--: | :----------------: |
| `id` | 作用域的唯一标识符 |

如存在相应 `id` 则返回作用域根节点，不存在则返回 `null`。

## 按根节点查询

```typescript
freeDOM.existsNode(rootNode :HTMLElement | string) :string | null;
```

|    参数    |                            描述                             |
| :--------: | :---------------------------------------------------------: |
| `rootNode` | 作用域的根节点或根节点的 `id` 属性（以 `#element-id` 形式） |

如存在相应根节点则返回作用域 `id`，不存在则返回 `null`。

## 按 `id` 更新根节点

```typescript
freeDOM.updateByID({
    id :string,
    rootNode :HTMLElement | string
}) :HTMLElement | null;
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
    rootNode :HTMLElement | string
}) :string | null;
```

|    参数    |                            描述                             |
| :--------: | :---------------------------------------------------------: |
|    `id`    |                    作用域的新唯一标识符                     |
| `rootNode` | 作用域的根节点或根节点的 `id` 属性（以 `#element-id` 形式） |

如存在相应根节点则更新并返回旧的 `id`，不存在则返回 `null`。

## 删除

```typescript
freeDOM.delete(arg :string | HTMLElement) :{id :string, rootNode :HTMLElement} | null;
```

| 参数  |            描述            |
| :---: | :------------------------: |
| `arg` | 作用域的唯一标识符或根节点 |

如存在相应唯一标识符或根节点则删除作用域并返回作用域对象，不存在则返回 `null`。

不允许传入根节点的 `id` 属性（以 `#element-id` 形式）。

- 删除作用域操作不可逆。请谨慎进行删除操作。

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
freeDOM.rootNode(rootNode :HTMLElement | string) :FreeDOMCore | null;
```

|    参数    |                           描述                            |
| :--------: | :-------------------------------------------------------: |
| `rootNode` | 作用域的根节点根节点的 `id` 属性（以 `#element-id` 形式） |

如果不存在相应作用域则返回 `null`。

# API

创建作用域后即可用 freeDOM 提供的新命令式 API 构建 vDOM。

## 概念

虚拟 DOM（简称，下同：vDOM）：虚拟 DOM 结构的最小单元。

```typescript
interface nodeDescription{
    fID :string;
    type :"e"|"t";
    tagName? :string;
    instance? :Element | Text;
    attributes :Record<string, string>;
    parentNodeID? :string;
    parentNode? :nodeDescription;
    childNodeIDs? :string[];
    childNodes? :nodeDescription[];
}
```

|      属性      |                     描述                      |
| :------------: | :-------------------------------------------: |
|     `fID`      |       freeDOM 内部该 vDOM 的唯一标识符        |
|     `type`     | `"e"`：`Element` 的实例；`"t"`：`Text` 的实例 |
|   `tagName`    |                    标签名                     |
|   `instance`   |       已渲染的实例，`undefined`：未渲染       |
|  `attributes`  |                     属性                      |
| `parentNodeID` |        父元素 `fID`，用于虚拟 DOM 数组        |
|  `parentNode`  |          父元素实例，用于虚拟 DOM 树          |
|                |                                               |
|                |                                               |

虚拟 DOM 树：由嵌套虚拟 DOM 组成的对象。嵌套点为 `childNodes`。

虚拟 DOM 数组：由虚拟 DOM 组成的数组，大致相当于拍平了一棵虚拟 DOM 树。

## 性能原理

一个作用域只会有一棵虚拟 DOM 树，其根节点就是所谓 `rootNode`。freeDOM 默认会使用拍平了的 `nodeStore` 和 `nodeDict` 对查找提供帮助。

## API 速览

- `n()`：创建新的 vDOM 树。

- `parse()`：将 DOM 转换为（非游离态）vDOM。
  - 如果要单纯地将 DOM 转换为游离态的 vDOM，则可使用 [`FreeDOM.parseNode()`](#parseNode)。
- `sync()`：将 vDOM 同步至 DOM 。这个方法的用途非常少，因为用常规 API 对虚拟 DOM 树进行修改时 freeDOM 会自动同步更改至真实 DOM 树。
- `rsync()`：将真实 DOM 树同步至虚拟 DOM 树，通常用于处理用户输入。
- `d()`：比较两个虚拟 DOM 树间的区别，并生成将第一个虚拟 DOM 树变成第二个虚拟 DOM 树的 `转换代码`。

## `n()`

```typescript
freeDOM.id("id").n("")
```



# 工具方法

## parseNode

将真实 DOM 对象转换为 freeDOM 的虚拟 DOM 对象。

```typescript
freeDOM.parseNode(element :Element);
```



# 版权声明

本软件以 MIT License 协议开源。

©2020-2022 LJM12914

# 互动

- 欢迎提出issue，但请保持冷静的态度和对事不对人的基本道德准则。
- 请不要在未与我沟通的情况下发起PR，否则PR大概率被拒绝。
- 随便 fork。

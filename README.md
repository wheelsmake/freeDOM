# freeDOM
单独的 vDOM 实现库。

## 功能

追踪指定的 DOM，并友好地将数据交给用户 / 高效地将数据交给 DOM。

## 没有的功能

- 不支持 MathML。
- 不支持动态渲染、响应式渲染、数据绑定、模板等等，**freeDOM 不是 JavaScript 框架**，而是框架的一部分。它只负责通过 vDOM 管理 DOM。

## 特性

- freeDOM 使用了 `Proxy`。
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

# 作用域 CRUD

freeDOM 会监测的 DOM 子树被称为 `作用域`。

## 新增

```typescript
freeDOM.new({
    id :string,
    rootNode :HTMLElement | string
}) :boolean;
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

## 按 `id` 更新

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

## 按根节点更新

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
freeDOM.delete(arg :string | HTMLElement) :object | null;
```

| 参数  |                             描述                             |
| :---: | :----------------------------------------------------------: |
| `arg` | 作用域的唯一标识符或【根节点或根节点的 `id` 属性（以 `#element-id` 形式）】 |

如存在相应唯一标识符或根节点则删除作用域并返回整个作用域对象，不存在则返回 `null`。

如存在与某根节点 `id` 属性相同的唯一标识符（如 `#element-id`），则会删除以该字符串为唯一标识符的作用域。强烈建议作用域的唯一标识符不要出现特殊符号，否则将无法正常使用[点表示法](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics#点表示法)访问。

# vDOM API

freeDOM 使用 `Proxy` 进行对 DOM 操作的拦截。

使用 freeDOM 的一般操作是向某个特定的作用域传入一个与 DOM 交互的函数：

```typescript
freeDOM._['id'].render(newDocument=>{
    var e = newDocument.createElement("div");
    newDocument.body.append(e);
    ...
});
```

注意到在该函数中所有原本应是 `document` 的位置被换成了该函数唯一的参数（上文中为 `newDocument`）。freeDOM 在准备好后将调用该函数，并传入一个 `document` 的 `Proxy`，用于拦截和修改对 DOM 的操作。

# 版权声明

本软件以 MIT License 协议开源。

©2020-2022 LJM12914

# 互动

- 欢迎提出issue，但请保持冷静的态度和对事不对人的基本道德准则。
- 请不要在未与我沟通的情况下发起PR，否则PR大概率被拒绝。
- 随便 fork。

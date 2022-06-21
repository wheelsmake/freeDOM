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

# vDOM API

每个作用域维护一份专有的 vDOM，所以调用 vDOM API 前要获取作用域。

## 获取作用域

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

## 虚拟机 API

我们可以完全用原生 JavaScript 操作 DOM 的方式构建 vDOM，实现这一功能的 API 被形象地命名为 `虚拟机 API`。

如果你觉得原生语法非常重要且神圣，并且不在乎它写起来的长度的话，这非常适合你。又如果你已经写好了一份原生操作 DOM 的程序，它就可以通过这个 API 被不做改动地迁移到 freeDOM。

虚拟机 API 的核心方法是 `render()`。它将原生 JavaScript 对真实 DOM 的操作重定向为对 vDOM 对象的操作，然后通过比对新旧 vDOM 对象增量渲染真实 DOM。

向某个特定的作用域的 `render` 方法传入一个以原生 DOM 操作语法与 DOM 交互的函数：

```typescript
freeDOM.id("id").render((arg :Document) => any) :void;
```

|           参数           |    描述    |
| :----------------------: | :--------: |
| `(arg :Document) => any` | 执行的函数 |

例子：

```typescript
freeDOM.id("id").render(
    document=>{
    	var e = document.createElement("div");
        e.innerText = "Hello, world!"
    	var myapp = document.getElementById("app");
        myapp.append(e);
        ...
	}
);
```

需要注意的是，该函数中的 `document` **不是全局作用域的 `document` 对象，而是一个普通的参数**。实际上它是一个全局 `document` 对象的 `Proxy`。freeDOM 在准备好 `Proxy` 后调用该函数并传入 `Proxy`，用于拦截原生 JavaScript 对真实 DOM 的操作。

- 不允许在该函数中修改 `document` 对象。事实上该函数中的 `document` 只允许少量常规的读取操作，**推荐只使用**点表示法和方括号表示法获取 `document` 的属性和方法。除此之外仅支持 `has`、`isExtensible`、`ownkeys` 和 `getPrototypeOf`，freeDOM 会在访问这些方法时抛出一个警告，并且原封不动地返回数据。freeDOM **完全拦截**其他所有 `Proxy` 可能代理的方法。
- LJM12914 习惯以 `方法` 命名静态的、现成的 `function`，而以 `函数` 命名动态的、以参数形式传递的、运行时生成的 `function`。

## 普通 API

我们当然也可以用 freeDOM 提供的新命令式 API 构建 vDOM。与流行的 JavaScript 框架相近，freeDOM 支持通过 `createElement`（或其简称 `n()`，~~少了一点~~）创建虚拟 DOM 节点。这个 API 还有很多变种方法，它们都有各自的全称和简称：

- `ne()`（`createElementFromExistNode()`）：将真实 DOM 转换为虚拟 DOM。
- `u()`（`buildElement()`）：将虚拟 DOM 转换为真实 DOM。

# 版权声明

本软件以 MIT License 协议开源。

©2020-2022 LJM12914

# 互动

- 欢迎提出issue，但请保持冷静的态度和对事不对人的基本道德准则。
- 请不要在未与我沟通的情况下发起PR，否则PR大概率被拒绝。
- 随便 fork。

---
name: prd-to-prototype
description: Generates interactive prototypes as single HTML files. Use when the user asks for 原型, prototype, PRD转原型, or converting requirements/PRD into a clickable prototype.
---

# 需求转原型

将需求或 PRD 转化为可点击原型：单 HTML 文件，React + Ant Design（CDN），无构建。

## 多项目管理

产品经理常需为多个项目分别做原型，按项目隔离存放：

### 路径约定
- **单项目**：用户未指定时，生成到 `index.html`（当前目录或用户指定路径）
- **多项目**：每个项目独立目录，固定命名为 `index.html`
  ```
  prototypes/
  ├── 项目A/
  │   └── index.html
  ├── 项目B/
  │   └── index.html
  └── 订单管理系统/
      └── index.html
  ```

### 生成前必须确认
1. **项目名**：从需求/PRD 提取，或主动问用户「这个原型属于哪个项目？」
2. **基路径**：优先用用户指定的目录（如「放到 prd 下」）；否则用 `prototypes/` 或项目根目录
3. **是否覆盖**：若目标路径已存在 `index.html`，先提示用户确认再覆盖

### 用户指令示例
- 「为 XX 项目做原型」→ `prototypes/XX/index.html`
- 「在 prd 下给订单系统建个原型」→ `prd/订单系统/index.html`
- 「更新刚才那个」→ 沿用上一次的项目路径

## 技术方案

- **形式**：单 HTML 文件，双击打开
- **框架**：React 18 + Ant Design 4（CDN）
- **构建**：无，Babel Standalone 浏览器内编译 JSX

## CDN 引用

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd@4.24.15/dist/antd.min.css" />
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/antd@4.24.15/dist/antd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7/babel.min.js"></script>
```

## 转化步骤

1. **任务拆解**：从需求提取用户任务（谁 + 场景 + 目标）
2. **页面清单**：主流程 → 页面 / 弹层
3. **布局**：后台用 `Layout` + `Sider` + `Content`；普通页面按流程排列
4. **数据**：内联 Mock 数组，组件内 `React.useState` 管理
5. **组件**：优先用 `Form`、`Table`、`Menu`、`Descriptions`、`Input`、`Button`、`message`

## 后台管理套路

```jsx
const { Layout, Menu, Form, Input, Button, Table, message } = antd;

const dataSource = [{ id: 1, ... }, ...];
const [logged, setLogged] = React.useState(false);
const [page, setPage] = React.useState('list');

<Layout style={{ minHeight: '100vh' }}>
  <Sider theme="dark">
    <Menu selectedKeys={[page]} onClick={({ key }) => setPage(key)} items={[...]} />
  </Sider>
  <Layout>
    <Content style={{ padding: 24 }}>
      {page === 'list' && <Table dataSource={...} columns={...} />}
      {page === 'detail' && <Descriptions />}
    </Content>
  </Layout>
</Layout>
```

## 输出

- 生成到 `{基路径}/{项目名}/index.html`，包含完整 `<!DOCTYPE html>` 到 `</html>`
- 告知用户：生成路径、双击打开、需联网、演示密码 `123456`
- 若本次对话有多个项目，简要列出各原型路径以便用户区分

## 参考

- Ant Design：https://ant.design/

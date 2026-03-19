---
name: prd-to-prototype
description: Generates interactive prototypes as single HTML files. Use when the user asks for 原型, prototype, PRD转原型, H5, 移动端, or converting requirements/PRD into a clickable prototype.
---

# 需求转原型

将需求或 PRD 转化为可点击原型：单 HTML 文件，React + 组件库（CDN），无构建。

## 类型选择

| 用户描述 | 方案 | 组件库 |
|----------|------|--------|
| 后台管理、PC、桌面、中台 | PC/后台 | Ant Design |
| H5、移动端、宣传页、小程序风格、手机端 | H5/移动端 | antd-mobile |

用户未明确时，可从需求推断：多级菜单/表格/表单 → PC；单列列表/底部 Tab/分享页 → H5。

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
- **构建**：无。**PC** 因必选 Agentation 使用 ESM + import map + htm；**H5** 可用 Babel Standalone 或 ESM
- **PC**：Ant Design 4 + Agentation | **H5**：antd-mobile 5

## CDN 引用

**PC**：antd.css + import map（react、antd、agentation 等）| **H5**：antd-mobile（UMD 或 ESM），`viewport` 加 `maximum-scale=1, viewport-fit=cover`

```html
<!-- H5 viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
<!-- H5: antd-mobile UMD → window.antdMobile -->
<script src="https://unpkg.com/antd-mobile@5.42.0/umd/antd-mobile.js"></script>
```

## 转化步骤

1. **任务拆解**：从需求提取用户任务（谁 + 场景 + 目标）
2. **页面清单**：主流程 → 页面 / 弹层
3. **布局**：PC 用 `Layout` + `Sider`；H5 用单列 + 底部 `TabBar`（多页）或单页居中（宣传页）
4. **数据**：内联 Mock 数组，`React.useState` 管理
5. **组件**：PC 用 `Form`、`Table`、`Menu`；H5 用 `List`、`TabBar`、`Button`、`Form`，`padding-bottom: env(safe-area-inset-bottom)` 适配刘海屏

## PC 后台管理套路

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

## H5 移动端套路

- **单页宣传**：标题 + 图片 + 文案，单列居中，无需 TabBar
- **多页 App**：`TabBar` 底部导航，`List` 替代 `Table`，卡片式布局

## 输出

- 生成到 `{基路径}/{项目名}/index.html`，包含完整 `<!DOCTYPE html>` 到 `</html>`
- 告知用户：生成路径、双击打开、需联网、演示密码 `123456`
- 若本次对话有多个项目，简要列出各原型路径以便用户区分

## 精准反馈（必选）

原型生成后，必须引入 [Agentation](https://github.com/benjitaylor/agentation)。Agentation 无 UMD，需用 **import map + type="module" + htm**：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd@4.24.15/dist/antd.min.css" />
<div id="root"></div>
<script>window.process = { env: { NODE_ENV: 'production' } };</script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@18",
    "react-dom": "https://esm.sh/react-dom@18",
    "react/jsx-runtime": "https://esm.sh/react@18/jsx-runtime",
    "htm": "https://esm.sh/htm@3",
    "antd": "https://esm.sh/antd@4.24.15?external=react,react-dom",
    "agentation": "https://cdn.jsdelivr.net/npm/agentation@2.3.3/dist/index.mjs"
  }
}
</script>
<script type="module">
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Form, Input, Button, Table, message } from 'antd';
import { Agentation } from 'agentation';
import htm from 'htm';
const html = htm.bind(React.createElement);

function App() {
  const [page, setPage] = React.useState('list');
  return html`<div>...</div>`;
}

ReactDOM.createRoot(document.getElementById('root')).render(html`
  <${React.Fragment}>
    <${App} />
    <${Agentation} />
  <//>
`);
</script>
```

### 集成要点

| 项 | 说明 |
|----|------|
| **antd external** | 必须加 `?external=react,react-dom`，否则多 React 实例会导致 `useContext` 返回 null |
| **external 参数** | 仅用 `react,react-dom`，不要加 `react/jsx-runtime`（会 404） |
| **htm** | 无构建的 JSX 替代，用 `html\`<${Component}>...\` 写法 |
| **根节点** | 同时渲染 App 与 Agentation，二者在同一 React 树 |
| **PC + Agentation** | 不能再用 Babel + UMD antd，需统一改为 ESM + htm |

## 参考

- Ant Design（PC）：https://ant.design/
- antd-mobile（H5）：https://mobile.ant.design/
- Agentation（精准定位）：https://github.com/benjitaylor/agentation

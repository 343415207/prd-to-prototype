---
name: prd-to-prototype
description: Generates interactive prototypes as single HTML files. Use when the user asks for 原型, prototype, PRD转原型, H5, 移动端, or converting requirements/PRD into a clickable prototype.
---

# 需求转原型

将需求或 PRD 转化为可点击原型。**优先采用构建 single HTML**，产物可离线、file:// 打开无加载延迟；若用户要求「无构建」「直接 HTML」则用 CDN 方案。

## 输出方式选择

| 方案 | 形式 | 适用 | 产物 |
|------|------|------|------|
| **构建 single HTML**（推荐） | Vite 项目，`npm run build` | 默认。可离线、双击打开、无 CDN 延迟 | `dist/index.html` |
| **CDN 无构建** | 单 HTML，import map + 动态脚本 | 用户明确要「无构建」「直接 HTML」 | `index.html` |

## 类型选择

| 用户描述 | 方案 | 组件库 |
|----------|------|--------|
| 后台管理、PC、桌面、中台 | PC/后台 | Ant Design |
| H5、移动端、宣传页、小程序风格、手机端 | H5/移动端 | antd-mobile |

用户未明确时，可从需求推断：多级菜单/表格/表单 → PC；单列列表/底部 Tab/分享页 → H5。

## 多项目管理

产品经理常需为多个项目分别做原型，按项目隔离存放：

### 路径约定
- **构建方案**：每个项目独立目录，内含 `package.json`、`src/`、`vite.config.js`，构建后 `dist/index.html` 为最终产物
  ```
  prototypes/
  ├── 项目A/
  │   ├── package.json
  │   ├── vite.config.js
  │   ├── index.html
  │   ├── src/main.jsx
  │   ├── src/App.jsx
  │   └── dist/index.html   # 构建后，可离线
  ├── 项目B/
  │   └── ...
  ```
- **CDN 方案**：每个项目目录下直接放 `index.html`

### 生成前必须确认
1. **项目名**：从需求/PRD 提取，或主动问用户「这个原型属于哪个项目？」
2. **基路径**：优先用用户指定的目录（如「放到 prd 下」）；否则用 `prototypes/` 或项目根目录
3. **输出方式**：默认用构建方案；若用户要求「无构建」「直接 HTML」则用 CDN 方案
4. **是否覆盖**：若目标路径已存在内容，先提示用户确认再覆盖

### 用户指令示例
- 「为 XX 项目做原型」→ `prototypes/XX/`（构建方案）或 `prototypes/XX/index.html`（CDN 方案）
- 「在 prd 下给订单系统建个原型」→ `prd/订单系统/`
- 「更新刚才那个」→ 沿用上一次的项目路径

## 技术方案

- **构建方案**：Vite + vite-plugin-singlefile，React + JSX，npm 依赖，`npm run build` 输出单 HTML（内联 JS/CSS，可离线）
- **CDN 方案**：单 HTML，import map + htm，无构建
- **PC 与 H5 均必选 Agentation**
- **PC**：Ant Design 4 | **H5**：antd-mobile 5

---

## 构建 single HTML（推荐方案）

### 项目结构

生成到 `{基路径}/{项目名}/` 下：

```
项目名/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx
│   └── App.jsx
└── README.md
```

### package.json

```json
{
  "name": "项目名",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "agentation": "^2.3.3",
    "antd-mobile": "^5.34.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.4.0",
    "vite-plugin-singlefile": "^2.3.2"
  }
}
```

**PC 项目**：依赖改为 `"antd": "^4.24.15"`，移除 antd-mobile；main.jsx 用 `import 'antd/dist/antd.css'`；App.jsx 用 `Layout`、`Menu`、`Form`、`Table` 等。

### vite.config.js

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
  },
});
```

### 入口与根节点

**index.html**：含 viewport（H5 加 `viewport-fit=cover`）、`<div id="root"></div>`、`<script type="module" src="/src/main.jsx"></script>`。

**src/main.jsx**：

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Agentation } from 'agentation';
import 'antd-mobile/es/global';  // H5。PC 用 antd 的样式引入
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Agentation />
  </>
);
```

### 构建与输出

生成后执行：`cd {项目路径} && npm install && npm run build`

产物在 `dist/index.html`，可双击打开、离线使用。告知用户：生成路径、`npm run build` 后打开 `dist/index.html`、演示密码 `123456`。

### 构建方案要点

| 项 | 说明 |
|----|------|
| 使用 JSX | 直接写 `<Component />`，无需 htm |
| 直接 import | `import { TabBar, Button } from 'antd-mobile'`，无需 UMD 动态加载 |
| TabBar 刘海屏 | `paddingBottom: 'env(safe-area-inset-bottom)'` |
| 菜单列表 | 用 div + map，不用 List/Cell（UMD 下易空） |
| style 对象 | `style={{ padding: 16 }}`，禁止字符串 |

---

## CDN 方案（无构建）

当用户要求「无构建」「直接 HTML」时使用。产物为单 `index.html`，双击打开需联网。

## CDN 引用

**PC**：antd.css + import map（react、antd、agentation 等）

**H5**：antd-mobile 必须用 **UMD**，不能用 esm.sh（esm.sh 会加载各组件 CSS 导致大量 404）。用 `antd-mobile.min.css` + `antd-mobile UMD`，通过动态脚本在 React 挂到 window 后加载。`viewport` 加 `maximum-scale=1, viewport-fit=cover`

```html
<!-- H5 viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
<!-- H5: antd-mobile 用 UMD，不能用 esm.sh -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd-mobile@5.34.0/dist/antd-mobile.min.css" />
```

## 转化步骤

1. **任务拆解**：从需求提取用户任务（谁 + 场景 + 目标）
2. **页面清单**：主流程 → 页面 / 弹层
3. **布局**：PC 用 `Layout` + `Sider`；H5 用单列 + 底部 `TabBar`（多页）或单页居中（宣传页）
4. **数据**：内联 Mock 数组，`React.useState` 管理
5. **组件**：PC 用 `Form`、`Table`、`Menu`；H5 用 `TabBar`、`Button`、`Image`、`Toast`，菜单列表用 div+map，TabBar 加 `paddingBottom: 'env(safe-area-inset-bottom)'` 适配刘海屏

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
- **多页 App**：`TabBar` 底部导航，卡片式布局
- **菜单列表**：antd-mobile 的 List、Cell 在 UMD 下可能渲染为空，**「我的」等菜单页用 div + map 实现**更稳妥
- **TabBar**：style 加 `paddingBottom: 'env(safe-area-inset-bottom)'` 适配刘海屏

## 输出

- **构建方案**：生成项目目录（package.json、vite.config.js、src/main.jsx、src/App.jsx 等），执行 `npm install && npm run build`，产物 `dist/index.html` 可离线打开
- **CDN 方案**：生成到 `{基路径}/{项目名}/index.html`，单文件，双击打开需联网
- 告知用户：生成路径、使用方式（构建后打开 `dist/index.html` 或直接打开 `index.html`）、演示密码 `123456`
- 若本次对话有多个项目，简要列出各原型路径以便用户区分

## 精准反馈（必选）

**无论 H5 还是管理后台，所有原型都必须引入** [Agentation](https://github.com/benjitaylor/agentation)。构建方案中直接 `import { Agentation } from 'agentation'`；CDN 方案需用 **import map + type="module" + htm**：

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
| **antd external** | PC 用 antd 时加 `?external=react,react-dom`，否则多 React 实例会导致 `useContext` 返回 null |
| **H5 antd-mobile** | 必须用 UMD（jsdelivr），不能用 esm.sh，否则各组件 CSS 404 |
| **external 参数** | esm.sh 包 URL 的 `?external=` 仅用 `react,react-dom`（加 react/jsx-runtime 会 404） |
| **import map 必含 react/jsx-runtime** | Agentation 依赖此模块，PC 与 H5 的 import map 都必须有 `"react/jsx-runtime": "https://esm.sh/react@18/jsx-runtime"`，否则报 "Failed to resolve module specifier" |
| **htm** | 无构建的 JSX 替代，用 `html\`<${Component}>...\` 写法 |
| **style 必须为对象** | React 的 style 只能是对象，不能是字符串。htm 中写 `style=${{ padding: 16 }}`，禁止 `style="..."` 或 `style=${"padding:16px"}`，否则报 Minified React error #62 |
| **根节点** | 同时渲染 App 与 Agentation，二者在同一 React 树 |
| **PC/H5 统一** | 都必须集成 Agentation、htm；PC 全 ESM，H5 仅 antd-mobile 用 UMD（避免 esm.sh CSS 404） |

### 生成约束（禁止违反）

| 禁止项 | 正确做法 |
|--------|----------|
| 使用 `React.createElement` | 必须用 htm：`const html = htm.bind(React.createElement)`，组件写成 `html\`<${Comp}>...\`` |
| style 传字符串 | style 必须传对象：`style=${{ padding: 16, marginTop: 8 }}`，禁止 `style="padding:16px"`（会报 React error #62） |
| 根节点只渲染 `<App />` | 必须同时渲染 App 与 Agentation：`html\`<${React.Fragment}><${App} /><${Agentation} /><//>\`` |
| 漏掉 Agentation | import map 必有 agentation，script 必 `import { Agentation } from 'agentation'`，根节点必含 `<${Agentation} />` |
| 漏掉 process polyfill | 在 import map 之前必须有 `window.process = { env: { NODE_ENV: 'production' } }` |
| 漏掉 htm | import map 必有 htm，script 必 `import htm from 'htm'` 且 `const html = htm.bind(React.createElement)` |
| H5 用 antd | H5 用 antd-mobile（UMD），PC 用 antd（esm.sh），不可混用 |
| H5 用 esm.sh 引入 antd-mobile | H5 必须用 UMD 脚本加载 antd-mobile，从 window.antdMobile 解构 |
| 漏掉 react/jsx-runtime | import map 必须有 `"react/jsx-runtime": "https://esm.sh/react@18/jsx-runtime"`（Agentation 依赖） |

### 生成后自检清单

**构建方案**：
- [ ] 项目含 package.json、vite.config.js、src/main.jsx、src/App.jsx
- [ ] main.jsx 同时渲染 App 与 Agentation
- [ ] 已执行 `npm install && npm run build`，dist/index.html 可打开
- [ ] 所有 style 用对象：`style={{ ... }}`

**CDN 方案**：
- [ ] import map：PC 含 antd；H5 不含 antd-mobile，用 UMD 加载。**两者都必须含 react、react-dom、react/jsx-runtime、htm、agentation**
- [ ] 有 `window.process` polyfill
- [ ] 使用 htm 写组件，根节点同时包含 `<${App} />` 与 `<${Agentation} />`
- [ ] 所有 `style` 均用对象：`style=${{ ... }}`

### H5 加载方式（antd-mobile 用 UMD，避免 esm.sh CSS 404）

antd-mobile 从 esm.sh 引入会触发大量组件 CSS 404，**H5 必须用 UMD**：先挂 React 到 window，再动态加载 antd-mobile UMD。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd-mobile@5.34.0/dist/antd-mobile.min.css" />
<div id="root"></div>
<script>window.process = { env: { NODE_ENV: 'production' } };</script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@18",
    "react-dom": "https://esm.sh/react-dom@18",
    "react/jsx-runtime": "https://esm.sh/react@18/jsx-runtime",
    "htm": "https://esm.sh/htm@3",
    "agentation": "https://cdn.jsdelivr.net/npm/agentation@2.3.3/dist/index.mjs"
  }
}
</script>
<script type="module">
import React from 'react';
import ReactDOM from 'react-dom';
import { Agentation } from 'agentation';
import htm from 'htm';
const html = htm.bind(React.createElement);

window.React = React;
window.ReactDOM = ReactDOM;

const s = document.createElement('script');
s.src = 'https://cdn.jsdelivr.net/npm/antd-mobile@5.34.0/umd/antd-mobile.js';
s.onload = () => {
  const { TabBar, List, Button, Toast } = window.antdMobile;
  function App() { return html`<div>...</div>`; }
  ReactDOM.createRoot(document.getElementById('root')).render(html`
    <${React.Fragment}>
      <${App} />
      <${Agentation} />
    <//>
  `);
};
document.body.appendChild(s);
</script>
```

**H5 import map 不包含 antd-mobile**，组件从 `window.antdMobile` 解构。

### 常见错误与排查

| 报错 | 原因 | 正确写法 |
|------|------|----------|
| Minified React error #62 | style 传了字符串 | `style=${{ padding: 16 }}`，不能用 `style="padding:16px"` |
| Failed to resolve module specifier "react/jsx-runtime" | import map 缺 react/jsx-runtime | 在 import map 中加 `"react/jsx-runtime": "https://esm.sh/react@18/jsx-runtime"` |
| useContext 返回 null | 多 React 实例 | PC antd 加 `?external=react,react-dom`；H5 确保先 `window.React=React` 再加载 antd-mobile UMD |
| H5「我的」页空白 | List/Cell 在 UMD 下可能不渲染 | 用 div + map 写菜单列表，避免依赖 List、Cell |

### H5 组件选用建议

| 组件 | 可靠性 | 说明 |
|------|--------|------|
| TabBar、Button、Image、Toast | ✓ 推荐 | UMD 下表现正常 |
| List、Cell | ⚠ 慎用 | 可能渲染为空，菜单列表用 div+map 兜底 |

## 参考

- Ant Design（PC）：https://ant.design/
- antd-mobile（H5）：https://mobile.ant.design/
- Agentation（精准定位）：https://github.com/benjitaylor/agentation
- 构建方案示例（GitHub）：
  - H5 服装商城：https://github.com/343415207/prd-to-prototype/tree/main/skills/prd-to-prototype/demos/h5-clothing-mall
  - PC 运营管理系统：https://github.com/343415207/prd-to-prototype/tree/main/skills/prd-to-prototype/demos/pc-operations-system

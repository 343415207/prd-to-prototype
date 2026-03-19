---
name: prd-to-prototype
description: Generates interactive prototypes as single HTML files. Use when the user asks for 原型, prototype, PRD转原型, H5, 移动端, or converting requirements/PRD into a clickable prototype.
---

# 需求转原型

将需求或 PRD 转化为可点击原型。**默认采用构建 single HTML**，产物可离线、file:// 打开无加载延迟；若用户明确要求「无构建」「直接 HTML」则用 CDN 方案。

## 输出方式

| 方案 | 形式 | 适用 | 产物 |
|------|------|------|------|
| **构建 single HTML**（默认） | Vite 项目，`pnpm build` | 可离线、双击打开、无 CDN 延迟 | `dist/index.html` |
| **CDN 无构建** | 单 HTML，import map + htm | 用户明确要「无构建」「直接 HTML」 | `index.html` |

## 类型选择

| 用户描述 | 方案 | 组件库 |
|----------|------|------|
| 后台管理、PC、桌面、中台 | PC | Ant Design |
| H5、移动端、宣传页、小程序风格 | H5 | antd-mobile |

多级菜单/表格/表单 → PC；单列列表/底部 Tab/分享页 → H5。

## 多项目管理

产品经理常需为多个项目分别做原型，按项目隔离存放。

### 路径约定
- **单项目**：用户未指定时，生成到 `index.html`（当前目录）或用户指定路径
- **多项目**：每个项目独立目录，固定包含 `package.json`、`src/` 等，构建后 `dist/index.html` 为产物
```
prototypes/
├── 项目A/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── src/main.jsx
│   ├── src/App.jsx
│   └── dist/index.html   # 构建后
├── 项目B/
│   └── ...
└── 订单管理系统/
    └── ...
```

### 生成前必须确认
1. **项目名**：从需求/PRD 提取，或主动问「这个原型属于哪个项目？」
2. **基路径**：优先用户指定（如「放到 prd 下」）；否则用 `prototypes/` 或项目根
3. **输出方式**：默认构建；用户要「无构建」「直接 HTML」则 CDN
4. **是否覆盖**：目标路径已存在内容时，先提示确认再覆盖

### 用户指令示例
- 「为 XX 项目做原型」→ `prototypes/XX/`
- 「在 prd 下给订单系统建个原型」→ `prd/订单系统/`
- 「更新刚才那个」→ 沿用上一次的项目路径
- 本次对话有多个项目时，简要列出各原型路径以便区分

---

## 构建方案（默认）

### 项目结构

```
项目名/
├── package.json
├── vite.config.js
├── index.html
├── src/main.jsx
├── src/App.jsx
└── README.md
```

### package.json

**H5**：
```json
{
  "name": "项目名",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": { "dev": "vite", "build": "vite build" },
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

**PC**：`antd-mobile` 改为 `antd`、`@ant-design/icons`；main.jsx 用 `import 'antd/dist/antd.css'`。

### vite.config.js

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { target: 'esnext', assetsInlineLimit: 100000000 },
});
```

### 入口

**index.html**：viewport（H5 加 `viewport-fit=cover`）、`<div id="root"></div>`、`<script type="module" src="/src/main.jsx"></script>`。

**src/main.jsx**：
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Agentation } from 'agentation';
import 'antd-mobile/es/global';  // H5。PC 用 antd/dist/antd.css
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <><App /><Agentation /></>
);
```

### 要点

| 项 | 说明 |
|----|------|
| 使用 JSX | 直接写 `<Component />` |
| 直接 import | `import { TabBar, Button } from 'antd-mobile'` |
| TabBar 刘海屏 | `paddingBottom: 'env(safe-area-inset-bottom)'` |
| 菜单列表 | div + map（List/Cell 易空） |
| Agentation | 根节点必含 `<Agentation />`（package.json 已含依赖） |
| style | 必须对象 `style={{ padding: 16 }}`，禁止字符串 |

### 构建与输出

生成项目代码后**必须自动执行**：`cd {项目路径} && pnpm install && pnpm build`

告知用户：路径、打开 `dist/index.html`、演示密码 `123456`。

---

## 转化步骤

1. **任务拆解**：谁 + 场景 + 目标
2. **页面清单**：主流程 → 页面 / 弹层
3. **布局**：PC 用 `Layout` + `Sider`；H5 单列 + `TabBar` 或单页居中
4. **数据**：内联 Mock，`useState` 管理
5. **组件**：PC 用 `Form`、`Table`、`Menu`；H5 用 `TabBar`、`Button`、`Image`、`Toast`

## PC 套路

```jsx
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


---

## 参考

- Ant Design：https://ant.design/
- antd-mobile：https://mobile.ant.design/
- Agentation：https://github.com/benjitaylor/agentation
- 构建示例（GitHub）：
  - [H5 服装商城](https://github.com/343415207/prd-to-prototype/tree/main/skills/prd-to-prototype/demos/h5-clothing-mall)
  - [PC 运营管理系统](https://github.com/343415207/prd-to-prototype/tree/main/skills/prd-to-prototype/demos/pc-operations-system)

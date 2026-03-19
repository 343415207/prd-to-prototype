# PRD to Prototype

需求转原型 - 将需求或 PRD 转化为可点击原型（单 HTML，React + Ant Design，无构建）。

## 安装后

1. 按 `Cmd+Shift+P`（Mac）或 `Ctrl+Shift+P`（Windows）
2. 运行 **PRD to Prototype: Install Cursor Skill**
3. 重启 Cursor，skill 即生效

## 使用

在 Cursor 对话中说：

- 「帮我做一个 XX 的原型」
- 「PRD 转原型」
- 「为「项目名」做一个原型」

## 发布到 VS Code Marketplace (vsce)

1. **创建 Publisher**：打开 [marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage)，用 Microsoft 账号登录，Create publisher，填写 ID（如 `jiangjiankang`）和名称
2. **创建 PAT**：打开 [Azure DevOps → Personal Access Tokens](https://dev.azure.com/)，New Token，Scopes 勾选 Marketplace → Manage
3. **修改 package.json**：将 `your-publisher-id` 改为你的 Publisher ID，`repository.url` 改为你的 GitHub 仓库
4. **打包与发布**：

```bash
npm install -g @vscode/vsce
cd vscode-prd-to-prototype
vsce login your-publisher-id    # 输入 PAT
vsce package                     # 生成 .vsix（可本地安装测试）
vsce publish                     # 发布到 Marketplace
```

const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const os = require('os');

function activate(context) {
  const cmd = vscode.commands.registerCommand('prd-to-prototype.installSkill', async () => {
    const ext = context.extension;
    const skillSrc = path.join(ext.extensionPath, 'skills', 'prd-to-prototype');
    const skillDest = path.join(os.homedir(), '.cursor', 'skills', 'prd-to-prototype');

    if (!fs.existsSync(skillSrc)) {
      vscode.window.showErrorMessage('Skill source not found in extension.');
      return;
    }

    try {
      if (!fs.existsSync(path.dirname(skillDest))) {
        fs.mkdirSync(path.dirname(skillDest), { recursive: true });
      }
      copyRecursive(skillSrc, skillDest);
      vscode.window.showInformationMessage(
        `PRD to Prototype skill installed to ${skillDest}. Restart Cursor to load.`
      );
    } catch (err) {
      vscode.window.showErrorMessage(`Failed to install skill: ${err.message}`);
    }
  });

  context.subscriptions.push(cmd);
}

function copyRecursive(src, dest) {
  if (fs.statSync(src).isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const f of fs.readdirSync(src)) {
      copyRecursive(path.join(src, f), path.join(dest, f));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function deactivate() {}

module.exports = { activate, deactivate };

import * as vscode from "vscode";

const registerCommand = vscode.commands.registerCommand;
const showInformationMessage = vscode.window.showInformationMessage;

export function activate(context: vscode.ExtensionContext) {
  const disposable = registerCommand("extension.helloWorld", () => {
    showInformationMessage("Hello, world!");
  });
  context.subscriptions.push(disposable);
}

import { type ExtensionContext, commands, window } from "vscode";

export function activate(context: ExtensionContext) {
  // hello world command
  context.subscriptions.push(
    commands.registerCommand("extension.helloWorld", () => {
      window.showInformationMessage("Hello, world!");
    }),
  );
}

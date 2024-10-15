import { type ExtensionContext, commands, window } from "vscode";

import { validateIpOrHostname } from "./validate";

export function activate(context: ExtensionContext) {
  // hello world command
  context.subscriptions.push(
    commands.registerCommand("extension.helloWorld", () => {
      window.showInformationMessage("Hello, world!");
    }),
  );

  let vitaIp: string | undefined;

  // connect command
  context.subscriptions.push(
    commands.registerCommand("extension.connect", async () => {
      const result = await window.showInputBox({
        value: vitaIp,
        placeHolder: "For example: 192.168.1.10",
        validateInput: validateIpOrHostname,
      });
      if (!result) {
        window.showErrorMessage("Cancelled");
        return;
      }
      vitaIp = result;
      window.showInformationMessage(`Set Vita IP to ${vitaIp}`);
    }),
  );
}

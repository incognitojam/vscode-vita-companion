import { type ExtensionContext, type Terminal, commands, window } from "vscode";

import { validateIpOrHostname } from "./validate";

const PORT_NETCAT = 1338;

export function activate(context: ExtensionContext) {
  let vitaIp: string | undefined;
  let terminal: Terminal | undefined;

  function getTerminal() {
    if (!terminal) terminal = window.createTerminal("Vita Companion");
    return terminal;
  }

  // connect command
  context.subscriptions.push(
    commands.registerCommand("vitacompanion.connect", async () => {
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

  // reboot command
  context.subscriptions.push(
    commands.registerCommand("vitacompanion.reboot", () => {
      if (!vitaIp) {
        window.showErrorMessage("No Vita IP set");
        return;
      }
      const terminal = getTerminal();
      terminal.sendText(`echo reboot | nc ${vitaIp} ${PORT_NETCAT}`);
    }),
  );
}

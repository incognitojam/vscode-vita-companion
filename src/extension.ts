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

  // help command
  // TODO: parse output to detect which commands are available
  context.subscriptions.push(
    commands.registerCommand("vitacompanion.help", () => {
      if (!vitaIp) {
        window.showErrorMessage("No Vita IP set");
        return;
      }
      const terminal = getTerminal();
      terminal.sendText(`echo help | nc ${vitaIp} ${PORT_NETCAT}`);
      terminal.show();
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

  // screen commands
  context.subscriptions.push(
    commands.registerCommand("vitacompanion.screenOn", () => {
      if (!vitaIp) {
        window.showErrorMessage("No Vita IP set");
        return;
      }
      const terminal = getTerminal();
      terminal.sendText(`echo "screen on" | nc ${vitaIp} ${PORT_NETCAT}`);
    }),
  );
  context.subscriptions.push(
    commands.registerCommand("vitacompanion.screenOff", () => {
      if (!vitaIp) {
        window.showErrorMessage("No Vita IP set");
        return;
      }
      const terminal = getTerminal();
      terminal.sendText(`echo "screen off" | nc ${vitaIp} ${PORT_NETCAT}`);
    }),
  );
}

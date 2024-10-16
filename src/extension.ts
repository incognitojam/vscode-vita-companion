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

  function simpleCommand(command: string, showTerminal = false) {
    if (!vitaIp) {
      window.showErrorMessage("No Vita IP set");
      return;
    }
    const terminal = getTerminal();
    terminal.sendText(`echo "${command}" | nc ${vitaIp} ${PORT_NETCAT}`);
    if (showTerminal) terminal.show();
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
      simpleCommand("help", true);
    }),
  );

  // reboot command
  context.subscriptions.push(
    commands.registerCommand("vitacompanion.reboot", () => {
      simpleCommand("reboot");
    }),
  );

  // screen commands
  context.subscriptions.push(
    commands.registerCommand("vitacompanion.screenOn", () => {
      simpleCommand("screen on");
    }),
  );
  context.subscriptions.push(
    commands.registerCommand("vitacompanion.screenOff", () => {
      simpleCommand("screen off");
    }),
  );
}

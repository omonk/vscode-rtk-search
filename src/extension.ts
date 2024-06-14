import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "rtk-hook-search.find-endpoint-from-hook",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const runSearch = async (count = 0): Promise<unknown> => {
        const document = editor.document;
        await vscode.commands.executeCommand(
          "editor.action.smartSelect.expand"
        );

        const text = document.getText(editor.selection);
        const reg = new RegExp(/(use)(\w+)(Query|Mutation)/);

        const match = text.match(reg);

        if (match != null) {
          const [, , hookName] = match;

          return vscode.commands.executeCommand("editor.actions.findWithArgs", {
            searchString: hookName,
            isCaseSensitive: false,
          });
        }

        if (count < 3) {
          return runSearch(count++);
        } else {
          return vscode.window.showErrorMessage("Can't find the hook, sorry");
        }
      };
      await runSearch();
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

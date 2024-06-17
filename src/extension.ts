import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "rtk-hook-search.find-endpoint-from-hook",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const setSelectionTo = (selection: vscode.Selection) => {
        editor.selection = selection;
      };

      let originalSelection: vscode.Selection;

      const runSearch = async (count = 0): Promise<unknown> => {
        console.log("Run search");
        const document = editor.document;

        if (originalSelection == null) {
          originalSelection = editor.selection;
        }

        await vscode.commands.executeCommand(
          "editor.action.smartSelect.expand"
        );

        const text = document.getText(editor.selection);
        const reg = new RegExp(/(use)(\w+)(Query|Mutation)/);

        const match = text.match(reg);

        if (match != null) {
          const [, , hookName] = match;

          setSelectionTo(originalSelection);
          return vscode.commands.executeCommand("editor.actions.findWithArgs", {
            searchString: hookName,
            isCaseSensitive: false,
          });
        }

        if (count < 3) {
          // If it can't find the hook then run it again, causing the expansion to expand
          return runSearch(count + 1);
        } else {
          setSelectionTo(originalSelection);
          return showNotification("Can't find the hook, sorry", 2000);
        }
      };

      await runSearch();
    }
  );

  function showNotification(message: string, duration: number) {
    vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification },
      async progress => {
        const steps = 100;
        const delay = duration / steps;

        for (let i = 0; i <= steps; i++) {
          await new Promise<void>(resolve => {
            setTimeout(() => {
              progress.report({ increment: 1, message: message });
              resolve();
            }, delay);
          });
        }
      }
    );
  }
  context.subscriptions.push(disposable);
}

export function deactivate() {}

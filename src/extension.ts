// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "MoveFile2AnyDirectory" is now active!');
	{
		// The command has been defined in the package.json file
		// Now provide the implementation of the command with registerCommand
		// The commandId parameter must match the command field in package.json
		for (let i = 1; i <= 7; i++) {
			const command = 'com.sun.MoveFile2AnyDirectory' + i;
			let disposable = vscode.commands.registerCommand(command, () => {
				const targetConfig = vscode.workspace.getConfiguration().get<string>(command);
				if (!targetConfig) {
					vscode.window.showErrorMessage('MoveFile2AnyDirectory:Undefined config');
					return;
				}
				const getDestPath = () => {
					if (targetConfig.includes(':')) {
						const filePath = vscode.window.activeTextEditor!.document.fileName;
						const destPath = targetConfig + '\\' + (filePath.split('\\').reverse()[0]);
						return destPath;
					} else {
						const rootPath = vscode.workspace.rootPath;
						const filePath = vscode.window.activeTextEditor!.document.fileName;
						const destPath = rootPath + '\\' + targetConfig + '\\' + (filePath.split('\\').reverse()[0]);
						return destPath;
					}
				};
				const destPath = getDestPath();
				vscode.workspace.fs.rename(vscode.Uri.file(vscode.window.activeTextEditor!.document.fileName), vscode.Uri.file(destPath));
				vscode.window.showInformationMessage(destPath);
			});
			context.subscriptions.push(disposable);
		}
	}
}

// this method is called when your extension is deactivated
export function deactivate() { }

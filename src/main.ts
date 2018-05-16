/// <reference path="./index.d.ts" />
import * as vscode from "vscode";
import {
	LanguageClient, LanguageClientOptions,
	ServerOptions
} from 'vscode-languageclient';
import { spawn } from "child_process";

let LMC_PATH = "lmc";
export async function activate(context: vscode.ExtensionContext) {
	const serverOptions: ServerOptions = () => {
		const spawned = spawn(LMC_PATH, ["server"]);
		spawned.stdout.on("data", (data) => {
			if (data instanceof Buffer) {
				console.log(data.toString());
			} else {
				console.log(data)
			}
		})
		spawned.stderr.on("data", (data) => {
			if (data instanceof Buffer) {
				console.error(data.toString());
			} else {
				console.error(data)
			}
		})
		return Promise.resolve(spawned)
	};
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{scheme: 'file', language: 'lm'}],
		synchronize: {
			// Synchronize the setting section 'lspSample' to the server
			configurationSection: 'lms'
		}
	};
	const client = new LanguageClient(
		'lms', 'LM language server', serverOptions, clientOptions
	);
	const disposable =
		client.start();

	context.subscriptions.push(disposable);

	console.log("Activating extension...");
}

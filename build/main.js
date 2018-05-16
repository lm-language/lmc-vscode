"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageclient_1 = require("vscode-languageclient");
const child_process_1 = require("child_process");
let LMC_PATH = "lmc";
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const serverOptions = () => {
            const spawned = child_process_1.spawn(LMC_PATH, ["server"]);
            spawned.stdout.on("data", (data) => {
                if (data instanceof Buffer) {
                    console.log(data.toString());
                }
                else {
                    console.log(data);
                }
            });
            spawned.stderr.on("data", (data) => {
                if (data instanceof Buffer) {
                    console.error(data.toString());
                }
                else {
                    console.error(data);
                }
            });
            return Promise.resolve(spawned);
        };
        const clientOptions = {
            // Register the server for plain text documents
            documentSelector: [{ scheme: 'file', language: 'lm' }],
            synchronize: {
                // Synchronize the setting section 'lspSample' to the server
                configurationSection: 'lms'
            }
        };
        const client = new vscode_languageclient_1.LanguageClient('lms', 'LM language server', serverOptions, clientOptions);
        const disposable = client.start();
        context.subscriptions.push(disposable);
        console.log("Activating extension...");
    });
}
exports.activate = activate;

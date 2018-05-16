'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
let argv = process.argv.slice(2);
const firstArg = argv.shift();
let port;
if (firstArg === undefined) {
    throw new Error('Expected port as the first argument');
}
else {
    port = firstArg;
}
let client = new net.Socket();
client.setEncoding('utf8');
process.stdout.setEncoding('utf8');
process.stdin.setEncoding('utf8');
let isConnected = false;
client.on('data', (data) => {
    process.stdout.write(data.toString());
});
process.stdin.on('readable', () => {
    let chunk = process.stdin.read();
    if (chunk !== null) {
        if (isConnected) {
            client.write(chunk);
        }
        else {
            client.on('connect', () => {
                client.write(chunk);
            });
        }
    }
});
client.on('error', (err) => {
    if (!isConnected) {
        startConnection();
    }
});
function startConnection() {
    setTimeout(() => {
        client.connect(port, () => {
            isConnected = true;
        });
    }, 1000);
}
startConnection();

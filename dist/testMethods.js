"use strict";
// tslint:disable:no-console
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = require("./websocket");
exports.method1 = (req, res) => {
    console.log('method1 - ');
    console.log(req);
    res.send('Hello World!');
};
exports.method2 = (req, res) => {
    console.log('method2 - ');
    console.log(req);
    res.send('Hello Route!');
};
exports.postMsg = (req, res, wsClients) => {
    for (const wsClient of wsClients) {
        websocket_1.sendMessage(wsClient.wsClient, JSON.stringify(req.body));
    }
    res.send();
};
//# sourceMappingURL=testMethods.js.map
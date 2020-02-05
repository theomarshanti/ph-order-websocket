"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
exports.handleMessage = (msg) => {
    console.log(`handleMessage - msg=${msg}`);
};
exports.sendMessage = (wsClient, msg) => {
    wsClient.send(msg);
};
exports.handleError = (event, wsClient) => {
    console.log(`error - event=${event} - id = ${wsClient.id}`);
    exports.removeElement(wsClient);
};
exports.handleClose = (event, wsClient) => {
    console.log(`close - event=${event} - id = ${wsClient.id}`);
    exports.removeElement(wsClient);
};
exports.removeElement = (wsClient) => {
    const index = index_1.wsClients.findIndex((ws) => ws.id === wsClient.id);
    if (index > -1) {
        index_1.wsClients.splice(index, 1);
    }
    ;
    console.log(`remove - id=${wsClient.id} - index=${index} - new Size=${index_1.wsClients.length}`);
};
//# sourceMappingURL=websocket.js.map
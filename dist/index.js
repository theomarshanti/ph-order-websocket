"use strict";
// tslint:disable:no-console
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// I. Imports
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const testMethods = __importStar(require("./testMethods"));
const pubsub_1 = require("./pubsub");
const websocket_1 = require("./websocket");
const body_parser_1 = __importDefault(require("body-parser"));
// II. Environment Configuration
dotenv_1.default.config();
const apiPort = process.env.SERVER_PORT;
const wsPort = process.env.WS_PORT;
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// III. Launch & Configure WebSocket Server
const wsServer = new ws_1.Server({ port: Number(wsPort) });
console.log(`Websocket server is listening on port ${wsPort}`);
exports.wsClients = [];
let count = 1000;
wsServer.on('connection', (_wsClient) => {
    const webSocketContainer = {
        id: count,
        wsClient: _wsClient
    };
    webSocketContainer.wsClient.onerror = (ev) => websocket_1.handleError(ev, webSocketContainer);
    webSocketContainer.wsClient.onclose = (ev) => websocket_1.handleClose(ev, webSocketContainer);
    exports.wsClients.push(webSocketContainer);
    console.log(`New connection - id=${count} - # subscribers = ${exports.wsClients.length}`);
    count++;
});
// IV. Launch PubSub Listener
let subscription;
pubsub_1.listenForMessages().then((_sub) => {
    console.log(`Connected to PubSub... listening for Messages`);
    subscription = _sub;
    subscription.on('message', (msg) => pubsub_1.messageHandler(msg, exports.wsClients));
});
// V. (Temp) Test Routes
app.get('/', testMethods.method1);
app.get('/help', testMethods.method2);
app.post('/msg', (req, res) => {
    console.log('msg hit. wsClient - ');
    testMethods.postMsg(req, res, exports.wsClients);
    return;
});
// VI. Launch REST Server
const server = app.listen(apiPort, () => {
    console.log(`server started at http://localhost:${apiPort}`);
});
// VII. Garbage Collection -
server.on('close', () => {
    pubsub_1.terminateMessageListener(subscription);
});
//# sourceMappingURL=index.js.map
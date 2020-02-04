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
const testMethods = __importStar(require("./testMethods"));
const pubsub_1 = require("./pubsub");
// II. Environment Configuration
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
const app = express_1.default();
// III. (Temp) Test Routes
app.get('/', testMethods.method1);
app.get('/help', testMethods.method2);
// IV. Listen to PubSub
let subscription;
pubsub_1.listenForMessages().then((_sub) => {
    subscription = _sub;
});
// V. Launch Server
const server = app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
// VI. Garbage Collection - 
server.on('close', () => {
    pubsub_1.terminateMessageListener(subscription);
});
//# sourceMappingURL=index.js.map
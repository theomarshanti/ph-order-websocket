// tslint:disable:no-console

// I. Imports
import dotenv from "dotenv";
import express from 'express';
import * as testMethods from './testMethods';
import {listenForMessages, terminateMessageListener} from './pubsub';
import { Subscription } from "@google-cloud/pubsub";
import { Server } from "ws";

// II. Environment Configuration
dotenv.config();
const apiPort = process.env.SERVER_PORT;
const wsPort = process.env.WS_PORT;
const app = express();

// III. (Temp) Test Routes
app.get('/', testMethods.method1);
app.get('/help', testMethods.method2)

// IV. Launch PubSub Listener
let subscription: Subscription;
listenForMessages().then((_sub) => {
    subscription = _sub;
});

// V. Launch WebSocket Server
const wsServer = new Server({port: Number(wsPort)});
console.log(`Websocket server is listening on port ${wsPort}`);


// VI. Launch REST Server
const server = app.listen( apiPort, () => {
    console.log( `server started at http://localhost:${ apiPort }` );
} );

// VII. Garbage Collection - 
server.on('close', () => {
    terminateMessageListener(subscription);
})

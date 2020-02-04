"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-console
const pubsub_1 = require("@google-cloud/pubsub");
const constants_1 = require("./constants");
const pubSubClient = new pubsub_1.PubSub();
function listenForMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('listenForMessages');
        const subscription = pubSubClient.subscription(constants_1.subscriptionName);
        subscription.on('message', messageHandler);
        return subscription;
    });
}
exports.listenForMessages = listenForMessages;
function terminateMessageListener(subscription) {
    console.log('terminateMessageListener');
    subscription.removeListener('message', messageHandler);
    return;
}
exports.terminateMessageListener = terminateMessageListener;
const messageHandler = (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    // "Ack" (acknowledge receipt of) the message
    message.ack();
};
//# sourceMappingURL=pubsub.js.map
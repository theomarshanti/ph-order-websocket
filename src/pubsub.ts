// tslint:disable:no-console
import {PubSub, Subscription} from '@google-cloud/pubsub';
import {subscriptionName} from './constants';

const pubSubClient = new PubSub();

export async function listenForMessages() {
    console.log('listenForMessages');
    const subscription = pubSubClient.subscription(subscriptionName);
    subscription.on('message', messageHandler);
    return subscription;
}

export function terminateMessageListener(subscription:Subscription) {
    console.log('terminateMessageListener');
    subscription.removeListener('message', messageHandler)
    return;
}

const messageHandler = (message: any) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);

    // "Ack" (acknowledge receipt of) the message
    message.ack();
};


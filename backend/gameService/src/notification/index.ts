import { Server } from "socket.io";
import stompit from "stompit";
import { ConnectOptions } from "stompit/lib/connect";

export const initNotification = (io: Server, connectOptions: ConnectOptions) => {
stompit.connect(connectOptions, (error, client) => {
    if (error) {
        console.error('Connection error: ' + error.message);
        return;
    }

    const subscribeHeaders = {
        'destination': 'fr.cpe.nodejs-app.in',
        'ack': "client-individual",
    };

    client.subscribe(subscribeHeaders, (error, message) => {
        if (error) {
            console.error('Subscription error: ' + error.message);
            return;
        }

        message.readString('utf-8', (error, body?: string) => {
            if (error) {
                console.error('Failed to read message: ' + error.message);
                return;
            }
            console.log('Received message: ' + body);
            let data = JSON.parse(body ?? "");
            io.emit('notification', data);
            client.ack(message);
        });
    });
});
}





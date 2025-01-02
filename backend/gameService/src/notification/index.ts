import {Server} from "socket.io";
import stompit from "stompit";
import {ConnectOptions} from "stompit/lib/connect";
import userRepository from "../socket/userRepository";

export const initNotification = (io: Server, connectOptions: ConnectOptions) => {
    stompit.connect(connectOptions, (error, client) => {
        if (error) {
            console.error("Connection to borker error: " + error.message);
            return;
        }
        console.log("Connected to broker");

        const subscribeHeaders = {
            "destination": "fr.cpe.nodejs-app.in",
            "ack": "client-individual"
        };

        client.subscribe(subscribeHeaders, (error, message) => {
            if (error) {
                console.error("Subscription error: " + error.message);
                return;
            }

            message.readString("utf-8", (error, body?: string) => {
                if (error) {
                    console.error("Failed to read message: " + error.message);
                    return;
                }
                console.log("Received message: " + body);
                let data = JSON.parse(body ?? "");
                if (data?.sender === "card-generator") {
                    const user = userRepository.getUser(data.userId);
                    if (user === undefined) {
                        console.error("UserSocket " + data.userId + " not found");
                        return;
                    }
                    io.to(user.socketId).emit("cardGenerated", data.message);
                } else {
                    io.emit("notification", data);
                }
                client.ack(message);
            });
        });
    });
};

export const postInQueue = (data: any, connectOptions: ConnectOptions, dtoType: string) => {
    stompit.connect(connectOptions, (error, client) => {
        if (error) {
            console.error('Connection error: ' + error.message);
            return;
        }
        const frame = client.send({
            'destination': 'CHAT-QUEUE',
            'type': dtoType,
        });
        frame.write(JSON.stringify(data));
        frame.end();
        client.disconnect();
    });
}






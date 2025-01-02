import { createConnection } from 'node:net';
import stompit from 'stompit';

// Create a raw TCP connection
const socket = createConnection({ host: '192.168.1.3', port: 61613 });

// Wrap the socket to intercept raw data
socket.on('data', (chunk) => {
  console.log('Raw Data Received:');
  console.log(chunk.toString()); // Logs raw STOMP frame
});

socket.on('error', (err) => {
  console.error('Socket error:', err);
});

socket.on('close', () => {
  console.log('Socket closed');
});

// Pass the socket to stompit
stompit.connect(
  { host: "192.168.1.3", port:61613, connectHeaders: { host: '/', login: 'myuser', passcode: 'mypwd' } },
  (error, client) => {
    if (error) {
      console.error('Connection error:', error.message);
      return;
    }

    console.log('Connected to STOMP broker');

    // Send a message
    const frame = client.send({ destination: '/queue/test' });
    frame.write('Hello, STOMP!');
    frame.end();

    // Subscribe to a queue
    client.subscribe({ destination: '/queue/test', ack: 'auto' }, (err, message) => {
      if (err) {
        console.error('Subscription error:', err.message);
        return;
      }

      console.log('Message Received:');
      console.log(`Command: ${message.command}`);
      console.log('Headers:', message.headers);

      message.readString('utf-8', (err, body) => {
        if (err) {
          console.error('Read Error:', err.message);
        } else {
          console.log('Body:', body);
        }
      });
    });
  }
);


const stompit = require('stompit');

const connectOptions = {
  host: '192.168.1.3',
  port: 61613,
  connectHeaders: {
    host: '/',
    login: 'myuser',
    passcode: 'mypwd',
  }
};

stompit.connect(connectOptions, (error, client) => {
  if (error) {
    console.error('Connection error:', error.message);
    return;
  }

  client.subscribe({ destination: '/queue/test', ack: 'client-individual' }, (error, message) => {
    if (error) {
      console.error('Subscribe error:', error.message);
      return;
    }

    message.readString('utf-8', (error, body) => {
      if (error) {
        console.error('Read message error:', error.message);
        return;
      }

      console.log('Received message:', body);
      client.ack(message);
    });
  });
});

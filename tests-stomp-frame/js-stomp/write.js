const stompit = require('stompit');

const connectOptions = {
  host: '192.168.1.3',
  port: 61613,
  connectHeaders: {
    host: '/',
    login: 'myuser',
    passcode: 'mypwd'
  }
};

stompit.connect(connectOptions, (error, client) => {
  if (error) {
    console.error('Connection error:', error.message);
    return;
  }

  const sendHeaders = {
    destination: 'GENERATION-IMAGE-INPUT',
    'content-type': 'text/plain'
  };

  const frame = client.send(sendHeaders);
  frame.write('Hello, STOMP!');
  frame.end();

  console.log(frame._writes[0].chunk.toString())
  

  client.disconnect();
});

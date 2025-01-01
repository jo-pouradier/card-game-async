# Projet Architecture des S.I.2

- [Projet Architecture des S.I.2](#projet-architecture-des-si2)
  - [Membres :](#membres-)
  - [Lien du projet :](#lien-du-projet-)
  - [Activités réalisées par les personnes du groupe](#activités-réalisées-par-les-personnes-du-groupe)
    - [Pierre-Louis TELEP](#pierre-louis-telep)
    - [Hugues FARTHOUAT](#hugues-farthouat)
    - [Adrien DALBEIGUE](#adrien-dalbeigue)
    - [Joseph POURADIER DUTEIL](#joseph-pouradier-duteil)
  - [Elements réalisés](#elements-réalisés)
  - [Elements non réalisés](#elements-non-réalisés)
  - [Roadmap](#roadmap)
  - [Github CI](#github-ci)
  - [STOMP](#stomp)

## Membres :

- **Pierre-Louis TELEP**
- **Hugues FARTHOUAT**
- **Adrien DALBEIGUE**
- **Joseph POURADIER DUTEIL**

## Lien du projet :

[Video démo](https://youtu.be/AratjDDY58Y)
[Projet gitlab](https://gitlab.com/cpelyon/4ETI-2024-2025-ASI-2/groupe-7/atelier1)
[Projet github](https://github.com/jo-pouradier/card-game-async)

## Activités réalisées par les personnes du groupe

### Pierre-Louis TELEP

- Creation des microservices de genération
- Mise en place du proxy et docker-compose
- Mise en place du logger pour le broker

### Hugues FARTHOUAT

- Travail sur le backend Monolithique :
  - Chat
  - DTO
  - Login
  - Store
  - card generator
- Travaux sur les microservices de génération

### Adrien DALBEIGUE

- Travail sur nodejs mise en place des sockets:
  - Socket du chat
  - Socket du combat
  - Socket du jeu
- Gestion des room eet match making

### Joseph POURADIER DUTEIL

- Front end
- Nodejs socket
- gatling simulation (monolitique)

## Elements réalisés

- Mise en place d'une interface pour jouer et le chat
- Mise en place du match making
- Sauvegarde des logs sur le broker
- mise en place du proxy

## Elements non réalisés

- Pendant le jeu, il n'y a pas d'energie pour jouer

## Roadmap

J'ai envie de tester la difference de performance entre le monolitique en java et en Go.
Pour cela on utilisera gatling pour simuler des utilisateurs/du traffic. Et on visualisera les performances de chaque solution dans Grafana/Prometheus.

## Github CI

## STOMP

I got a lot of truble with the stomp protocol:  
With the js librart stompit I got no issue passing the message to the broker and read it in java. The TextMessage is well received.  
But when i send a message with the go package go-stomp, it is parsed a BytesMessage.

I tried to change the content-type of the message, but it didn't change anything.

So I made some research about the stomp and JMS protocol. And compared the frames created by the two libraries:
With stompit:
```
Command: MESSAGE
Headers: {
  expires: '0',
  destination: '/queue/test',
  subscription: '1',
  priority: '4',
  'message-id': 'ID:f61b9fbb07ad-41815-1735584783348-3:34:-1:1:1',
  'content-type': 'text/plain',
  timestamp: '1735764298315'
}
Body: Hello, STOMP!
```
With go-stomp:
```
Command: MESSAGE
Headers: {
  'content-length': 13,
  expires: '0',
  destination: '/queue/test',
  subscription: '1',
  priority: '4',
  'message-id': 'ID:f61b9fbb07ad-41815-1735584783348-3:35:-1:1:1',
  'content-type': 'text/plain',
  timestamp: '1735764310899'
}
Body: Hello, STOMP!
```

The only noticable difference is the `content-length` header.
So I forked the project and deleted the line that add the `content-length` header.


Data read from java spring:
from stompit:
```
ActiveMQTextMessage {
  commandId = 3,
  responseRequired = false,
  messageId = ID:f61b9fbb07ad-41815-1735584783348-3:44:-1:1:1,
  originalDestination = null,
  originalTransactionId = null,
  producerId = ID:f61b9fbb07ad-41815-1735584783348-3:44:-1:1,
  destination = queue://GENERATION-IMAGE-INPUT,
  transactionId = null,
  deliveryTime = 0,
  expiration = 0,
  timestamp = 1735765286268,
  arrival = 0,
  brokerInTime = 1735765286269,
  brokerOutTime = 1735765286269,
  correlationId = null,
  replyTo = null,
  persistent = false,
  type = null,
  priority = 4,
  groupID = null,
  groupSequence = 0,
  targetConsumerId = null,
  compressed = false,
  userID = null,
  content = null,
  marshalledProperties = org.apache.activemq.util.ByteSequence@6af0496a,
  dataStructure = null,
  redeliveryCounter = 0,
  size = 0,
  properties = {content-type=text/plain},
  readOnlyProperties = true,
  readOnlyBody = true,
  droppable = false,
  jmsXGroupFirstForConsumer = false,
  text = Hello, STOMP!}; {}
```
from go-stomp:
```
ActiveMQBytesMessage {
  commandId = 3,
  responseRequired = false,
  messageId = ID:f61b9fbb07ad-41815-1735584783348-3:48:-1:1:1,
  originalDestination = null,
  originalTransactionId = null,
  producerId = ID:f61b9fbb07ad-41815-1735584783348-3:48:-1:1,
  destination = queue://GENERATION-IMAGE-INPUT,
  transactionId = null,
  deliveryTime = 0,
  expiration = 0,
  timestamp = 1735765420955,
  arrival = 0,
  brokerInTime = 1735765420957,
  brokerOutTime = 1735765420958,
  correlationId = null,
  replyTo = null,
  persistent = false,
  type = null,
  priority = 4,
  groupID = null,
  groupSequence = 0,
  targetConsumerId = null,
  compressed = false,
  userID = null,
  content = org.apache.activemq.util.ByteSequence@14014932,
  marshalledProperties = org.apache.activemq.util.ByteSequence@5e46a8f9,
  dataStructure = null,
  redeliveryCounter = 0,
  size = 0,
  properties = {content-type=text/plain},
  readOnlyProperties = true,
  readOnlyBody = true,
  droppable = false,
  jmsXGroupFirstForConsumer = false
}   ActiveMQBytesMessage{ bytesOut = null,
  dataOut = null,
  dataIn = java.io.DataInputStream@12c8f68e }; {}
```
with jo-pouradier/stomp:
```
ActiveMQTextMessage {
  commandId = 3,
  responseRequired = false,
  messageId = ID:f61b9fbb07ad-41815-1735584783348-3:60:-1:1:1,
  originalDestination = null,
  originalTransactionId = null,
  producerId = ID:f61b9fbb07ad-41815-1735584783348-3:60:-1:1,
  destination = queue://GENERATION-IMAGE-INPUT,
  transactionId = null,
  deliveryTime = 0,
  expiration = 0,
  timestamp = 1735766285617,
  arrival = 0,
  brokerInTime = 1735766285617,
  brokerOutTime = 1735766285617,
  correlationId = null,
  replyTo = null,
  persistent = false,
  type = null,
  priority = 4,
  groupID = null,
  groupSequence = 0,
  targetConsumerId = null,
  compressed = false,
  userID = null,
  content = null,
  marshalledProperties = org.apache.activemq.util.ByteSequence@15431a52,
  dataStructure = null,
  redeliveryCounter = 0,
  size = 0,
  properties = {content-type=text/plain},
  readOnlyProperties = true,
  readOnlyBody = true,
  droppable = false,
  jmsXGroupFirstForConsumer = false,
  text = Hello,
  STOMP GO!}; {}
```
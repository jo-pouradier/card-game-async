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
  - [Broker mesage](#broker-mesage)

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

## Broker mesage

from go: {"cardId":19,"imagePrompt":"o","imgUrl":"","generationType":"IMAGE"}
from java:  {"cardId":1,"imagePrompt":"","imgUrl":"https://media.istockphoto.com/id/1440592316/vector/king-of-diamonds-playing-card-classic-design.jpg?s=612x612&w=0&k=20&c=oDqEFXm84DSEYkL4BhgxdY5yfLw51o4zkL52YovqZrY=","generationType":"IMAGE"}
 {"cardId":1,"textPrompt":"t","text":"This is a super description","generationType":"TEXT"}
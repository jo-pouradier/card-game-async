FROM openjdk:17-jdk-slim

WORKDIR /app

COPY ./target/generation-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8083
EXPOSE ${PORT}

ENTRYPOINT ["java", "-jar", "app.jar"]
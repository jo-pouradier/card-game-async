FROM openjdk:17-jdk-slim

WORKDIR /app

COPY ./target/Logger*.jar app.jar

ENV PORT=8083
EXPOSE ${PORT}

ENTRYPOINT ["java", "-jar", "app.jar"]
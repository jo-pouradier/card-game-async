FROM openjdk:17
RUN mkdir -p /app/SP
WORKDIR /app/SP
COPY ./target/backendmarket-monolithic-0.0.1-SNAPSHOT.jar app.jar
CMD ["java","-jar","app.jar"]

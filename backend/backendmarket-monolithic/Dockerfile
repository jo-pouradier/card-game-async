FROM openjdk:17
RUN mkdir -p /app/SP
WORKDIR /app/SP
COPY ./target/backendmarket*.jar app.jar
CMD ["java","-jar","app.jar"]

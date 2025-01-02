mvn package -DskipTests=true -f backendmarket-monolithic/pom.xml
BROKER_ADDRESS="tcp://192.168.1.3:61616" bash -c 'java -jar backendmarket-monolithic/target/backendmarket-monolithic-0.0.1-SNAPSHOT.jar'

mvn package -f generation/pom.xml
GENERATION_TYPE=TEXT BROKER_ADDRESS="tcp://192.168.1.3:61616" bash -c 'java -jar generation/target/generation-1.0-SNAPSHOT.jar'

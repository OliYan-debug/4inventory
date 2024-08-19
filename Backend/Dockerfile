FROM openjdk:17-jdk-slim

WORKDIR /app

COPY 4inventory-api/target/4inventory-api-0.0.1.jar /app/app.jar

EXPOSE 5000

ENTRYPOINT ["java", "-jar", "app.jar"]
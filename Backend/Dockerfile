FROM maven:3.8.4-openjdk-17-slim AS build

WORKDIR /app

COPY 4inventory-api/pom.xml .

COPY 4inventory-api/src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/4inventory-api-0.0.1.jar /app/app.jar

EXPOSE 5000

ENTRYPOINT ["java", "-jar", "app.jar"]
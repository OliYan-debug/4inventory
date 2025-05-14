FROM maven:3.9.9-amazoncorretto-21-alpine AS build

WORKDIR /app

COPY 4inventory-api/pom.xml .

COPY 4inventory-api/src ./src

RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim

WORKDIR /app

COPY --from=build /app/target/4inventory-api-1.0.0.jar /app/app.jar

EXPOSE 5000

ENTRYPOINT ["java", "-jar", "app.jar"]
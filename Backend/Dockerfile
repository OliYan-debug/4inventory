FROM maven:3.9.9-amazoncorretto-21-alpine AS build

WORKDIR /app

COPY 4inventory-api/pom.xml .

COPY 4inventory-api/src ./src

RUN mvn clean package -DskipTests

FROM amazoncorretto:21-alpine-jdk

WORKDIR /app

COPY --from=build /app/target/4inventory-api-latest.jar /app/app.jar

EXPOSE 5000

ENTRYPOINT ["java", "-jar", "app.jar"]

<p align="center">
<img width="400" src="Frontend/4inFrontend/src/assets/logo.svg">
</p>



## How to Run This APP

To <b>get started</b> with this APP, you need to have Docker installed. Docker is the only requirement for now.


### Setup Environment Variables

1. **Create a `.env` File**

   In the root folder where the `docker-compose.yml` files are located, create a `.env` file.

2. **Set Environment Variables**

   Add the following variables to your `.env` file:
   ```env
   # Your database credentials you can change it

   DATABASE=4inventory
   USERNAME=4inventory
   PASSWORD=4inventory
   ```
   Replace `4inventory` with your desired Database credentials.

   Next, add the following configuration to the `.env` file:
   
   `Note: Only CHANGE THIS if you know exactly what you are doing. otherwise you can break the whole setup`

   ```env
   # Postgres Settings just change if you know what you are doing

   POSTGRES_DB=${DATABASE}
   POSTGRES_USER=${USERNAME}
   POSTGRES_PASSWORD=${PASSWORD}

   # Spring POM.xml settings just change if you know what you are doing

   SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/${DATABASE}
   SPRING_DATASOURCE_USERNAME=${USERNAME}
   SPRING_DATASOURCE_PASSWORD=${PASSWORD}
   ```


### Running the APP

1. **Start the Application**

   Run the following command to build and start the Docker containers:

   ```bash
   docker compose up -d --build
   ```

   This command will build the Docker images and start the containers

2. **Access the Application**

   The application will be running on port `3000`. You can access it at:

   ```
   http://localhost:3000
   ```

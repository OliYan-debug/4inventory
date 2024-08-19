# 4Inventory API
# Project TODO
- [x] Support for docker hosting the API
- [x] How to run the API in the readme
- [ ] Routes tests
- [ ] Error handling


## How to Run This API

To get started with this API, you need to have Docker installed. Docker is the only requirement for now.

### Setup Environment Variables

1. **Create a `.env` File**

   In the root folder where the `Dockerfile` and `docker-compose.yml` files are located, create a `.env` file.

2. **Set Environment Variables**

   Add the following variables to your `.env` file:

   ```env
   POSTGRES_PASSWORD=SUPERSECRET
   POSTGRES_USERNAME=SUPERADMIN
   ```
   Replace `SUPERSECRET` and `SUPERADMIN` with your desired PostgreSQL credentials.

   Next, add the following configuration to the `.env` file:

   ```env
   SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/${POSTGRES_DB}
   SPRING_DATASOURCE_USERNAME=${POSTGRES_USERNAME}
   SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}
   ```



### Running the API

1. **Navigate to the Project Directory**

   Open your terminal and navigate to the root folder of the API:

   ```bash
   cd Backend/
   ```

2. **Start the Application**

   Run the following command to build and start the Docker containers:

   ```bash
   docker compose up -d --build
   ```

   This command will build the Docker images and start the containers

3. **Access the Application**

   The application will be running on port `5000`. You can access it at:

   ```
   http://localhost:5000
   ```



<p align="center">
<img width="400" src="Frontend/4inFrontend/src/assets/logo.svg">
</p>
<div align="center">
    <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
    <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres" />
    <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" alt="Spring" />
</div>
<div align="center">
    <br/>
    <h3>Readme Version</h3>
    <a href="#">English</a>
    <span>|</span>
    <a href="#">PT-BR</a>
</div>

# What is 4Inventory

A simple yet powerful inventory system to help people organize their items in an easy and modern way

## How to Run This APP

To <b>get started</b> with this APP, you need to have Docker installed. Docker is the only requirement for now.


### Setup Environment Variables

1. **Rename or copy `.env-example` to `.env` File**

   In the root folder where the `docker-compose.yml` files are located
   
3. **Set Environment Variables**

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
   # Your API url (default: http://localhost:5000)

   VITE_API_URL=http://localhost:5000

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
3. On the initial access, you have two options: register as a normal user or log in using the default admin credentials provided below:
   - username: `admin`
   - password: `admin123`

## Preview
<h3>Login Page</h3>
<img src="https://i.imgur.com/31B5LTu.png" alt="Login Page"/>
<h3>Products Page</h3>
<img src="https://i.imgur.com/9j67DzX.png"/>
<h3>New product</h3>
<img src="https://i.imgur.com/Uw2QXdD.png"/>
<h3>Operations Registry</h3>
<img src="https://i.imgur.com/WpRwTRg.png"/>

## 🚀 Development Team:
- [André Luis](https://github.com/aandreluis) - Frontend and Design 🖌️
- [Yan Oliveira](https://github.com/Oliyan-debug) - Backend and DevOps 💻

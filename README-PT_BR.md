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
    <h3>Versão README</h3>
    <a href="https://github.com/OliYan-debug/4inventory/blob/main/README.md">Inglês</a>
    <span>|</span>
    <a href="https://github.com/OliYan-debug/4inventory/blob/main/README-PT_BR.md">PT-BR</a>
</div>

# O que é o 4Inventory

Um simples mas também poderoso inventório que busca fazer seu inventário de uma forma moderna

## Como rodar esse APP

Para <b>Iniciar</b> com este app, somente será necessário instalar o docker no seu dispositivo.


### Configurando ás variáveis de ambiente

1. **Renomei ou faça a copia do `.env-example` para o arquivo `.env`**

   este arquivo está localizado na pasta root onde o `docker-compose.yml` fica
   
3. **Variáveis de ambiente**

   Adicione as seguintes váriaveis para seu arquivo `.env`:
   ```env
   # Suas credencias do banco de dados (Você pode mudar isso)

   DATABASE=4inventory
   USERNAME=4inventory
   PASSWORD=4inventory
   ```
   Substitua `4inventory` com suas credenciais desejadas

   No próximo passo, adicione ás variáveis abaixo no seu arquivo `.env`:
   
   `Nota: Somente mude essas configurações se você sabe extamente o que você está fazendo, caso contrário pode quebrar a configuração do APP`

   ```env
   # Sua API url (default: http://localhost:5000)

   VITE_API_URL=http://localhost:5000

   # Configurações do DB (Só mude se saber o que está fazendo)

   POSTGRES_DB=${DATABASE}
   POSTGRES_USER=${USERNAME}
   POSTGRES_PASSWORD=${PASSWORD}

   # Configurações do POM.xml no spring (Só mude se saber o que está fazendo)

   SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/${DATABASE}
   SPRING_DATASOURCE_USERNAME=${USERNAME}
   SPRING_DATASOURCE_PASSWORD=${PASSWORD}

   TIMEZONE = America/Bahia # Mude para o seu fuso horário

   ```


### Rodando o APP

1. **Inciando a aplicação**

   Execute o seguinte comando na pasta root para fazer o build e rodar o container docker:

   ```bash
   docker compose up -d --build
   ```

   Este comando é responsável por criar a imagem docker e rodar ela

2. **Acessando a aplicação**

   A aplicação estará rodando na porta `3000`. você poderá acessar ela através do link abaixo:

   ```
   http://localhost:3000
   ```
3. No primeiro acesso, você terá duas opções fazer o cadastro como um user normal ou entrar como admin com as credenciais abaixo:
   - usuário: `admin`
   - senha: `admin123`

## Preview
<h3>Página de login</h3>
<img src="https://i.imgur.com/31B5LTu.png" alt="Login Page"/>
<h3>Página de produtos (Inventário)</h3>
<img src="https://i.imgur.com/9j67DzX.png"/>
<h3>Novo produto</h3>
<img src="https://i.imgur.com/Uw2QXdD.png"/>
<h3>Registro das operações</h3>
<img src="https://i.imgur.com/WpRwTRg.png"/>

## 🚀 Time de desenvolvedores:
- [André Luis](https://github.com/aandreluis) - Frontend e Design 🖌️
- [Yan Oliveira](https://github.com/Oliyan-debug) - Backend e DevOps 💻

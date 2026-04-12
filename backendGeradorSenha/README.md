🔐 Backend Gerador de Senhas

API REST desenvolvida com Spring Boot para autenticação de usuários utilizando JWT (JSON Web Token).

🚀 Tecnologias utilizadas

Java 21

Spring Boot 3

Spring Security

Spring Data JPA

MySQL

JWT (io.jsonwebtoken)

Maven

📦 Funcionalidades

Cadastro de usuário (/signup)

Login com geração de token (/signin)

Autenticação com JWT

⚙️ Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

Java 21+

Maven (ou usar mvnw)

MySQL

🛠️ Configuração do banco de dados

Crie o banco no MySQL:

CREATE DATABASE GeradorSenha;

🔧 Configuração da aplicação

Arquivo: application.properties

spring.application.name=backendGeradorSenha

spring.datasource.url=jdbc:mysql://localhost:3306/GeradorSenha

spring.datasource.username=root

spring.datasource.password=Root

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql=true


jwt.secret=minhaChaveSuperSecretaMuitoGrande123456789

▶️ Como rodar o projeto

🔹 Opção 1 (recomendado)

./mvnw spring-boot:run

🔹 Opção 2

mvn clean install

mvn spring-boot:run

🌐 Acessando a API


Após rodar o projeto:



http://localhost:8080


🔐 Autenticação com JWT


📌 1. Criar usuário


POST /signup


{
  "nome": "Seu Nome",  
  "email": "email@email.com",  
  "senha": "123",
  "repetirSenha": "123"
}

📌 2. Fazer login

POST /signin

{
  "email": "email@email.com",
  "senha": "123"
}

Resposta:

{
  "token": "SEU_TOKEN_AQUI"
}

📁 Estrutura do projeto

controller/

service/

repository/

model/

security/

config/

util/

dto/

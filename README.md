# 🔐 Gerador de Senhas Full Stack

Um aplicativo completo (Full Stack) para geração e gerenciamento de senhas seguras. O sistema permite que o usuário crie uma conta, faça login, gere senhas aleatórias e salve-as com segurança em um banco de dados, podendo consultar seu histórico a qualquer momento.

---

## ✨ Funcionalidades

- **Autenticação:** Cadastro de novos usuários e Login com segurança utilizando tokens JWT.
- **Geração de Senha:** Gera senhas fortes e aleatórias.
- **Gerenciador de Senhas:**
  - Salva a senha gerada atrelada à conta do usuário (com nome/descrição, ex: "Netflix").
  - Histórico de senhas onde o usuário pode consultar as senhas que já salvou.
  - Ocultar/Mostrar senhas com um clique.
  - Copiar a senha para a área de transferência rapidamente.
  - Excluir senhas antigas ou que não são mais necessárias.

---

## 💻 Tecnologias Utilizadas

O projeto é dividido em Front-end, Back-end e Banco de Dados, totalmente em contêineres:

- **Front-end:** React Native com [Expo](https://expo.dev/) (App mobile/web).
- **Back-end:** Java 17 + Spring Boot (API REST, Spring Security, JWT).
- **Banco de Dados:** MySQL 8.0.
- **Infraestrutura:** Docker e Docker Compose.

---

## 🚀 Como executar o projeto

Certifique-se de ter o **Docker** e **Docker Compose** instalados na sua máquina.

### 1. Clone ou baixe o repositório
\`\`\`bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd "Gerador Full"
\`\`\`

### 2. Suba a aplicação com o Docker
Na pasta raiz do projeto (onde está localizado o arquivo `docker-compose.yml`), execute:
\`\`\`bash
docker-compose up -d --build
\`\`\`

Isso iniciará três serviços automaticamente:
- **Banco de Dados (MySQL):** na porta `3307`
- **Back-end (Spring Boot):** na porta `8080` (Acesso API: `http://localhost:8080`)
- **Front-end (Expo/React Native):** na porta `8081` (Acesso Web: `http://localhost:8081`)

### 3. Acessando a aplicação
Após constatar que os contêineres subiram com sucesso:
- **Pelo Navegador (Web):** Acesse `http://localhost:8081`
- **Pelo Celular:** Você pode instalar o aplicativo **Expo Go**, conectar-se à mesma rede Wi-Fi e utilizar os comandos do Expo. (Certifique-se que o IP da sua máquina local esteja configurado corretamente no \`axios\` do ambiente front-end e no \`CorsConfig\` do Spring).

---

## 📁 Estrutura do Projeto

- `/frontGeradorSenha`: Código fonte do Aplicativo (React Native + Expo). Os componentes das telas ficam em `/screens` e a comunicação com a API em `/service`.
- `/backendGeradorSenha`: Código da API (Spring Boot). A lógica de negócio e os controllers REST ficam em `/src/main/java/...`.
- `docker-compose.yml`: Arquivo de orquestração responsável por juntar Banco, API e App.


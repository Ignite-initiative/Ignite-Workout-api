# Ignite Workout API

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/Ignite-initiative/Ignite-Workout-api">
    <img src="images/logo.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">Ignite Workout API</h3>

  <p align="center">
    API para gerenciamento de treinos, progressão de carga e acompanhamento de performance.
    <br />
    <a href="https://github.com/Ignite-initiative/Ignite-Workout-api"><strong>Documentação »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Ignite-initiative/Ignite-Workout-api/issues/new?labels=bug&template=bug-report---.md">Reportar Bug</a>
    &middot;
    <a href="https://github.com/Ignite-initiative/Ignite-Workout-api/issues/new?labels=enhancement&template=feature-request---.md">Sugerir Funcionalidade</a>
  </p>
</div>

---

## 📖 Sobre o Projeto

O **Ignite Workout API** é uma aplicação backend desenvolvida em **Node.js + TypeScript**, que permite:
 
- 🏋️ Criação e gerenciamento de treinos e exercícios.  
- 📊 Cálculo de progressão de carga com base nos treinos realizados.  
- 📈 Gráficos de evolução de peso corporal, carga e frequência de treino.  


<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Jest](https://jestjs.io/) (para testes)

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

---

## 🚀 Começando

### 📋 Pré-requisitos

- Docker

### ⚙️ Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/Ignite-initiative/Ignite-Workout-api.git
   ```
2. Instale as dependências
   ```sh
   npm install
   ```
3. Configure o banco de dados no arquivo `.env`
   ```env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
JWT_SECRET_KEY=secretkey
   ```
4. Rode a aplicação
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

---

## 📌 Uso

Após iniciar a aplicação, a API estará disponível em:

```
http://localhost:3333
```

## 🛣️ Roadmap

- [x] Autenticação com JWT  
- [x] Cadastro de usuários  
- [x] CRUD de treinos e exercícios  
- [ ] Gráficos de progresso (carga, peso, frequência)  
- [ ] Integração com IA para treinos personalizados  
- [ ] Suporte a múltiplos idiomas  

Veja os [issues abertos](https://github.com/Ignite-initiative/Ignite-Workout-api/issues) para mais informações.

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

---

## 🤝 Contribuindo

1. Faça um Fork do projeto  
2. Crie uma Branch para sua feature (`git checkout -b feature/NovaFeature`)  
3. Commit suas mudanças (`git commit -m 'feat: Minha nova feature'`)  
4. Envie para a Branch (`git push origin feature/NovaFeature`)  
5. Abra um Pull Request  

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

---

## 📜 Licença

Distribuído sob a licença **MIT**. Veja `LICENSE` para mais informações.

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

---

## 📬 Contato

Projeto: [Ignite Workout API](https://github.com/Ignite-initiative/Ignite-Workout-api)

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

---

## 🙏 Agradecimentos

- [Prisma ORM Docs](https://www.prisma.io/docs)  
- [Express Docs](https://expressjs.com/)  
- [Jest Docs](https://jestjs.io/)  
- [Shields.io](https://shields.io)  


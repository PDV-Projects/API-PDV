---
# API-PDV

API para um sistema de Ponto de Venda (PDV), desenvolvida com [NestJS](https://nestjs.com/).

## 📋 Descrição

Esta API tem como objetivo fornecer as funcionalidades essenciais para um sistema de PDV, incluindo autenticação, gerenciamento de usuários, controle de caixa, carrinho de compras, cadastro de empresas, entre outros módulos.

> ⚠️ **Projeto em desenvolvimento**

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- Node.js
- Typescript
- MongoDB (via Mongoose)
- JWT (JSON Web Tokens)

## 📁 Estrutura do Projeto

- `src/modules/` — Módulos principais da aplicação (auth, users, business, cart, cash-register)
- `src/database/` — Schemas e configurações do banco de dados
- `src/common/` — Middlewares, guards, pipes e interceptors
- `src/utils/` — Constantes e helpers

## ⚙️ Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd API-PDV
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias, por exemplo:
     ```
     PORT=3000
     DATABASE_URL=mongodb://localhost:27017/pdv
     JWT_SECRET=sua_chave_secreta
     JWT_EXPIRES_IN=1d
     ```

4. **Inicie a aplicação:**
   ```bash
   npm run start:dev
   # ou
   pnpm start:dev
   ```

## 🧪 Testes

Para rodar os testes unitários:
```bash
npm run test
```
Para testes end-to-end:
```bash
npm run test:e2e
```

## 📚 Documentação da API

Quando a aplicação estiver rodando, acesse a documentação interativa (Swagger) em:
```
http://localhost:3000/api
```

## 🔑 Principais Endpoints

- `POST /auth/login` — Autenticação de usuário
- `POST /auth/refresh` — Renovação de token
- `GET /auth/profile` — Perfil do usuário autenticado
- `GET /users` — Listagem de usuários (protegido)
- `POST /business` — Cadastro de empresa
- `POST /cart` — Gerenciamento de carrinho
- `POST /cash-register` — Operações de caixa

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está sob licença MIT.
---
Se quiser, posso já atualizar o arquivo README.md com esse novo conteúdo. Confirma?

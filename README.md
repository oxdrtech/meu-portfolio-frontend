# Meu Portfólio Frontend

Este é o meu site de portfólio, desenvolvido para apresentar meus projetos, habilidades e experiência como desenvolvedor.

O site foi criado com foco em performance e fluidez, utilizando boas práticas de desenvolvimento, como componentização, separação de responsabilidades e containerização.

A integração com o backend é feita por meio de requisições **REST** para um servidor **NestJS**, que gerencia os contatos enviados pelo formulário. Assim que um novo contato é salvo, um webhook é disparado para um canal do **Discord**, permitindo o acompanhamento em tempo real.

O deploy do frontend foi realizado em uma **VPS da Hostinger**, garantindo maior controle sobre o ambiente e otimização de recursos. O backend também está hospedado de forma independente, assegurando a separação de responsabilidades.

Caso tenha interesse em saber mais sobre meu trabalho, entre em contato:

- **LinkedIn:** [linkedin.com/in/oxdrtech](https://linkedin.com/in/oxdrtech)

---

## Tecnologias Utilizadas

- **Next.js 15** - Framework React para aplicações otimizadas
- **TypeScript** - Tipagem estática para maior segurança no código
- **Mantine Dev** - Biblioteca para estilização rápida e responsiva
- **GSAP** - Biblioteca para animações fluidas e interativas
- **NextAuth** - Autenticação segura para área privada
- **NestJS (Backend)** - API desenvolvida para gestão de contatos
- **PostgreSQL** - Banco de dados para armazenar os contatos
- **Docker** - Ambiente isolado para desenvolvimento e deploy

## Funcionalidades

- Apresentação do meu perfil profissional
- Formulário de contato integrado com backend
- Envio automático e em tempo real de contatos recebidos para um canal do Discord via Webhook
- Área privada protegida por autenticação NextAuth.js para gerenciamento de leads

---

# Guia de Desenvolvimento

## 🛠️ Configuração do Ambiente Local

### 📌 Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- [Node.js 22](https://nodejs.org/)
- [Docker e Docker Compose](https://www.docker.com/)

### 📥 Clonando o Repositório

Independente do ambiente (desenvolvimento ou produção), primeiro clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/oxdrtech/meu-portfolio-frontend.git
```

```bash
cd meu-portfolio-frontend
```

---

### 🚀 Passo a Passo para Desenvolvimento

1. **Instale as dependências**

```bash
npm install
```

2. **Configure as variáveis de ambiente**

```bash
cp .env.dev.example .env
```

3. **Inicie os serviços**

#### 🏗️ Opção 1: Executar a aplicação localmente com o Next.js

- Para iniciar o servidor de desenvolvimento, utilize:

```bash
npm run dev
```

#### 🏗️ Opção 2: Executar a aplicação dentro do Docker

- Inicie todos os serviços via Docker Compose:

```bash
docker-compose up -d
```

4. **Testar a aplicação**

- Acesse [http://localhost:3000](http://localhost:3000) para verificar o funcionamento.

---

## 🔥 Testando o Ambiente de Produção Localmente

Caso queira testar a versão de produção do seu frontend, siga os passos abaixo:

1. **Configure as variáveis de ambiente**

```bash
cp .env.prod.example .env
```

> **Observação:** Nessa etapa, preencha corretamente as variáveis no arquivo `.env`.

2. **Construa a imagem Docker para produção**

```bash
docker build -t meu-portfolio-frontend-prod --target production .
```

3. **Execute o container de produção**

```bash
docker run -d -p 3000:3000 --name portfolio-frontend-prod meu-portfolio-frontend-prod
```

Se tudo estiver correto, o aplicativo estará rodando em [http://localhost:3000](http://localhost:3000).

4. **Verifique o funcionamento**

```bash
curl http://localhost:3000/api/health
```

O retorno esperado é:

```json
{ "status": "OK" }
```

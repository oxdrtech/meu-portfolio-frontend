# meu-portfólio-frontend

Este é o meu site de portfólio, desenvolvido para apresentar meus projetos, habilidades e experiência como desenvolvedor.

## Tecnologias Utilizadas

- **Next.js 15** - Framework React para aplicações otimizadas
- **TypeScript** - Tipagem estática para mais segurança no código
- **Mantine Dev** - Estilização rápida e responsiva
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

## Desenvolvimento

O site foi desenvolvido com foco em performance e fluidez, utilizando boas práticas de desenvolvimento como componentização e separação de responsabilidades.

A integração com o backend foi feita através de requisições **REST** para um servidor **NestJS**, que gerencia os contatos enviados pelo formulário. Assim que um novo contato é salvo, um webhook é disparado para um canal do **Discord**, permitindo acompanhamento em tempo real.

O deploy do frontend foi realizado em uma **VPS da Hostinger**, garantindo maior controle sobre o ambiente e otimização de recursos. O backend também está hospedado de forma independente, garantindo separação de responsabilidades.

## Contato

Caso tenha interesse em saber mais sobre meu trabalho, entre em contato:

- **LinkedIn:** [linkedin.com/in/oxdrtech](https://linkedin.com/in/oxdrtech)

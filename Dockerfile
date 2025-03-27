# Estágio base comum
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Estágio de desenvolvimento
FROM base AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Estágio de construção
FROM base AS builder
ENV NODE_ENV=production
COPY . .
RUN npm run build

# Estágio de produção
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copia o .env para o container
COPY .env ./

# Copiar apenas arquivos necessários do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Segurança adicional
RUN apk --no-cache add curl
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["npm", "run", "start"]

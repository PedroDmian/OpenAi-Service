# 1. Usa una imagen de node
FROM node:20-alpine AS builder

# 2. Directorio de trabajo
WORKDIR /app

# 3. Copiar package.json y package-lock.json
COPY package*.json ./

# 4. Instalar TODAS las dependencias (incluyendo devDependencies como typescript)
RUN npm install

# 5. Copiar el resto del proyecto
COPY . .

# 6. Compilar TypeScript
RUN npm run build:prod

# 7. Ahora crea una segunda etapa solo con producción
FROM node:20-alpine

WORKDIR /app

# Solo copias node_modules de producción y el dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expone el puerto que uses
EXPOSE 3000

# Comando final
CMD ["node", "dist/infrastructure/server.js"]

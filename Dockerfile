# Étape 1 : Build de l'application Electron
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Étape 2 : Création de l'image finale pour exécuter l'app Electron
FROM node:18-alpine

WORKDIR /app

# Installe les dépendances nécessaires à Electron
RUN apk add --no-cache \
  xvfb \
  libx11 \
  libxcomposite \
  libxdamage \
  libxext \
  libxfixes \
  libxi \
  libxtst \
  libnss \
  libxrandr \
  libasound \
  libatk \
  libgtk-3.0 \
  nss \
  chromium

COPY --from=builder /app ./

# Lance l'application Electron
CMD ["npx", "electron", "."]

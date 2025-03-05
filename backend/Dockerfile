# Utiliser l'image officielle de Node.js en version alpine (légère)
FROM node:alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Exposer le port utilisé par le serveur
EXPOSE 5174

# Définir la commande pour démarrer le serveur
CMD ["npm", "run", "dev"]

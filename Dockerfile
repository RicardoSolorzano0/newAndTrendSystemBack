# Usar la imagen base de Node.js con la versión 20.17.0
FROM node:20.17.0

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos el archivo package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias de Node.js
RUN npm install

# Copiamos el resto de los archivos del proyecto al contenedor
COPY . .

# Copiamos el archivo .env al contenedor
COPY .env .env

# Exponemos el puerto 5000 para el backend
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]

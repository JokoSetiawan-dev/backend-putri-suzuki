# Gunakan base image resmi
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy semua source code
COPY . .

# Jalankan aplikasi
CMD ["node", "src/server.js"]

# Port yang dibuka oleh container
EXPOSE 3000
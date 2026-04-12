FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Expo default web port
EXPOSE 8081

# Command to run expo web
CMD ["npx", "expo", "start", "--web", "--port", "8081"]

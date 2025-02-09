# Use Node.js for building the app
FROM node:18 AS builder
WORKDIR /app

# Install dependencies and build the project
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Nginx to serve the frontend
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port for frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
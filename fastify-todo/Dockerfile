# Use Node.js as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire project
COPY . .

# Build TypeScript code inside the container
RUN npm run build

# Expose API port
EXPOSE 3000

# Start Fastify app
CMD ["node", "dist/index.js"]

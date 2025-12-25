# Development Dockerfile for Vite React app
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the development server port
EXPOSE 3000

# Set environment variable for Vite (Vite uses VITE_ prefix)
ENV VITE_API_URL=http://localhost:3001/api/v1

# Start the development server (Vite dev server)
CMD ["npm", "run", "dev"]

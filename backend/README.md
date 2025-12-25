# APP_NAME_PLACEHOLDER

Express TypeScript API with Swagger documentation and MongoDB integration.

## Features

- 🚀 Express.js with TypeScript
- 📚 Swagger/OpenAPI documentation with decorators
- ��️ MongoDB with Mongoose
- �� JWT authentication ready
- 🛡️ Security middleware (Helmet, CORS, Rate limiting)
- �� Structured logging
- 🐳 Docker & Docker Compose setup
- 🔍 ESLint configuration
- ⚡ Hot reload development

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (or use Docker)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo>
cd APP_NAME_PLACEHOLDER
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
npm start
```

### Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

## API Documentation

Once running, visit: http://localhost:3000/api-docs

## Project Structure

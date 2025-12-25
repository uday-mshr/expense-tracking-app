# Expense Tracking App

A full-stack MERN (MongoDB, Express, React, Node.js) expense tracking application with TypeScript, featuring a modern UI, comprehensive dashboard with charts, and Docker containerization.

## Features

- **Expense Management**: Add, edit, and delete expenses with descriptions, amounts, categories, and dates
- **Category Management**: Predefined categories (Food, Transport, Entertainment, etc.) plus custom categories with color coding
- **Advanced Dashboard**: 
  - Monthly summary with total expenses and average daily spending
  - Category breakdown with pie chart
  - Daily spending trends with line chart
  - Month/year filtering
- **RESTful API**: Express TypeScript backend with Swagger documentation
- **Modern UI**: React TypeScript frontend with responsive design
- **Docker Support**: Full containerization with Docker Compose
- **Nginx Reverse Proxy**: Production-ready reverse proxy setup

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Swagger/OpenAPI documentation
- Zod validation
- Helmet security
- Rate limiting

### Frontend
- React with TypeScript
- Vite (build tool and dev server)
- React Router
- Axios for API calls
- Recharts for data visualization
- React Hook Form with Zod validation
- Date-fns for date manipulation

### Infrastructure
- Docker & Docker Compose
- Nginx reverse proxy
- MongoDB database

## Project Structure

```
expense-tracking-app/
├── backend/              # Express TypeScript API
│   ├── src/
│   │   ├── controllers/ # API controllers
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # Express routes
│   │   ├── services/    # Business logic
│   │   ├── middleware/  # Custom middleware
│   │   └── utils/       # Utility functions
│   └── Dockerfile
├── frontend/            # React TypeScript app
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   └── types/       # TypeScript types
│   └── Dockerfile
├── nginx/               # Nginx configuration
├── docker-compose.yml   # Docker orchestration
└── README.md
```

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- MongoDB (or use Docker)

## Quick Start

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracking-app
```

2. Copy environment file:
```bash
cp .env.example .env
# Edit .env with your configuration if needed
```

3. Start all services:
```bash
docker-compose up -d
```

4. Access the application:
- Frontend: http://localhost
- Backend API: http://localhost/api/v1
- API Documentation: http://localhost/api-docs
- Mongo Express: http://localhost:8081

### Development Mode (Hot Reload)

For development with hot reload and better logging:

1. Start development services:
```bash
docker compose -f docker-compose.dev.yml up
```

2. Access the application:
- Frontend: http://localhost:3000 (React dev server with hot reload)
- Backend API: http://localhost:3001/api/v1
- API Documentation: http://localhost:3001/api-docs
- Mongo Express: http://localhost:8081

**Note**: Development mode includes:
- Hot reload for both frontend and backend
- Volume mounts for live code changes
- Enhanced logging for all services
- No Nginx reverse proxy (direct access to services)

### Local Development

#### Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

4. Start MongoDB (if not using Docker):
```bash
# Make sure MongoDB is running on localhost:27017
```

5. Start development server:
```bash
npm run dev
```

The backend will be available at http://localhost:3000

#### Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.example .env
# Edit VITE_API_URL if backend is on different port
```

4. Start development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:3000 (Vite dev server)

**Note**: The frontend uses Vite instead of Create React App for faster development and builds.

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:3000/api-docs (or http://localhost/api-docs when using Docker)

## Available Scripts

### Backend

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Frontend

- `npm run dev` - Start Vite development server (with hot module replacement)
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run preview` - Preview production build locally
- `npm start` - Alias for preview (preview production build)
- `npm test` - Run tests with Vitest

## Docker Commands

### Production Mode

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Rebuild containers
docker compose up -d --build

# View specific service logs
docker compose logs -f backend
docker compose logs -f frontend
```

### Development Mode

```bash
# Start development services with hot reload
docker compose -f docker-compose.dev.yml up

# View logs (all services with detailed output)
docker compose -f docker-compose.dev.yml logs -f

# View specific service logs
docker compose -f docker-compose.dev.yml logs -f backend
docker compose -f docker-compose.dev.yml logs -f frontend

# Stop development services
docker compose -f docker-compose.dev.yml down
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `CORS_ORIGIN` - Allowed CORS origin
- `SESSION_SECRET` - Session secret key
- `JWT_SECRET` - JWT secret key

### Frontend (.env)
- `VITE_API_URL` - Backend API URL (Vite uses `VITE_` prefix instead of `REACT_APP_`)

## Features in Detail

### Expense Management
- Create expenses with amount, description, category, and date
- Filter expenses by month, year, and category
- Edit and delete expenses
- View expenses in a clean card-based layout

### Category Management
- 8 predefined categories: Food, Transport, Entertainment, Shopping, Bills, Healthcare, Education, Other
- Create custom categories with custom colors
- Edit and delete custom categories (predefined categories are protected)

### Dashboard
- **Summary Cards**: Total expenses, average daily spending, days tracked, category count
- **Category Breakdown**: Pie chart showing expense distribution by category
- **Daily Spending**: Line chart showing daily spending trends
- **Month/Year Selector**: Filter dashboard data by specific month and year

## Architecture

```
┌─────────┐
│ Browser │
└────┬────┘
     │
     ▼
┌─────────┐
│  Nginx  │ (Reverse Proxy)
└────┬────┘
     │
     ├──────────┬──────────┐
     ▼          ▼          ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Frontend │ │ Backend │ │  Mongo  │
│ (React) │ │(Express)│ │   DB    │
└─────────┘ └─────────┘ └─────────┘
```

## Production Deployment

1. Update environment variables for production
2. Build and push Docker images
3. Deploy using Docker Compose or container orchestration platform
4. Configure Nginx for SSL/TLS
5. Set up MongoDB backups
6. Configure monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.


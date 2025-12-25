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

## Prerequisites

- Node.js 18+ and npm
- MongoDB (or use Docker)
- Docker and Docker Compose (optional, for containerized setup)

## Local Setup

### Option 1: Local Development (Without Docker)

This setup allows you to run the application directly on your machine with hot reload for faster development.

#### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

   Required environment variables:
   - `PORT` - Server port (default: 3000)
   - `MONGO_URI` - MongoDB connection string (e.g., `mongodb://localhost:27017/expense_tracker`)
   - `CORS_ORIGIN` - Allowed CORS origin (e.g., `http://localhost:5173`)
   - `SESSION_SECRET` - Session secret key
   - `JWT_SECRET` - JWT secret key (optional)
   - `API_VERSION` - API version (default: v1)

4. **Start MongoDB:**
   
   If you have MongoDB installed locally:
```bash
# Make sure MongoDB is running on localhost:27017
   # On macOS with Homebrew:
   brew services start mongodb-community
   
   # On Linux:
   sudo systemctl start mongod
   
   # Or use Docker to run MongoDB:
   docker run -d -p 27017:27017 --name mongodb mongo:6
   ```

5. **Start development server:**
```bash
npm run dev
```

   The backend will be available at `http://localhost:3000`
   - API endpoints: `http://localhost:3000/api/v1`
   - API Documentation: `http://localhost:3000/api-docs`

#### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
   # Edit VITE_API_URL to point to your backend
```

   Required environment variables:
   - `VITE_API_URL` - Backend API URL (e.g., `http://localhost:3000/api/v1`)

4. **Start development server:**
```bash
npm run dev
```

   The frontend will be available at `http://localhost:5173` (Vite default port)

**Note**: The frontend uses Vite instead of Create React App for faster development and builds. Vite typically runs on port 5173, not 3000.

### Option 2: Docker Compose Setup

This setup runs all services in containers, including MongoDB.

#### Development Mode (Hot Reload)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd expense-tracking-app
   ```

2. **Start all services:**
   ```bash
   docker compose up -d
   ```

3. **Access the application:**
   - Frontend: `http://localhost:3000` (React dev server with hot reload)
   - Backend API: `http://localhost:3001/api/v1`
   - API Documentation: `http://localhost:3001/api-docs`
   - Mongo Express: `http://localhost:8081`

**Note**: Development mode includes:
- Hot reload for both frontend and backend
- Volume mounts for live code changes
- Enhanced logging for all services
- No Nginx reverse proxy (direct access to services)

#### Production Mode

1. **Start all services:**
   ```bash
   docker compose up -d
   ```

2. **Access the application:**
   - Frontend: `http://localhost`
   - Backend API: `http://localhost/api/v1`
   - API Documentation: `http://localhost/api-docs`
   - Mongo Express: `http://localhost:8081`

### Docker Commands

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo

# Stop all services
docker compose down

# Rebuild containers
docker compose up -d --build

# Stop and remove volumes (clean slate)
docker compose down -v
```

## Project Structure

```
expense-tracking-app/
├── backend/                    # Express TypeScript API
│   ├── src/
│   │   ├── app.ts             # Express app configuration
│   │   ├── server.ts          # Server entry point
│   │   ├── config/
│   │   │   └── database.ts    # MongoDB connection configuration
│   │   ├── controllers/       # API controllers
│   │   │   ├── category.controller.ts
│   │   │   ├── dashboard.controller.ts
│   │   │   ├── expense.controller.ts
│   │   │   └── health.controller.ts
│   │   ├── models/            # Mongoose models
│   │   │   ├── category.model.ts
│   │   │   └── expense.model.ts
│   │   ├── routes/            # Express routes
│   │   │   ├── category.route.ts
│   │   │   ├── dashboard.route.ts
│   │   │   ├── expense.route.ts
│   │   │   └── health.route.ts
│   │   ├── services/          # Business logic layer
│   │   │   ├── category.service.ts
│   │   │   ├── dashboard.service.ts
│   │   │   └── expense.service.ts
│   │   ├── middleware/        # Custom middleware
│   │   │   ├── error.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   ├── utils/             # Utility functions
│   │   │   ├── logger.ts
│   │   │   ├── schema-loader.ts
│   │   │   ├── swagger.decorators.ts
│   │   │   └── swagger.util.ts
│   │   └── types/             # TypeScript type definitions
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/                   # React TypeScript app
│   ├── src/
│   │   ├── App.tsx            # Main app component with routing
│   │   ├── App.css
│   │   ├── index.tsx          # React entry point
│   │   ├── index.css          # Global styles
│   │   ├── components/        # Reusable UI components
│   │   │   ├── CategoryChart.tsx
│   │   │   ├── CategoryChart.css
│   │   │   ├── CategorySelector.tsx
│   │   │   ├── CategorySelector.css
│   │   │   ├── ExpenseCard.tsx
│   │   │   ├── ExpenseCard.css
│   │   │   ├── ExpenseForm.tsx
│   │   │   ├── ExpenseForm.css
│   │   │   ├── ExpenseList.tsx
│   │   │   ├── ExpenseList.css
│   │   │   ├── Layout.tsx
│   │   │   ├── Layout.css
│   │   │   ├── MonthlySummary.tsx
│   │   │   ├── MonthlySummary.css
│   │   │   ├── SpendingChart.tsx
│   │   │   └── SpendingChart.css
│   │   ├── pages/             # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Dashboard.css
│   │   │   ├── Expenses.tsx
│   │   │   ├── Expenses.css
│   │   │   ├── Categories.tsx
│   │   │   └── Categories.css
│   │   ├── services/          # API service layer
│   │   │   ├── api.ts         # Axios instance and interceptors
│   │   │   ├── categoryService.ts
│   │   │   ├── dashboardService.ts
│   │   │   └── expenseService.ts
│   │   ├── types/             # TypeScript type definitions
│   │   │   └── index.ts
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Utility functions
│   │   └── vite-env.d.ts      # Vite type definitions
│   ├── public/                # Static assets
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── ...
│   ├── Dockerfile
│   ├── nginx.conf             # Nginx configuration for production
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
│
├── nginx/                      # Nginx reverse proxy configuration
│   └── nginx.conf
│
├── docker-compose.yml          # Docker orchestration for all services
├── LICENSE
├── README.md
└── AI_USAGE.md
```

## Available Scripts

### Backend

- `npm run dev` - Start development server with hot reload (nodemon + ts-node)
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server (runs build first)
- `npm run lint` - Run ESLint
- `npm run clean` - Remove dist directory
- `npm test` - Run tests (Jest)

### Frontend

- `npm run dev` - Start Vite development server (with hot module replacement)
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run preview` - Preview production build locally
- `npm start` - Alias for preview (preview production build)
- `npm test` - Run tests with Vitest

## Environment Variables

### Backend (.env)

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/expense_tracker
MONGO_DB_NAME=expense_tracker
API_VERSION=v1
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
SESSION_SECRET=your-session-secret-key
JWT_SECRET=your-jwt-secret-key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api/v1
```

**Note**: Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

## API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:3000/api-docs` (local) or `http://localhost/api-docs` (Docker)

The API documentation is automatically generated from Swagger decorators in the controllers.

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
│  Nginx  │ (Reverse Proxy - Production)
└────┬────┘
     │
     ├──────────┬──────────┐
     ▼          ▼          ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Frontend │ │ Backend │ │  Mongo  │
│ (React) │ │(Express)│ │   DB    │
│  Vite   │ │  TS     │ │ Mongoose│
└─────────┘ └─────────┘ └─────────┘
```

### Backend Architecture

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and data processing
- **Models**: Mongoose schemas and database operations
- **Routes**: Express route definitions
- **Middleware**: Error handling, validation, security
- **Utils**: Swagger generation, logging, schema loading

### Frontend Architecture

- **Pages**: Top-level route components (Dashboard, Expenses, Categories)
- **Components**: Reusable UI components (forms, charts, cards)
- **Services**: API communication layer with Axios
- **Types**: Shared TypeScript interfaces and types
- **Hooks**: Custom React hooks (if any)
- **Utils**: Helper functions

## Production Deployment

1. **Update environment variables** for production
2. **Build Docker images**:
   ```bash
   docker compose build
   ```
3. **Deploy using Docker Compose** or container orchestration platform (Kubernetes, etc.)
4. **Configure Nginx** for SSL/TLS (HTTPS)
5. **Set up MongoDB backups** and monitoring
6. **Configure logging** and error tracking
7. **Set up CI/CD pipeline** for automated deployments

## Troubleshooting

### Backend Issues

- **MongoDB connection errors**: Ensure MongoDB is running and `MONGO_URI` is correct`
- **Port already in use**: Change `PORT` in `.env` or stop the process using the port
- **CORS errors**: Update `CORS_ORIGIN` in backend `.env` to match frontend URL

### Frontend Issues

- **API connection errors**: Verify `VITE_API_URL` points to the correct backend URL
- **Build errors**: Run `npm run build` to see TypeScript errors
- **Port conflicts**: Vite will automatically use the next available port

### Docker Issues

- **Container won't start**: Check logs with `docker compose logs <service-name>`
- **Volume permission errors**: Ensure Docker has proper permissions
- **Network issues**: Verify services are on the same Docker network

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

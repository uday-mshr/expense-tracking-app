import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { generateSwaggerSpec } from './utils/swagger.util';
import errorMiddleware from './middleware/error.middleware';
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

class App {
    public app: Application;
    public server: http.Server;
    public port: number;
    public apiVersion: string;

    constructor(controllers: any[], routes: { path: string, router: express.Router }[], port: number, apiVersion: string = 'v1') {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = port;
        this.apiVersion = apiVersion;

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger(controllers);
        this.initializeErrorHandling();
    }  

    private initializeMiddlewares() {
        // Security middleware
        this.app.use(helmet());
        
        // Compression middleware
        this.app.use(compression());
        
        // Rate limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
            message: {
                error: 'Too many requests from this IP, please try again later.'
            }
        });
        this.app.use('/api/', limiter);
        
        // Existing middleware
        this.app.use(cors());
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    }

    private initializeSwagger(controllers: any[]) {
        const swaggerSpec = generateSwaggerSpec(controllers);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    private initializeRoutes(routes: { path: string, router: express.Router }[]) {
        const apiPrefix = `/api/${this.apiVersion}`;
        routes.forEach((route) => {
            if (route && route.path && route.router) {
                this.app.use(`${apiPrefix}${route.path}`, route.router);
            } else {
                console.warn(`Route at path ${route?.path} is missing a 'path' or 'router' property.`);
            }
        });
        // Default route for service welcome
        this.app.get('/', (_req: Request, res: Response) => {
            res.send("Welcome to API service");
        });
    }

    private initializeErrorHandling() {
        // Use the centralized error handling middleware
        this.app.use(errorMiddleware);
    }

    public listen() {
        this.server.listen(this.port, () => {
            console.log(`App listening on http://localhost:${this.port}`);
        });
    }
}

export default App;

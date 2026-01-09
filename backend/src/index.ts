import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import inquiryRoutes from './routes/inquiries';
import certificateRoutes from './routes/certificates';
import testimonialRoutes from './routes/testimonials';
import settingsRoutes from './routes/settings';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.set('trust proxy', 1);
app.disable('x-powered-by');

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(compression());

const allowedOrigins = [
    process.env.FRONTEND_URL,
    ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []),
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8000',

]
    .map((o) => (o || '').trim())
    .filter(Boolean)
    .map((o) => o.replace(/\/$/, ''));

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            const normalized = origin.replace(/\/$/, '');
            if (allowedOrigins.some((allowed) => normalized === allowed || normalized.startsWith(allowed))) {
                return callback(null, true);
            }

            return callback(new Error('CORS_NOT_ALLOWED'));
        },
        credentials: true
    })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Basic 404
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err?.message === 'CORS_NOT_ALLOWED') {
        return res.status(403).json({ message: 'Not allowed by CORS' });
    }

    const status = typeof err?.status === 'number' ? err.status : 500;
    const message = process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err?.message || 'Internal Server Error';

    // eslint-disable-next-line no-console
    console.error(err);
    res.status(status).json({ message });
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const shutdown = (signal: string) => {
    console.log(`Received ${signal}. Shutting down...`);
    server.close(() => {
        process.exit(0);
    });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default app;

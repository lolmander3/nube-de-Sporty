// server.js
// ====================================================
// CONFIGURACIÓN DEL SERVIDOR EXPRESS
// ====================================================
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();

const corsOptions = {
    origin: 'https://49477e4d.nube-sporty-web.pages.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// ============================================
// IMPORTACIÓN DE RUTAS
// ============================================
const usersRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const studentRoutes = require('./routes/studentRoutes');

// ============================================
// MIDDLEWARES GLOBALES
// ============================================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// DOCUMENTACIÓN SWAGGER
// ============================================
const swaggerOptions = {
    swaggerOptions: {
        docExpansion: 'list',
        defaultModelsExpandDepth: -1,
        defaultModelExpandDepth: 1,
        displayRequestDuration: true,
        filter: false,
        layout: 'BaseLayout',
        showExtensions: true,
        showCommonExtensions: true,
        deepLinking: true,
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: function(a, b) {
            const methodOrder = { 'post': 1, 'get': 2, 'put': 3, 'delete': 4 };
            return methodOrder[a.get('method')] - methodOrder[b.get('method')];
        }
    }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

// ============================================
// RUTAS UNIFICADAS (ESTÁNDAR REST)
// ============================================
app.use('/api/users', usersRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);      // ← CAMBIADO A PLURAL
app.use('/api/schedules', scheduleRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/students', studentRoutes);

// ============================================
// ENDPOINTS DE PRUEBA
// ============================================
app.get('/', (req, res) => {
    res.json({
        message: 'API de Sporting Club',
        version: '1.0.0',
        status: 'online',
        endpoints: {
            docs: '/api-docs',
            users: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            schedules: '/api/schedules',
            tournaments: '/api/tournaments',
            students: '/api/students'
        }
    });
});

app.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Ruta de prueba funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// ============================================
// MANEJO DE ERRORES GLOBAL
// ============================================
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// ============================================
// MANEJO DE RUTAS NO ENCONTRADAS (404)
// ============================================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Ruta ${req.originalUrl} no encontrada`
    });
});
console.log(`========================================================================`);
console.log('Swagger disponible en: http://localhost:3000/api-docs');

module.exports = app;
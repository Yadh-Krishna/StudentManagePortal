import app from './src/app.js';
import pool from './src/infrastructure/database/config/database.js';
import Server from './src/infrastructure/database/server.js';
const port=process.env.PORT;

const server= new Server(app,pool);
server.startServer();

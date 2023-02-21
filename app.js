import express from 'express';
import cors from 'cors';
import router from './router/router.js';
import db from './database/db.js';
import login from "./router/login.js";
const app = express();

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', router);
app.use('/api/login', login);

db.createConnection()

export default app;
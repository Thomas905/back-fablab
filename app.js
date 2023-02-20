import express from 'express';
import cors from 'cors';
import router from './router/router.js';
import db from './database/db.js';

const app = express();

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', router);

db.createConnection()

export default app;
import express from 'express';
import dotenv from 'dotenv';

dotenv.config(process.cwd(), '.env');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});



export default router;
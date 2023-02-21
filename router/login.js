import express from 'express';
import dotenv from 'dotenv';

dotenv.config(process.cwd(), '.env');

const login = express.Router();

login.post('', async (req, res) => {

});

export default login;
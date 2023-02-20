import mysql from 'mysql2';
function createConnection() {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database: ' + err.stack);
            return;
        }

        console.log('Connected to database with ID: ' + connection.threadId);
    });

    return connection;
}

export default { createConnection };
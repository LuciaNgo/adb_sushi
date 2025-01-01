const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'Lucia.N123',
    server: 'localhost', // Ví dụ: 'localhost'
    database: 'QLNHAHANG',
    options: {
        encrypt: true, // Với Azure hoặc yêu cầu SSL
        trustServerCertificate: true, // Bỏ qua cảnh báo SSL nếu chạy local
    },
};

const connectToDatabase = async () => {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
    }
};

module.exports = connectToDatabase;

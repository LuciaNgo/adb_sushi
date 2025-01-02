const sql = require('mssql');

const config = {
    user: 'nhu',
    password: 'n11991999',
    server: 'localhost', // Ví dụ: 'localhost'
    database: 'QLNHAHANG',
    options: {
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
// server.js
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./db');
const sql = require('mssql')

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

/**
 * @typedef {Object} MenuItem
 * @property {string} MAMONAN
 * @property {string} TENMONAN
 * @property {number} GIA
 * @property {string} MUCTHUCDON
 * @property {boolean} GIAOHANG
 */

/**
 * @typedef {Object} UserInfo
 * @property {string} MAKHACHHANG
 * @property {string} HOTEN
 * @property {string} SDTKHACHHANG
 * @property {string} MATAIKHOAN
 */

/**
 * @typedef {Object} EmployeeInfo
 * @property {string} MANHANVIEN
 * @property {string} HOTEN
 * @property {string} MABOPHAN
 * @property {string} Role
 */

/**
 * @typedef {Object} SigninRequest
 * @property {string} sdt
 * @property {string} matkhau
 */

/**
 * @typedef {Object} CustomError
 * @property {string} message
 */

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
app.get('/', async (req, res) => {
  const pool = await connectToDatabase();
  try {
      const result = await pool.request().query('SELECT * FROM MONAN');
      /** @type {MenuItem[]} */
      const menuItems = result.recordset;
      res.json(menuItems);
  } catch (err) {
      res.status(500).json({error: 'Error fetching data'});
      console.error(err);
  }
});


/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
app.post('/signin', async (req, res) => {
    /** @type {SigninRequest} */
    const { sdt, matkhau } = req.body;
    console.log('Received sdt:', sdt, 'matkhau', matkhau);
    const pool = await connectToDatabase();
    try {
         const request = pool.request();
        request.input('sdt', sql.VarChar(20), sdt);
       request.input('matkhau', sql.VarChar(50), matkhau);
       const result = await request.execute('sp_DangNhapKhachHang');
        console.log('Stored procedure result:', result);
         if (result.recordset.length === 0) {
             res.status(401).json({error: "Invalid phone number or password"});
         } else {
           /**@type {UserInfo[] | EmployeeInfo[]}*/
           const userInfo = result.recordset;
           res.json(userInfo);
      }
     } catch (error) {
        /** @type {CustomError} */
       const customError = error;
       res.status(500).json({ error: customError.message });
       console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
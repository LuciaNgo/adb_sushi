// server.js
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./db');
const sql = require('mssql')

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


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

app.get('/menu/:maChiNhanh', async (req, res) => {
    const { maChiNhanh } = req.params;
    const pool = await connectToDatabase();
    try {
        const request = pool.request();
        request.input('maChiNhanh', sql.Char(8), maChiNhanh);
        const result = await request.execute('sp_ThucDonChiNhanh'); // Use stored procedure
        res.json(result.recordset);
    } catch (error) {
        /** @type {CustomError} */
        const customError = error;
        res.status(500).json({ error: customError.message });
        console.error(error);
    }
});

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

app.post('/booking', async (req, res) => {
    /** @type {BookingRequest} */
    const { SDTKHACHHANG, NHAHANG, NGAYDEN, GIODEN, SOLUONGKHACH, GHICHU } = req.body;

    console.log('Received booking request:', {
        SDTKHACHHANG,
        NHAHANG,
        NGAYDEN,
        GIODEN,
        SOLUONGKHACH,
        GHICHU
    });

    const pool = await connectToDatabase();
    try {
        const request = pool.request();
        request.input('SDTKHACHHANG', sql.VarChar(10), SDTKHACHHANG);
        request.input('NHAHANG', sql.Char(8), NHAHANG);
        request.input('NGAYDEN', sql.Date, NGAYDEN);

        // Parse the time string into a Date object for `sql.Time`
        const [hours, minutes] = GIODEN.split(':').map(Number);
        const timeForSQL = new Date();
        timeForSQL.setHours(hours, minutes, 0);

        request.input('GIODEN', sql.Time, timeForSQL);
        request.input('SOLUONGKHACH', sql.Int, SOLUONGKHACH);
        request.input('GHICHU', sql.NVarChar(50), GHICHU);

        const result = await request.execute('sp_ThemPhieuDatBann');
        console.log('Stored procedure result:', result);
        res.json(result.recordset);
    } catch (error) {
        /** @type {CustomError} */
        const customError = error;
        res.status(500).json({ error: customError.message });
        console.error(error);
    }
});


app.get('/menu', async (req, res) => {
  const pool = await connectToDatabase();
  try {
      const result = await pool.request().query('SELECT * FROM MONAN');
    res.json(result.recordset);
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
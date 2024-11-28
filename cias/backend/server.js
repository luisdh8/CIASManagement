const express = require('express'); //Install express using npm install express
const mysql = require('mysql'); //Install mysql using npm install mysql
const cors = require('cors'); //Install cors using npm install cors

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
});

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE username = ? AND password = ?';
    
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        console.log(data); // <-- Revisa qué devuelve la base de datos
        if (err) return res.json("Error");
        if (data.length > 0) {
            return res.json({ 
                message: "Login Successful", 
                role: data[0].role 
            });
        } else {
            return res.json("Invalid Credentials");
        }
    });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
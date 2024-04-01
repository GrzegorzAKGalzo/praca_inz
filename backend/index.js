const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('./db/connection.js')

const app = express()
const port = process.env.PORT || 5500;
const workFactor = 2;

var password = "123";

bcrypt.hash(password, workFactor, function(err, hash) {
    console.log(`Hash: ${hash}`);
  });


app.use(express.json())
app.use(cors({
    origin: true, // "true" will copy the domain of the request back
                  // to the reply. If you need more control than this
                  // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
}));
app.delete('/removeRepair/:id', async (req, res) => {
    console.log("Start removing");
    const id = req.params.id;
    const sql = 'DELETE FROM repairs WHERE id = ?';
    console.log(sql);
    db.query(sql, [id], async (err, result) => {

        if (err || result.affectedRows === 0) {
            console.log("Error Deleting repair: " + err)
            res.status(404).json({ success: false, message: "Error" })
        } else {
            res.json({ success: true, message: 'Successful DELETE' })
        }
    });
});
//Registration Endpoint
app.post('/register', async (req, res) => {
    console.log("Dodawanie Konta");
    const { username, password } = req.body;

    //Hash the Password
    console.log("Haszowanie hasla");

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Zhasowane");

    console.log(hashedPassword);

    const sql = 'INSERT INTO user (email, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            console.log("Error In Registration: " + err)
        } else {
            res.json({ message: "Registration successful" });
        }
    })
});

app.delete('/removeClient/:id', async (req, res) => {
    console.log("Start removing");
    const id = req.params.id;
    const sql = 'DELETE FROM client WHERE id = ?';
    console.log(sql);

    console.log(id);
    db.query(sql, [id], async (err, result) => {

        if (err || result.affectedRows === 0) {
            console.log("Error Deleting client: " + err)
            res.status(404).json({ success: false, message: "Error" })
        } else {
            res.json({ success: true, message: 'Successful DELETE' })
        }
    });
});

app.get('/client/:id', (req, res) =>{
    const id = req.params.id;

    const sql = "SELECT * from client WHERE id = ?";
    db.query(sql,[id], (err, result) =>{
        if(err){
            res.status(500).json({ message: 'Error Fetching clients' })
        } else {
            res.json(result);
        }
    });
});
app.get('/clientsCar/:id', (req, res) =>{
    const id = req.params.id;

    const sql = "SELECT * from cars WHERE client_id = ?";
    db.query(sql,[id], (err, result) =>{
        if(err){
            res.status(500).json({ message: 'Error Fetching clients cars' })
        } else {
            res.json(result);
        }
    });
});
app.get('/car/:id', (req, res) =>{
    const id = req.params.id;

    const sql = "SELECT * from cars WHERE id = ?";
    db.query(sql,[id], (err, result) =>{
        if(err){
            res.status(500).json({ message: 'Error Fetching clients' })
        } else {
            res.json(result);
        }
    });
});
app.get('/mechanic/:id', (req, res) =>{
    const id = req.params.id;

    const sql = "SELECT * from mechanic WHERE id = ?";
    db.query(sql,[id], (err, result) =>{
        if(err){
            res.status(500).json({ message: 'Error Fetching clients' })
        } else {
            res.json(result);
        }
    });
});
//Login Endpoint

app.post('/login', async (req, res) => {

    const { username, password } = req.body;


    const sql = 'SELECT * FROM user WHERE email = ?';

    db.query(sql, [username], async (err, result) => {

        if (err || result.length === 0) {
            console.log("Error Searching for username: " + err)
            res.status(404).json({ message: "No username found" })

        } else {
            const user = result[0];
            bcrypt.compare(password, user.password, function(err, result) {
                console.log(this.password);
                console.log(user.password);
                // Password matched
                if (result) {
                    const token = jwt.sign({ userId: user.id }, 'my_secret_key', { expiresIn: '1h' });
                    res.json({ message: 'Login Successful', token })
                }
                // Password not matched
                else {

                    res.status(401).json({ message: 'Invalid Password' })
                }
              });

         
        }
    })
});

app.post('/addClient', async(req, res) => {
    const { id, name, lastname, number, email, nip } = req.body;
    const sql = 'INSERT INTO client (name, lastname, number, email, nip) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, lastname, number, email, nip], async (err, result) => {
        if (err || result.length === 0) {
            console.log("Error adding Client: " + err)
        }  else {
            res.json({ message: 'Successful added Client'})
        }
    });
});
app.post('/addRepair', async(req, res) => {
    const { id, descript, status, mechanic, client, car, entryDate, leaveDate } = req.body;
    const sql = 'INSERT INTO repairs (descript, status, mechanic_id, client_id, car_id, entry_date, leave_date) VALUES (?, ?, ?, ?, ?, ?, ?)';
   
    db.query(sql, [descript, status, mechanic, client, car, entryDate, leaveDate], async (err, result) => {
        if (err || result.length === 0) {
            console.log("Error adding repair: " + err)
        }  else {
            res.json({ message: 'Successful added repair'})
        }
    });
});
app.put('/modifyClient', async(req, res) => {
    const { id, name, lastname, number, email, nip } = req.body;
    const sql = 'UPDATE client SET name=?, lastname=?, number=?, email=?, nip=? WHERE id=?';
    db.query(sql, [name, lastname, number, email, nip, id], async (err, result) => {
        if (err || result.length === 0) {
            console.log("Error modifying client: " + err);
            res.status(500).json({ message: "Error modifying client" });
        }  else {
            res.json({ message: 'Successful modify client' });
        }
    });
});
app.put('/modifyRepair', async(req, res) => {
    const { id, descript, status, mechanic, client, car, entryDate, leaveDate } = req.body;
    console.log(mechanic.id);

    const sql = 'UPDATE repairs SET descript = ?, status = ?, mechanic_id = ?, client_id = ?, car_id = ?, entry_date = ?, leave_date = ? WHERE id=?';
    console.log(sql);

    db.query(sql, [descript, status, mechanic.id, client.id, car.id, entryDate, leaveDate, id], async (err, result) => {
        if (err || result.length === 0) {
            console.log("Error modifying repair: " + err);
            res.status(500).json({ message: "Error modifying repair" });
        }  else {
            res.json({ message: 'Successful modify repair' });
        }
    });
});


// Product LIst endpont
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error Fetching Products' })
        } else {
            res.json(result);
        }
    })
})
app.get('/clientsList', (req, res) =>{
    const sql = "SELECT * from client";
    db.query(sql, (err, result) =>{
        if(err){
            res.status(500).json({ message: 'Error Fetching clients' })
        } else {
            res.json(result);
        }
    });
});

app.get('/repairList', (req, res) =>{
    const sql = "SELECT * from repairs";
    db.query(sql, (err, result) =>{
        if(err){
            res.status(500).json({ message: 'Error Fetching clients' })
        } else {
            res.json(result);
        }
    });
});


app.get('/mechanicList', (req, res) =>{
    const sql = "SELECT * from mechanic";
    db.query(sql, (err, result) =>{
        if(err){
            res.status(500).json({ message: 'Error Fetching clients' })
        } else {
            res.json(result);
        }
    });
});


app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error Fetching Products' })
        } else {
            res.json(result);
        }
    })
})





//Authentication Middleware using JWT
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    console.log("Unextracted Token: " + token)
 
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const extractedToken = token.split(' ')[1];
    console.log('Actual TOken: ' + extractedToken)
 
    try {
        // /verift and validate our token
        const decoded = jwt.verify(extractedToken, 'my_secret_key')
        req.userId = decoded.userId;
        next();
 
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" })
    }
 }
 
 

app.get('/profile', authenticate, (req, res)=>{
    const userId = req.userId;
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [userId], (err, result)=>{
        if (err || result.length === 0) {
            res.status(500).json({message: "Error Fetching Details"})
        }else{
            res.json({username: result[0].username});
        }
    })
 });
 


app.listen(port, () => {
    console.log('Server is running ✌🏾')
})
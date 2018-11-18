const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const SendEmail = require('../utils/sendemail')

const mysqlConnection = require('../database');

//Listar todos los users
router.get('/users', (req, res) => {
    mysqlConnection.query(`SELECT * from users INNER JOIN personalinfo 
    ON users.PersonalInfo_id = personalinfo.id`, (err, rows, fields) => {
            if (!err) {
                res.json(rows);
                console.log("Usuarios mostrados");
            } else {
                console.log(err);
            }
        });
});

//Buscar user por id
router.get('/users/:identification', (req, res) => {
    const { identification } = req.params;
    mysqlConnection.query(`SELECT * from users INNER JOIN personalinfo 
    ON users.PersonalInfo_id = personalinfo.id 
    where personalinfo.identification = ?`, [identification], (err, rows, fields) => {
            if (!err) {
                res.json(rows[0]);
                console.log("Usuario encontrado");
            } else {
                console.log(err);
            }
        });
});

//Registrar nuevo user
router.post('/users', (req, res) => {
    let { fullname, identification, email, phone, avatar, username, _password } = req.body;
    var hash = cryptr.encrypt(req.body._password);
    console.log(hash);
    _password = hash;
    const query = `
    CALL sp_add_user (?, ?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [fullname, identification, email, phone, avatar, username, _password], (err, rows, fields) => {
        if (!err) {
            SendEmail(fullname, email)
            res.json({ Status: true, message: 'User Saved ' });
        } else {
            res.json({ err });
        }
    });
});

//Actualizar user
router.put('/users/:identification', (req, res) => {
    const { fullname, email, phone, avatar, username, _password } = req.body
    const { identification } = req.params;
    var hash = cryptr.encrypt(req.body._password);
    console.log(hash);
    //_password = hash;
    const query = 'CALL sp_update_user (?, ?, ?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [fullname, identification, email, phone, avatar, username, hash], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: true, message: 'User Update' });
        } else {
            res.json({ err });
            console.log(err);
        }
    });
});

//Elimiar user
router.delete('/users/:identification', (req, res) => {
    const { identification } = req.params;
    mysqlConnection.query(`DELETE * from users INNER JOIN personalinfo 
    ON users.PersonalInfo_id = personalinfo.id 
    where personalinfo.identification = ?`, [identification], (err, rows, fields) => {
            if (!err) {
                res.json({ Status: 'User Deleted' });
                console.log("Usuario borrado");
            } else {
                console.log(err);
            }
        });
});

//login user
router.post('/users/login', (req, res) => {
    const { email, _password } = req.body;
    mysqlConnection.query(`SELECT * from users 
    INNER JOIN personalinfo ON users.PersonalInfo_id = personalinfo.id 
    where personalinfo.email = ?`, [email], (err, rows, fields) => {
            if (err) {
                console.log(err);
            } else {
                if (rows.length > 0) {
                    console.log(rows[0]._password);
                    var hash = cryptr.decrypt(rows[0]._password);
                    if (_password == hash) {
                        res.json({
                            Status: true, message:'successfully User..'
                        });
                    } else {
                        res.json({ Status: false, message: "Email or Password incorrect" });
                    }
                } else {
                    res.json({ Status: false, message: "Email does not exits" });
                    console.log(rows);
                }
            }
        });
});

// Cambiar estado
router.put('/users/state/:identification', (req, res) => {
    const { identification } = req.params;
    const query = 'CALL sp_state_update (?)';
    mysqlConnection.query(query, [identification], (err, rows, fields) => {
        if (!err) {
            const states = rows;

            if (states.affectedRows == 0)
                return res.json({ Status: false });

            return res.json({ Status: true });

        } else {
            res.json({ err });
        }
    });
});



module.exports = router;
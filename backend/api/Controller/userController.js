import mysql from 'mysql';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "merite"
});


//se connecte à la BDD, renvoie une erreur si impossible
con.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected!");
    }
});


exports.create = ((req, res) => {
    con.query("INSERT INTO users (login, password) VALUES (?, ?)", [
        req.body.login,
        req.body.password
    ], function(err, results) {
        if (err) {
            res.status(400).send("username already exists");
        } else {
            res.send("user created !");
        }
    });
});
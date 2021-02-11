//ce script as pour but de créer localement la base de donnée afin de pouvoir faire des tests

const mysql = require("mysql2");
const statements = require('./dbTables');

//lance le script de création de la base de donnée
async function launchScript() {
    console.log("Creating the database");
    await createDB();
    await switchToDatabase("merite_development");
    console.log("Creating tables");
    await createTables();
    console.log("Database is now up and running !")
    con.end();
}

//se connecte sur la base de donnée
async function switchToDatabase(databaseName) {
    return new Promise(async resolve => {
        con.changeUser({ database: databaseName }, function(err) {
            if (err) throw err;
            resolve();
        })
    });
}

//crée la base de donnée "merite" si elle n'existe pas déjà
async function createDB() {
    return new Promise(async resolve => {
        con.query("CREATE DATABASE merite_development", (err, result) => {
            if (err) {
                console.log(err);
                console.log("Database already created, skipped.")
            } else {
                console.log("Database created !")
            }
            resolve();
        });
    });
}

// crée les tables dans la base de donnée
async function createTables() {
    return new Promise(async resolve => {
        let sql = "";
        let cpt = 0;
        statements.statements.forEach(statement => {
            con.query(statement, function(err, result) {
                if (err) {
                    console.log(err);
                    console.log("Table " + statement.split(' ')[2] +
                        " already exists, skipped.");
                } else {
                    console.log("Table " + statement.split(' ')[2] + " created.");
                }
                cpt++;
                if (cpt === statements.statements.length) {
                    resolve();
                }
            });
        });
    });
}

//connection à la base de donnée
const con = mysql.createConnection({
    host: "localhost",
    user: "phpmyadmin",
    password: "root"
});

//se connecte à la BDD, renvoie une erreur si impossible
con.connect((err) => {
    if (err) {
        throw err;
    }
});

launchScript();
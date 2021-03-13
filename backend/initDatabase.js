//ce script as pour but de créer localement la base de donnée afin de pouvoir faire des tests

const mysql = require("mysql2");
const statements = require('./dbTables');
var bcrypt = require('bcrypt');
require('dotenv').config();

//lance le script de création de la base de donnée
async function launchScript() {
    await deleteIfExists();
    await createDB();
    await switchToDatabase("merite_development");
    await createTables();
    await createSuperUserRole();
    await createSuperUser();
    console.log("Database is now up and running !")
    con.end();
}

//se connecte sur la base de donnée
async function switchToDatabase(databaseName) {
    return new Promise(async(resolve, reject) => {
        con.changeUser({ database: databaseName }, function(err) {
            if (err) {
                console.log(err);
                reject();
            };
            resolve();
        })
    });
}

async function createSuperUser() {
    return new Promise(async(resolve, reject) => {
        bcrypt.hash(superUser.password, 5, function(err, bcryptedPassword) {
            if (err) {
                console.log("error while crypting the password");
                reject();
            } else {
                stmt = ` INSERT INTO 
                User(username,password,idGlobalRole,email,birthdate,phoneNumber,address,town,pinCode) values
                (   '${superUser.username}','${bcryptedPassword}','${superUser.idGlobalRole}','${superUser.email}','${superUser.birthdate}','${superUser.phonenumber}','${superUser.address}','${superUser.town}','${superUser.pinCode}')
                `;
                con.query(stmt, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("super admin created with success.")
                        resolve();
                    }
                });
            }

        })
    });
}

//crée le rôle super utilisateur
async function createSuperUserRole() {
    return new Promise(async(resolve, reject) => {
        con.query("INSERT INTO Global_Roles(name) VALUES ( 'super-admin' )", (err, result) => {
            if (err) {
                console.log("error while creating the super admin");
                reject();
            } else {
                console.log("Super-admin role created.");
                resolve();
            }
        });
    });
}

//supprime la base de donnée si elle existe déjà
async function deleteIfExists() {
    return new Promise(async(resolve, reject) => {
        con.query("DROP DATABASE IF EXISTS merite_development", (err, result) => {
            if (err) {
                console.log("Error deleting the database.");
                reject();
            } else {
                console.log("Database merite_development already exist, dropping old schema.");
                resolve();
            }
        });
    });
}

//crée la base de donnée "merite" si elle n'existe pas déjà
async function createDB() {
    return new Promise(async(resolve, reject) => {
        con.query("CREATE DATABASE merite_development", (err, result) => {
            if (err) {
                console.log("Error creating the database.");
                reject();
            } else {
                console.log("New database merite_development created !");
                resolve();
            }
        });
    });
}

// crée les tables dans la base de donnée
async function createTables() {
    return new Promise(async(resolve) => {
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

if (process.argv[2] === undefined) {
    console.log("missing arg : no username given");
    process.exit();
} else if (process.argv[3] === undefined) {
    console.log("missing arg : no password given");
    process.exit();
}

//connection à la base de donnée
const con = mysql.createConnection({
    host: "localhost",
    user: process.argv[2],
    password: process.argv[3],
});

const superUser = {
    username: process.env.SU_USERNAME,
    password: process.env.SU_PASSWORD,
    idGlobalRole: 1,
    email: "admin@admin.com",
    birthdate: "1970-01-01",
    phonenumber: "0123456789",
    address: "admin adress",
    town: "admin town",
    pinCode: "12345"
}

//se connecte à la BDD, renvoie une erreur si impossible
con.connect((err) => {
    if (err) {
        throw err;
    }
});

launchScript();
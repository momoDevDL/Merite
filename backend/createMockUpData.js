const faker = require('faker');
const mysql = require("mysql2");
const fs = require("fs");
const bcrypt = require('bcrypt');
const cliProgress = require('cli-progress');
const prompt = require('prompt-sync')({ sigint: true });
const request = require('request');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

let usernames = [];
const rolesID = [];
const coursesID = [];
const sectionsID = [];
let moduleID = null;
const courses = ["Mathématiques", "Français", "Anglais", "Economie", "Droit", "Informatique"];
const roles = ["Etudiant", "Professeur"];
const permissionsID = [
    ["modification", 1],
    ["lecture", 2],
    ["suppression", 3],
    ["ajout", 4]
];
const STUDENT_ROLE_ID = 2;
const TEACHER_ROLE_ID = 3;
const COURSES_PER_USER = 4;
const SECTIONS_PER_COURSE = 4;
const DOCUMENTS_PER_SECTION = 4;
const PICTURE_SOURCE = "https://picsum.photos/500";

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});


function connectToDB() {
    return new Promise(async(resolve, reject) => {
        con.connect((err) => {
            if (err) {
                throw err;
            }
            con.changeUser({ database: "merite_development" }, function(err) {
                if (err) {
                    console.log(err);
                };
                resolve();
            });
        });
    });
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateOneUser() {
    let user = {
        username: faker.internet.userName(),
        idGlobalRole: getRandomInt(STUDENT_ROLE_ID, TEACHER_ROLE_ID),
        password: faker.internet.password(),
        email: faker.internet.email(),
        birthdate: "1970-01-01",
        phoneNumber: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        town: faker.address.city(),
        pinCode: faker.address.zipCode()
    }
    return user;
}

async function insertUser(user) {
    return new Promise(async(resolve, reject) => {
        bcrypt.hash(user.password, 5, function(err, bcryptedPassword) {
            if (err) {
                console.log("error while crypting the password");
                reject();
            } else {
                let prepareStmt = ` INSERT INTO 
                User(username,password,idGlobalRole,email,birthdate,phoneNumber,address,town,pinCode) values (?,?,?,?,?,?,?,?,?)`;
                let values = [user.username, bcryptedPassword, user.idGlobalRole, user.email, user.birthdate, user.phoneNumber, user.address, user.town, user.pinCode];
                let query = con.query(prepareStmt, values);
                query.on('error', (err) => {
                    console.log(`\nl'username ${values[0]} existe déjà dans la base de donnée, utilisateur non inséré`);
                    usernames = usernames.filter(username => username[0] !== user.username);
                    resolve();
                });
                query.on('end', (result) => {
                    fs.appendFileSync('generatedUsers.txt', `${user.username}:${user.password}\n`);
                    resolve();
                });
            }
        });
    });
}

async function generateUsers(nb) {
    return new Promise(async(resolve, reject) => {
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        let cpt = 0;
        bar.start(nb, 0);
        for (let index = 0; index < nb; index++) {
            user = generateOneUser();
            usernames.push([user.username, user.idGlobalRole]);
            await insertUser(user);
            cpt++;
            bar.increment();
        }
        bar.stop();
        resolve();
    });
}

function checkIfNumber(nb) {
    if (isNaN(Number(nb))) {
        console.log("Un nombre est attendu");
        process.exit(1);
    } else {
        return true;
    }
}

async function createModule(name) {
    return new Promise(async(resolve, reject) => {
        let id;
        let prepareStmt = ` INSERT INTO 
                Module(name) values (?)`;
        let values = [name];
        let query = con.query(prepareStmt, values, function(err, result, fields) {
            moduleID = result.insertId;
            if (err) throw err;
            console.log(`le module '${name}' avec l'id ${result.insertId} a été inséré`);
            resolve();
        });
    });
}

async function createCourses() {
    return new Promise(async(resolve, reject) => {
        let cpt = 0;
        let prepareStmt = ` INSERT INTO 
                Courses(name,moduleID) values (?,?)`;
        for (let index = 0; index < courses.length; index++) {
            let values = [courses[index], moduleID];
            let query = con.query(prepareStmt, values, function(err, result) {
                if (err) throw err;
                coursesID.push(result.insertId);
                console.log(`le cours '${courses[index]}' avec l'id ${result.insertId} a été inséré`);
                cpt++;
                if (cpt === courses.length) {
                    resolve();
                }
            });
        }
    });
}

async function addUsersToCourses() {
    return new Promise(async(resolve, reject) => {
        let nbOfAdd = (coursesID.length * usernames.length);
        let cpt = 0;
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        bar.start(nbOfAdd, 0);
        let prepareStmt = ` INSERT INTO 
                Course_has_user(userID,courseID) values (?,?)`;
        usernames.forEach(username => {
            for (let i = 0; i < coursesID.length; i++) {
                let values = [username[0], coursesID[i]];
                con.query(prepareStmt, values, function(err, result) {
                    if (err) throw err;
                    bar.increment();
                    cpt++;
                    if (cpt === nbOfAdd) {
                        bar.stop();
                        resolve();
                    }
                });
            }
        });
    });
}

async function addSections() {
    return new Promise(async(resolve, reject) => {
        let nbOfAdd = (SECTIONS_PER_COURSE * coursesID.length);
        let cpt = 0;
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        bar.start(nbOfAdd, 0);
        let prepareStmt = ` INSERT INTO 
                Section(name,courseID) values (?,?)`;
        coursesID.forEach(courseID => {
            for (let i = 0; i < SECTIONS_PER_COURSE; i++) {
                let values = [`Section${i}`, courseID];
                con.query(prepareStmt, values, function(err, result) {
                    if (err) throw err;
                    sectionsID.push(result.insertId);
                    bar.increment();
                    cpt++;
                    if (cpt === nbOfAdd) {
                        bar.stop();
                        resolve();
                    }
                });
            }
        });
    });
}

async function download(filename) {
    return new Promise(resolve => {
        request.head(PICTURE_SOURCE, function(err, res, body) {
            request(PICTURE_SOURCE).pipe(fs.createWriteStream(filename)).on('close', () => {
                resolve();
            });
        });
    });
};

async function addDocuments() {
    return new Promise(async(resolve, reject) => {
        let nbOfAdd = (DOCUMENTS_PER_SECTION * sectionsID.length);
        let cpt = 0;
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        bar.start(nbOfAdd, 0);
        let prepareStmt = ` INSERT INTO 
                Document(name,message,filepath,sectionID) values (?,?,?,?)`;
        sectionsID.forEach(async sectionID => {
            for (let i = 0; i < SECTIONS_PER_COURSE; i++) {
                await download(`Document${i}_Section${sectionID}`);
                let pictureName = uuidv4() + ".jpg";
                fs.rename(`Document${i}_Section${sectionID}`, "./assets/uploads/" + pictureName, (err) => {
                    if (err) throw err;
                });
                let values = [`Document${i}_Section${sectionID}`, `ceci est le document n°${i} de la section n°${sectionID}`, pictureName, sectionID];
                con.query(prepareStmt, values, function(err, result) {
                    if (err) throw err;
                    bar.increment();
                    cpt++;
                    if (cpt === nbOfAdd) {
                        bar.stop();
                        resolve();
                    }
                });
            }
        });
    });
}

async function addRoles() {
    return new Promise(async(resolve, reject) => {
        let cpt = 0;
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        bar.start(roles.length * coursesID.length, 0);
        roles.forEach(role => {
            let prepareStmt = ` INSERT INTO 
                Roles(name,courseID) values (?,?)`;
            coursesID.forEach(courseID => {
                values = [role, courseID];
                con.query(prepareStmt, values, async(err, result) => {
                    if (err) throw err;
                    rolesID.push([role, result.insertId]);
                    await addPermissionsToRole(role, result.insertId);
                    cpt++;
                    bar.increment();
                    if (cpt === roles.length * coursesID.length) {
                        bar.stop();
                        resolve();
                    }
                });
            });
        });
    });
}

async function addPermissionsToRole(role, roleID) {
    return new Promise(async(resolve, reject) => {
        let prepareStmt = ` INSERT INTO 
                role_has_permissions(roleID,permissionID) values (?,?)`;
        if (role === "Etudiant") {
            values = [roleID, 2];
            con.query(prepareStmt, values, async(err, result) => {
                if (err) throw err;
                resolve();
            });
        } else {
            let cpt = 0;
            permissionsID.forEach(permissionID => {
                values = [roleID, permissionID[1]];
                con.query(prepareStmt, values, async(err, result) => {
                    if (err) throw err;
                    cpt++;
                    if (cpt === permissionsID.length) {
                        resolve();
                    }
                });
            });
        }
    });
}

async function addRolesToUsers() {
    return new Promise(async(resolve, reject) => {
        let prepareStmt = ` INSERT INTO 
                user_has_roles(roleID,userID) values (?,?)`;
        let cpt = 0;
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        bar.start(usernames.length * courses.length, 0);
        usernames.forEach(username => {
            rolesID.forEach(roleID => {
                let values = [roleID[1], username[0]];
                if ((roleID[0] === "Professeur") && (username[1] === TEACHER_ROLE_ID)) {
                    con.query(prepareStmt, values, async(err, result) => {
                        if (err) throw err;
                        cpt++;
                        bar.increment();
                        if (cpt === usernames.length * courses.length) {
                            bar.stop();
                            resolve();
                        }
                    });
                }
                if ((roleID[0] === "Etudiant") && (username[1] === STUDENT_ROLE_ID)) {
                    con.query(prepareStmt, values, async(err, result) => {
                        if (err) throw err;
                        cpt++;
                        bar.increment();
                        if (cpt === usernames.length * courses.length) {
                            bar.stop();
                            resolve();
                        }
                    });
                }
            });
        });
    });
}

async function launchScript() {
    await connectToDB();
    let nb = prompt("Combien d'utilisateurs à générer ?");
    checkIfNumber(nb);
    await generateUsers(nb);
    await createModule("ModuleDeTest");
    await createCourses();
    console.log(`Inscription des utilisateurs dans les cours`);
    await addUsersToCourses();
    console.log(`Ajout de ${SECTIONS_PER_COURSE} sections dans chaque cours`);
    await addSections();
    console.log(`Ajout de ${DOCUMENTS_PER_SECTION} documents dans chaque section`);
    await addDocuments();
    console.log("Ajout des Roles et attribution de leur permissions");
    await addRoles();
    console.log("Attribution des roles à chaque utilisateur");
    await addRolesToUsers();
    console.log("Les données ont été crées avec succès !");
    con.destroy();
}

launchScript();
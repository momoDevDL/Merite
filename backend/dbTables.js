let statements = [
    //USER
    `CREATE TABLE user (
        login VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY(login)
        )`,
    //MODULE
    `CREATE TABLE module (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY(id)
    )`,
    //COURSE
    `CREATE TABLE course (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        moduleID INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (moduleID) REFERENCES module(ID)
    )`,
    //COURSE_HAS_USER
    `CREATE TABLE course_has_user (
        userID VARCHAR(255) NOT NULL,
        courseID INT NOT NULL,
        FOREIGN KEY (userID) REFERENCES user(login),
        FOREIGN KEY (courseID) REFERENCES course(ID)
    )`,
    //MODULE_RESPONSABLE
    `CREATE TABLE module_responsable (
        userID VARCHAR(255) NOT NULL,
        moduleID INT NOT NULL,
        FOREIGN KEY (userID) REFERENCES user(login),
        FOREIGN KEY (moduleID) REFERENCES module(id)
    )`,
    //Section
    `CREATE TABLE section (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        courseID INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (courseID) REFERENCES course(id)
    )`,
    //Document
    `CREATE TABLE document (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        message VARCHAR(255),
        filepath VARCHAR(255),
        sectionID INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (sectionID) REFERENCES section(id)
    )`,
    //ROLE
    `CREATE TABLE role (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        courseID INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (courseID) REFERENCES course(id)
    )`,
    //PERMISSION
    `CREATE TABLE permissions (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY(id)
    )`,
    //USER_HAS_ROLE
    `CREATE TABLE user_has_role (
        roleID INT NOT NULL,
        userID VARCHAR(255) NOT NULL,
        FOREIGN KEY (roleID) REFERENCES role(id),
        FOREIGN KEY (userID) REFERENCES user(login)
    )`,
    //ROLE_HAS_PERMISSION
    `CREATE TABLE role_has_permission (
        roleID INT NOT NULL,
        permissionID INT NOT NULL,
        FOREIGN KEY (roleID) REFERENCES role(id),
        FOREIGN KEY (permissionID) REFERENCES permission(id)
    )`
]

exports.statements = statements;
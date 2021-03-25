let statements = [
    //USER
    `CREATE TABLE User (
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isAdmin TINYINT NOT NULL DEFAULT 0,
        PRIMARY KEY(email)
        )`,
    //MODULE
    `CREATE TABLE Module (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY(id)
    )`,
    //COURSE
    `CREATE TABLE Courses (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        moduleID INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (moduleID) REFERENCES Module(id)
    )`,
    //COURSE_HAS_USER
    `CREATE TABLE Course_has_user (
        userID VARCHAR(255) NOT NULL,
        courseID INT NOT NULL,
        FOREIGN KEY (userID) REFERENCES user(email),
        FOREIGN KEY (courseID) REFERENCES courses(id)
    )`,
    //MODULE_RESPONSABLE
    `CREATE TABLE Module_responsable (
        userID VARCHAR(255) NOT NULL,
        moduleID INT NOT NULL,
        FOREIGN KEY (userID) REFERENCES user(email),
        FOREIGN KEY (moduleID) REFERENCES Module(id)
    )`,
    //Section
    `CREATE TABLE Section (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        courseID INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (courseID) REFERENCES courses(id)
    )`,
    //Document
    `CREATE TABLE Document (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        message VARCHAR(255),
        filepath VARCHAR(255),
        sectionID INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (sectionID) REFERENCES section(id)
    )`,
    //ROLES
    `CREATE TABLE Roles (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        courseID INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (courseID) REFERENCES courses(id)
    )`,
    //PERMISSION
    `CREATE TABLE Permissions (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY(id)
    )`,
    //USER_HAS_ROLE
    `CREATE TABLE User_has_roles (
        roleID INT NOT NULL,
        userID VARCHAR(255) NOT NULL,
        FOREIGN KEY (roleID) REFERENCES roles(id),
        FOREIGN KEY (userID) REFERENCES user(email)
    )`,
    //ROLE_HAS_PERMISSION
    `CREATE TABLE Role_has_permissions (
        roleID INT NOT NULL,
        permissionID INT NOT NULL,
        FOREIGN KEY (roleID) REFERENCES roles(id),
        FOREIGN KEY (permissionID) REFERENCES permissions(id)
    )`
]

exports.statements = statements;
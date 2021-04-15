let statements = [
    //Global_Role
    `CREATE TABLE Global_Roles (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY(id)
    )`,
    //USER
    `CREATE TABLE User (
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        idGlobalRole INT NOT NULL,
        numEtud VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        birthdate DATE NOT NULL,
        formation VARCHAR(255),
        INE VARCHAR(255),
        phoneNumber VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        town VARCHAR(255) NOT NULL,
        pinCode VARCHAR(255) NOT NULL,
        PRIMARY KEY(username),
        FOREIGN KEY(idGlobalRole) REFERENCES Global_Roles(id)
        )`,
    //FORMATION
    `CREATE TABLE Formations (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        idResponsable VARCHAR(255),
        FOREIGN KEY(idResponsable) REFERENCES User(username)
    )`,
    //USER_HAS_FORMATION
    `CREATE TABLE User_Has_Formations (
        idUser VARCHAR(255) NOT NULL,
        idFormation INT NOT NULL,
        FOREIGN KEY(idUser) REFERENCES User(username),
        FOREIGN KEY(idFormation) REFERENCES Formations(id),
        CONSTRAINT PK_User_has_roles PRIMARY KEY (idUser,idFormation)
    )`,
    //MODULE
    `CREATE TABLE Module (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        parentIdModule INT,
        PRIMARY KEY(id),
        FOREIGN KEY (parentIdModule) REFERENCES Module(id)
    )`,
    //FORMATION_HAS_MODULES
    `CREATE TABLE Formation_has_modules (
        idFormation INT NOT NULL,
        idModule INT NOT NULL,
        FOREIGN KEY (idFormation) REFERENCES Formations(id),
        FOREIGN KEY (idModule) REFERENCES Module(id),
        CONSTRAINT PK_User_has_roles PRIMARY KEY (idFormation,idModule)
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
<<<<<<< HEAD
        favorite BOOLEAN DEFAULT 0,
        FOREIGN KEY (userID) REFERENCES User(username),
        FOREIGN KEY (courseID) REFERENCES Courses(id),
        CONSTRAINT PK_Course_has_user PRIMARY KEY (userID,courseID)
=======
        FOREIGN KEY (userID) REFERENCES User(username),
        FOREIGN KEY (courseID) REFERENCES Courses(id)
>>>>>>> corentin-dev
    )`,
    //Section
    `CREATE TABLE Section (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        courseID INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (courseID) REFERENCES Courses(id)
    )`,
    //Document
    `CREATE TABLE Document (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        message VARCHAR(255),
        filepath VARCHAR(255),
        sectionID INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (sectionID) REFERENCES Section(id)
    )`,
    //ROLES
    `CREATE TABLE Roles (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        courseID INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (courseID) REFERENCES Courses(id)
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
        FOREIGN KEY (roleID) REFERENCES Roles(id),
<<<<<<< HEAD
        FOREIGN KEY (userID) REFERENCES User(username),
        CONSTRAINT PK_User_has_roles PRIMARY KEY (roleID,userID)
=======
        FOREIGN KEY (userID) REFERENCES User(username)
>>>>>>> corentin-dev
    )`,
    //ROLE_HAS_PERMISSION
    `CREATE TABLE Role_has_permissions (
        roleID INT NOT NULL,
        permissionID INT NOT NULL,
        FOREIGN KEY (roleID) REFERENCES Roles(id),
<<<<<<< HEAD
        FOREIGN KEY (permissionID) REFERENCES Permissions(id),
        CONSTRAINT PK_User_has_roles PRIMARY KEY (roleID,permissionID)
=======
        FOREIGN KEY (permissionID) REFERENCES Permissions(id)
>>>>>>> corentin-dev
    )`
]

exports.statements = statements;

use merite_development;

DELETE from Courses;
DELETE from Module;

INSERT INTO User (idGlobalRole,username,password,email,birthdate,phoneNumber,address,town,pinCode) VALUES ( 1, 'admin','admin','admin@admin.com','1980-06-17','0000000','ahahah','balti','000');

INSERT INTO Module (id, name) VALUES 
    (1, 'DL'),
    (2, 'IGAI'),
    (3, 'SIAME'),
    (4, 'IHM');


INSERT INTO Courses (id, name, moduleID) VALUES 
    (1, 'COMFLEX', 1),
    (2, '3DIS', 2),
    (3, 'OCA', 3),
    (4, 'UCD-UX', 4);

INSERT INTO Course_has_user (userID, courseID) VALUES
    ('admin', 1),
    ('admin', 2),
    ('admin', 3),
    ('admin', 4);

DELETE from user_has_roles;
DELETE from Roles;
DELETE from Document;
DELETE from Section;
DELETE from Course_has_user;
DELETE from Courses;
DELETE from Module;

use merite_development;

DELETE from Courses;
DELETE from Module;

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
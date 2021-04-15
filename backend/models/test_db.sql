

use merite_development;

DELETE from Module;
INSERT INTO Module (name) VALUES 
    ('DL'),
    ('IGAI'),
    ('SIAME'),
    ('IHM');

DELETE from Courses;
INSERT INTO Courses (name, moduleID) VALUES 
    ('COMFLEX', 7),
    ('3DIS', 8),
    ('OCA', 9),
    ('UCD-UX', 10);




DROP DATABASE IF EXISTS tftchamps;
CREATE DATABASE tftchamps;

USE tftchamps;

CREATE TABLE champs ( 
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    champion VARCHAR(30) NOT NULL,
    cost INT NOT NULL,
    trait1 VARCHAR(30),
    trait2 VARCHAR(30),
    trait3 VARCHAR(30)
)


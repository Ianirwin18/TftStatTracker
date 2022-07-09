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

CREATE TABLE matches (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    placement  INT NOT NULL,
    score INT NOT NULL,
    champion1 VARCHAR(30),
    champion2 VARCHAR(30),
    champion3 VARCHAR(30),
    champion4 VARCHAR(30),
    champion5 VARCHAR(30),
    champion6 VARCHAR(30),
    champion7 VARCHAR(30),
    champion8 VARCHAR(30),
    champion9 VARCHAR(30),
    champion10 VARCHAR(30),
    champion11 VARCHAR(30),
    champion12 VARCHAR(30),
    champion13 VARCHAR(30)
)
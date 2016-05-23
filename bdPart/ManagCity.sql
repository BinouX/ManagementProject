show databases;
create database ManagCity character set 'utf8';
use ManagCity;
create table ville ( nom varchar(45), budget int, maire varchar (45), population int, batiment int, ressources int, zip varchar (5));
drop table ville;
show tables;

create table ville (
	idcity INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT, 
	nom VARCHAR (45) NOT NULL, 
	budget INT NOT NULL, 
	maire VARCHAR (45) NOT NULL UNIQUE, 
    population INT NOT NULL, 
    batiment INT NOT NULL, 
    zip VARCHAR (5) NOT NULL UNIQUE 
    );
show table status;
show tables;
describe ville;
drop table maire;
create table maire (
	idmaire INT PRIMARY KEY NOT NULL UNIQUE, 
	nom VARCHAR (45) NOT NULL UNIQUE, 
    email VARCHAR (60) NOT NULL UNIQUE
    );
show tables;
drop table staff;
create table staff (
	idstaff INT PRIMARY KEY NOT NULL UNIQUE, 
	nombre INT NOT NULL
    );
drop table batiment;

create table batiment (
	idbatiment INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT, 
	type VARCHAR (45) NOT NULL UNIQUE , 
	adresse VARCHAR (50) NOT NULL UNIQUE, 
    valeur_marchande INT NOT NULL, 
    nom VARCHAR (45) NOT NULL
    );
drop table population;
create table population (
	idpopulation INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT, 
	nombre INT NOT NULL, 
	sexe ENUM ('M','F'), 
    job VARCHAR (15), 
    taxes INT NOT NULL 
    );
    drop table joueur;
    create table joueur (
	idjoueur INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    login VARCHAR (45) NOT NULL UNIQUE,
    password VARCHAR (120) NOT NULL UNIQUE,
    nom VARCHAR (45) NOT NULL UNIQUE,
    pseudo VARCHAR (45) NOT NULL UNIQUE,
	email VARCHAR (60) NOT NULL UNIQUE, 
	budget INT NOT NULL,
    revenues INT,
	sexe ENUM ('M','F')
    );
    drop table employe;
	create table employe (
	idemploye INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    nom VARCHAR (45) NOT NULL UNIQUE,
    revenues INT NOT NULL,
	sexe ENUM ('M','F')
    );
    show tables;
alter table joueur change sex sexe ENUM ('M','F');   
alter table population change sex sexe ENUM ('M','F');
show tables;
describe joueur;
describe employe;
describe population;
describe maire;
describe ville;
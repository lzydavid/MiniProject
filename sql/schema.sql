create database useraccount;

use useraccount;

create table accounts(
	id varchar(8) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    firstName varchar(255) not null,
    lastName varchar(255) not null,
    constraint account_pk primary key (id)
);
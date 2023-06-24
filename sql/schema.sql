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

create table collection(
	col_id int not null,
    collection_name varchar(255),
    acc_id varchar(8),
    constraint col_pk primary key (col_id),
    constraint acc_fk foreign key (acc_id) references accounts(id)
);

create table restaurants(
	place_id varchar(255),
    name varchar(255),
    address varchar(255),
    rating float,
    photo_ref varchar(255),
    price_level int,
    constraint res_pk primary key (place_id)
);

CREATE TABLE collection_restaurant (
    collection_id int,
    restaurant_id varchar(255),
    CONSTRAINT collection_fk FOREIGN KEY (collection_id) REFERENCES collection (col_id),
    CONSTRAINT restaurant_fk FOREIGN KEY (restaurant_id) REFERENCES restaurants (place_id)
);


select * from accounts;

insert into accounts(id,email,password,firstName,lastName) values("906bb9a6","dlee@gmail.com","123456","David","Lee");

insert into accounts(id,email,password,firstName,lastName) select "0cac77c3","wsl@gmail.com","123456","Lindon","WeiShi"
where not exists (select * from accounts where email = "wsl@gmail.com");

select * from accounts where email = 'dle@gmail.com';

select count(*) from accounts where email = 'dle@gmail.com';
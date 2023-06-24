use useraccount;

create table collection(
	col_id varchar(255) not null,
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
    collection_id varchar(255),
    restaurant_id varchar(255),
    CONSTRAINT collection_fk FOREIGN KEY (collection_id) REFERENCES collection (col_id),
    CONSTRAINT restaurant_fk FOREIGN KEY (restaurant_id) REFERENCES restaurants (place_id)
);

select * from collection;
select* from restaurants;
select* from collection_restaurant;

insert into collection(col_id,collection_name,acc_id) values ('94df2e32','Favourite','0cac77c3');
insert into collection(col_id,collection_name,acc_id) values ('ea7d731d','New','0cac77c3');
insert ignore into collection(col_id,collection_name,acc_id) values ('e1376f38','Later','0cac77c3');

insert into restaurants(place_id,name,address,rating,photo_ref,price_level) values ('ChIJ9ep2u6IP2jERs37XyaPiiI4','Time Table Cafe 研磨时光咖啡','Jurong West Street 41, #01-726 Block 456, Singapore 640456',4.1,'AZose0nNPoE8N3bR2zycUl7WQxlNZnkePRSHkgL9NFNEc83wq0EU7-rJAcVHXbj8PL59ie_qVr4_hMTaGfltZKboMWRngJMNH_BGJqiyjbPKyYPwFD6vibsdr8jlNecd3b9fCsmB3wQDW77j6AbPRiTFuaWJGTH2d171F9cT8PGUpbAyKLvE',2);
insert into collection_restaurant(collection_id,restaurant_id) values ('94df2e32','ChIJ9ep2u6IP2jERs37XyaPiiI4');

-- insert non duplicate into collection table 
insert into collection(col_id,collection_name,acc_id) select '94df2e32','Favourite','0cac77c3' where not exists (select 1 from collection where col_id = "94df2e32");

-- insert into collection_res
insert into collection_restaurant (collection_id,restaurant_id) select "94df2e32" , "ChIJ9ep2u6IP2jERs37XyaPiiI4" where not exists(select 1 from collection_restaurant where collection_id = "94df2e32" and restaurant_id = "ChIJ9ep2u6IP2jERs37XyaPiiI4");

-- search collectionByID
select * from collection where acc_id = "0cac77c3"
use useraccount;

select * from accounts;
select * from collection;
select * from collection_restaurant;
select * from restaurants;

select count(*) from accounts where email = 'wsl@gmail.com';

select 1 from accounts where email = 'wsl@gmail.com' and password = '12346';

select distinct r.* from restaurants as r inner join collection_restaurant as cr on r.place_id = cr.restaurant_id where cr.collection_id = '94df2e32';

insert ignore into restaurants (place_id,name,address,rating,photo_ref,price_level) values ('ChIJ12M9rikZ2jERB4z3W57dGdw','Gangnam Story Korean Steamboat & BBQ Buffet','181 Orchard Rd, #08-04/05 Central, Orchard, Singapore 238896',3.0,'kzpaAzyS5F8nyDBNTgTbNOBZQO9aWFUUTnzuJZEkjVOcR1mBmWD4vIZiSqHiEvw6L','-1');

delete from collection where acc_id = '0cac77c3';
delete from collection_restaurant where collection_id = '0cac77c3';


select * from collection as c join collection_restaurant as cr on c.acc_id = '0cac77c3' and c.col_id = cr.collection_id;

SELECT c.*, cr.*
FROM collection c
JOIN collection_restaurant cr ON c.col_id = cr.collection_id
WHERE c.acc_id = '0cac77c3';

DELETE FROM collection_restaurant
WHERE collection_id IN (
    SELECT col_id
    FROM collection
    WHERE acc_id = '0cac77c3'
);

DELETE FROM collection WHERE acc_id = '0cac77c3';
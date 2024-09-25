-- createUser.sql:

drop user if exists 'mktsAdm'@'%';
create user 'mktsAdm'@'%' identified by 'sptech';
grant all privileges on market_safe.* to 'mktsAdm'@'%';

drop user if exists 'mktsUser'@'%';
create user 'mktsUser'@'%' identified by 'sptech';
grant insert, select on market_safe.* to 'mktsUser'@'%';

drop user if exists 'mktsUserInsert'@'%';
create user 'mktsUserInsert'@'%' identified by 'sptech';
grant insert on market_safe.* to 'mktsUserInsert'@'%';

drop user if exists 'mktsUserSelect'@'%';
create user 'mktsUserSelect'@'%' identified by 'sptech';
grant select on market_safe.* to 'mktsUserSelect'@'%';

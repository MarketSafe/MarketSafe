-- createUser.sql:

-- drop user 'mktsAdm'@'%';
create user if not exists 'mktsAdm'@'%' identified by 'sptech';
grant all privileges on market_safe.* to 'mktsAdm'@'%';

-- drop user 'mktsUser'@'%';
create user if not exists 'mktsUser'@'%' identified by 'sptech';
grant insert, select on market_safe.* to 'mktsUser'@'%';

-- drop user 'mktsUserInsert'@'%';
create user if not exists 'mktsUserInsert'@'%' identified by 'sptech';
grant insert on market_safe.* to 'mktsUserInsert'@'%';

-- drop user 'mktsUserSelect'@'%';
create user if not exists 'mktsUserSelect'@'%' identified by 'sptech';
grant select on market_safe.* to 'mktsUserSelect'@'%';

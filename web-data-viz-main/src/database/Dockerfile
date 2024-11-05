FROM mysql:latest
WORKDIR /
ENV MYSQL_ROOT_PASSWORD=urubu100
COPY ./initDatabase.sql /docker-entrypoint-initdb.d/init.sql
EXPOSE 3306

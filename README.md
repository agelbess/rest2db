# Intro

This is an application that calls the rest services of https://ecomm.one-line.com/ in order to get container info and store it in a database (MS SQLServer).

First call the REST service, use JSON Path to extract the needed data and construct the SQL statement to store the data.

# Setup

## Docker SQLServer
https://hub.docker.com/_/microsoft-mssql-server

Download and run the docker image

    docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=p@ssw0rd" -e "MSSQL_PID=Express" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-latest-ubuntu

Connect to it

    docker exec -it <container_id|container_name> /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P p@ssw0rd

## SQL Server

Create the table

    create table container (id varchar(20), status varchar(100), location varchar(100), error varchar(100), updateTime datetime2)
    go

Insert some data

    insert into container (id) values ('SEGU1943040'); 
    insert into container (id) values ('SEGU2071677');
    insert into container (id) values ('TRLU9137012'); 
    insert into container (id) values ('CAIU3303110'); 
    insert into container (id) values ('TRIU6677049'); 
    insert into container (id) values ('HLXU1324705'); 
    insert into container (id) values ('TEMU2638495'); 
    insert into container (id) values ('TCLU1903920');
    go

# Node

Download the dependencies

    npm install

# Configuration

Edit the `config.js` file

    database: {
        url: 'mssql://sa:p%40ssw0rd@localhost/master',
        sql: {
            select: 'select id from container',
            update: 'update container set status=@status, location=@location, error=@error, updateTime=@updateTime where id=@id'
        },
        trim: { // to make sure that the columns can handle the data length
            status: 100,
            location: 100,
            error: 100
        }
    }

# Run

npm run start
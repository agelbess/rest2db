const config = {
    rest: {
        delay: 100 // in millis
    },
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
}

module.exports = config
const sql = require('mssql')
const config = require('./config')

async function getIds() {
    const pool = await sql.connect(config.database.url)
    const result = await pool.request().query(config.database.sql.select)
    return result.recordset
}

async function updateContainer(id, status, location, error) {
    const pool = await sql.connect(config.database.url)
    return await pool.request()
        .input('id', sql.VarChar, id)
        .input('status', sql.VarChar, status ? status.substring(0, config.database.trim.status) : null)
        .input('location', sql.VarChar, location ? location.substring(0, config.database.trim.location) : null)
        .input('error', sql.VarChar, error ? error.substring(0, config.database.trim.error) : null)
        .input('updateTime', sql.DateTime2, new Date())
        .query(config.database.sql.update)
}

module.exports = {
    getIds: getIds,
    updateContainer: updateContainer
}
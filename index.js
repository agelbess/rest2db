const curl = require('./curl')
const mssql = require('./mssql')
const config = require('./config')

var done = 0
async function start() {
    const ids = await mssql.getIds()
    ids.forEach(async (element, i) => {
        setTimeout(() => doOnContainer(element, ids), i * config.rest.delay)
    });
}

async function doOnContainer(element, ids) {
    let data = await curl.getData(element.id) // status and location
    let response = await mssql.updateContainer(data.cntrNo, data.statusNm, data.placeNm, data.error)
    console.log(`saved id: ${data.cntrNo}, status: ${data.statusNm}, location: ${data.placeNm}, error: ${data.error}`)
    done++
    if (done == ids.length) {
        process.exit()
    }
}

start();
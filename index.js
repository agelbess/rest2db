const curl = require('./curl')
const mssql = require('./mssql')

async function start() {
    const ids = await mssql.getIds()
    ids.forEach(async (element, i) => {
        let data = await curl.getData(element.id) // status and location
        let response = await mssql.updateContainer(data.cntrNo, data.statusNm, data.placeNm, data.error)
        console.log(`saved id: ${data.cntrNo}, status: ${data.statusNm}, location: ${data.placeNm}, error: ${data.error}`)
        if (i == ids.length - 1) {
            process.exit()
        }
    });
}

start();
const { Curl } = require('node-libcurl');

/**
 * 
 * @param {*} cntrNo 
 * @returns the status and location
 */
async function getData(cntrNo) {
    try {
        const containerKeys = await getContainerKeys(cntrNo)
        return getContainerInfo(cntrNo, containerKeys.bkgNo, containerKeys.copNo)
    } catch (e) {
        return {
            cntrNo: cntrNo,
            error: e
        }
    }
}

async function getContainerKeys(cntrNo) {
    const curl = new Curl();
    curl.setOpt(Curl.option.URL, 'https://ecomm.one-line.com/ecom/CUP_HOM_3301GS.do')
    curl.setOpt(Curl.option.SSL_VERIFYPEER, 0)
    curl.setOpt(Curl.option.HEADER, 'Content-Type: application/x-www-form-urlencoded')
    const postData = `f_cmd=122&cntr_no=${cntrNo}&cust_cd=&search_type=C`
    curl.setOpt(Curl.option.POSTFIELDS, postData)
    curl.perform()
    const promise = new Promise((resolve, reject) => {
        curl.on('end', (status, dataString, header) => {
            const data = JSON.parse(dataString)
            if (data.list && data.list[0]) {
                resolve(data.list[0])
            } else {
                let error = `invalid response (not found container: ${cntrNo}) ${dataString}`
                reject( error )
            }
        })
        curl.on('error', error => {
            console.log(error)
        })
    })
    return promise
}

async function getContainerInfo(cntrNo, bkgNo, copNo) {
    const curl = new Curl();
    curl.setOpt(Curl.option.URL, 'https://ecomm.one-line.com/ecom/CUP_HOM_3301GS.do')
    curl.setOpt(Curl.option.SSL_VERIFYPEER, 0)
    curl.setOpt(Curl.option.HEADER, 'Content-Type: application/x-www-form-urlencoded')
    const postData = `f_cmd=123&cntr_no=${cntrNo}&bkg_no=${bkgNo}&cop_no=${copNo}`
    curl.setOpt(Curl.option.POSTFIELDS, postData)
    curl.perform()
    const promise = new Promise((resolve, reject) => {
        curl.on('end', (status, dataString, header) => {
            const data = JSON.parse(dataString)
            if (data.list && data.list[0]) {
                resolve(data.list[0])
            } else {
                let error = `invalid response (not found container: ${cntrNo}) ${dataString}`
                reject( error )
            }
        })
        curl.on('error', error => {
            console.log(error)
        })
    })
    return promise
}

module.exports = {
    getData: getData
}
const fs = require("fs")
const path = require("path")


async function createApikey(ip) {
    if(!ip) return false
    const apikey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const data = {
        key: apikey,
        limit: 60,
        ip: ip
    }
    const db = fs.readFileSync(path.join(__dirname, "../database/api.json"), "utf-8")
    const dbjson = JSON.parse(db)
    const dbfind = dbjson.find((x) => x.ip === ip)
    if (dbfind) {
        return false;
    }
    dbjson.push(data)
    fs.writeFileSync(path.join(__dirname, "../database/api.json"), JSON.stringify(dbjson, null, 2))
    return data
}

async function minusapikey(apikey) {
    const db = fs.readFileSync(path.join(__dirname, "../database/api.json"), "utf-8")
    const dbjson = JSON.parse(db)
    const dbfind = dbjson.find((x) => x.key === apikey)
    if (!dbfind || dbfind.limit <= 0) {
        return false;
    }
    dbfind.limit -= 1
    fs.writeFileSync(path.join(__dirname, "../database/api.json"), JSON.stringify(dbjson, null, 2))
    return true;
}
async function checkapi(apikey) {
    const db = fs.readFileSync(path.join(__dirname, "../database/api.json"), "utf-8")
    const dbjson = JSON.parse(db)
    const dbfind = dbjson.find((x) => x.key === apikey)
    if (!dbfind) {
        return false;
    }
    return true
}
module.exports = {
    createApikey,
    minusapikey,
    checkapi
}
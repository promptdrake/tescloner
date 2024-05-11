const express = require('express');
const router = express.Router();
/*
Import Modules
*/
const { 
    apivalidator,
     validatebyip,
    getUpdateCo,
addUpdate,
deleteApiKey,
createApikey,
changeIp} = require('../lib/checkapi');

router.get('/changedata', async(req, res) => {
    const { apikey, type, action} = req.query
    if(!apikey || !type || !action) return res.status(401).send("<h1>Please provide an apikey and apitype and action data on query</h1>")
        const datasheet = await apivalidator(apikey, type);
        if (!datasheet) {
            return res.status(401).json({
                status: false,
                code: 401,
                message: "Invalid Apikey"
            })
        }
        const ip = req.query.ip ? req.query.ip : "NULL";
        res.render('manager', {apikey: apikey, license: type, ip: ip, password: datasheet.password, name: datasheet.name, action: action})
})
module.exports = router;

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
changeIp } = require('../lib/checkapi');

const manager = require('./manager');
router.use('/manager', manager);

  router.get('/ipv4', (req, res) => {
    res.json({
      status: true,
      ip: req.ip,
      socket: req.socket.remoteAddress
    });
  });

router.get('/', (req, res) => {
  res.json({
    status: res.statusCode,
    author: process.env.AUTHOR,
    message: 'Aisbir Admin API v1.0.0',
  });
});
router.post('/submitchanges', async (req, res) => {
  const { apikey, username, password, type, action } = req.body;
 // console.log(req.body);
  if (!apikey || !username || !password || !type || !action) {
    return res.status(401).json({ message: "Input body that required" });
  }

  const ip = req.body.ip ? req.body.ip : "NULL";
  if (action === "ip") {
  const datameh = await changeIp(apikey, type, ip)
  if (!datameh) {
    return res.status(401).json({status: false,code: 401,mess: "Failed to change ip" });
  }
  res.json({status: true, code: 200, mess: "Successfully changed ip address for " + apikey + " to " + ip });
  }
});

router.post('/auth/createapikey', async(req, res) => {
 const { type, name } = req.query
 const token = req.headers["auth"];
 if(!token || token !== process.env.AISBIR_AUTH_SECRET) return res.status(401).json({message: "Invalid Header Pipe"})
    if (!type || !name) {
    return res.status(401).json({
        status: false,
        code: 401,
        message: "Please provide an parameter"
    })
    }
 const data = await createApikey(name, type);
    if (!data) {
    return res.status(404).json({
        status: false,
        code: 404,
        message: "Sorry Apikey Already Exist"
    })
    }
    res.json({
        status: true,
        code: res.statusCode,
        message: "Success Created Apikey",
        result: data
    })
  });

  router.post('/auth/deleteapikey', async(req, res) => {
    const { type, key } = req.query
    const token = req.headers["auth"];
    if(!token || token !== process.env.AISBIR_AUTH_SECRET) return res.status(401).json({message: "Invalid Header Pipe"})
       if (!type || !key) {
       return res.status(401).json({
           status: false,
           code: 401,
           message: "Please provide an parameter"
       })
       }
   
       const deldata = await deleteApiKey(key, type);
       if(!deldata) {
       return res.status(404).json({
            status: false,
            code: 404,
            message: "Apikey Not Found"
        })
       }
else {
    res.json({
        status: true,
        code: 200,
        message: "Success Delete Apikey"
    })
}
     });

module.exports = router;

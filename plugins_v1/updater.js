const express = require('express');

const router = express.Router();
const { 
  apivalidator,
   validatebyip,
  getUpdateCo } = require('../lib/checkapi');
const error_apikey ={
    status: false,
    code: 401,
    author: process.env.AUTHOR,
    data: "apikey.notfound.exception.key",
    message: "Please provide an API Key"
  }
const no_apifound = {
  status: false,
  code: 404,
  author: process.env.AUTHOR,
  message: "Sorry, Apikey not found"
}
const ipmismatch = {
  status: false,
  code: 404,
  author: process.env.AUTHOR,
  data: "apikey.ip.exception.key",
  message: "Sorry, Apikey not found with this ip"
}
router.get('/co', async(req, res) => {
    const { apikey, type } = req.query;
    if (!apikey || !type) return res.status(401).json(error_apikey);
  const data = await getUpdateCo(apikey, type);
  if (!data) {
  return res.status(404).json(no_apifound)
  }
  res.json({
    status: true,
    code: res.statusCode,
    message: "Success Get Update CO",
    latest_commit: data[data.length - 1],
    _metadata: data
  })
  })
module.exports = router;

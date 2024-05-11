const express = require('express');
const Tiktok = require("@tobyg74/tiktok-api-dl")
const getFbVideoInfo = require("fb-downloader-scrapper")
const instagramDl = require("@sasmeee/igdl");
const axios = require('axios')
const router = express.Router();
const error_apikey ={
    status: false,
    code: 401,
    author: process.env.AUTHOR,
    data: "apikey.notfound.exception.key",
    message: "Harap Lengkapi data yang diperlukan"
  }
  const errorapi ={
    status: false,
    code: 404,
    author: process.env.AUTHOR,
    data: "apikey.notfound.exception.key",
    message: "Apikey Tidak Ditemukan"
  }

  const errorapi_limit ={
    status: false,
    code: 404,
    author: process.env.AUTHOR,
    data: "apikey.notfound.exception.key",
    message: "Api ini Sudah Limit, Silahkan Purchase untuk mendapatkan unlimited ip"
  }
  const { createApikey, minusapikey, checkapi } = require('../lib/apibot');
const { author } = require('caliph-api');
  router.get('/translate', async(req,res) => {
    const { apikey, text, to} = req.query
    if (!apikey || !text || !to) return res.status(401).json(error_apikey);
    const find = await checkapi(req.query.apikey);
    if(!find) return res.status(404).json(errorapi)
        await axios.get(`https://api.popcat.xyz/translate?to=${to}&text=${text}`).then(async(result) => {
    const leakdata = await minusapikey(apikey);
    if (!leakdata) return res.status(401).json(errorapi_limit);
            res.json({
                status: true,
                author: process.env.AUTHOR,
                code: res.statusCode,
                to: to,
                result: result.data.translated
            })
        }).catch((err) => {
        })
  })

  router.get('/simi', async(req,res) => {
    const { apikey, text} = req.query
    if (!apikey || !text) return res.status(401).json(error_apikey);
    try {
    const find = await checkapi(req.query.apikey);
    if(!find) return res.status(404).json(errorapi)
    const params = new URLSearchParams();
    params.append('text', text);
    params.append("lc", "id")
    
    const resp = await axios.post("https://api.simsimi.vn/v1/simtalk", params, {
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
if(resp.data.message) {
    const leakdata = await minusapikey(apikey);
    if (!leakdata) return res.status(401).json(errorapi_limit);
    res.status(200).json({
        status: true,
        code: 200,
        author: process.env.AUTHOR,
        result: {
            question: text,
            answer: resp.data.message
        }
    })
}
else {
    res.status(503).json({
        status: false,
        code: 500,
        author: process.env.AUTHOR,
        message: "Sorry Server is busy"
})
}
  }
  catch(e)  {
    res.status(500).json({status: false, code: 500, author: process.env.AUTHOR, message: "Internal Server Error"})
  }
  })


  router.get('/bard', async(req,res) => {
    const { apikey, text} = req.query
    if (!apikey || !text) return res.status(401).json(error_apikey);
    try {
    const find = await checkapi(req.query.apikey);
    if(!find) return res.status(404).json(errorapi)
   const resp = await axios.get(`https://apiruulzz.my.id/api/bard?query=${text}`)
    const leakdata = await minusapikey(apikey);
   if (!leakdata) return res.status(401).json(errorapi_limit);
   const datas = resp.data.result[0]
   res.json({
    status: true,
    code: 200,
    message: "Success Getting Bard Ai",
    result: datas
   })
 
  }
  catch(e)  {
    res.status(500).json({status: false, code: 500, author: process.env.AUTHOR, message: "Internal Server Error"})
  }
  })
module.exports = router;

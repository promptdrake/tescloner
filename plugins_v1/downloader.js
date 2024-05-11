const express = require('express');
const Tiktok = require("@tobyg74/tiktok-api-dl")
const getFbVideoInfo = require("fb-downloader-scrapper")
const instagramDl = require("@sasmeee/igdl");
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

  
  router.get('/tiktokdl', async(req, res) => {
    const { url, apikey } = req.query;
    if (!apikey || !url) return res.status(401).json(error_apikey);
    const find = await checkapi(req.query.apikey);
    if(!find) return res.status(404).json(errorapi)

    Tiktok.Downloader(url, {
        version: "v2"
      }).then(async(result) => {
        if (result.status == "error") return res.status(404).json({
            status: false,
            author: process.env.AUTHOR,
            code: 404,
            message: "Error, Video tidak ditemukan"
        })
        const leakdata = await minusapikey(apikey)
        if (!leakdata) return res.status(401).json(errorapi_limit)
            res.json({
                status: true,
                author: process.env.AUTHOR,
                code: res.statusCode,
                message: "Success Get Tiktok Download",
                data: result
            })
      })
  })
  router.get('/igdl', async(req, res) => {
    const { url, apikey } = req.query;
    if (!apikey || !url) return res.status(401).json(error_apikey);
    const find = await checkapi(req.query.apikey);
    if(!find) return res.status(404).json(errorapi)
        try {
const data = await instagramDl(url)
    if(data) {
        const leakdata = await minusapikey(apikey)
        if (!leakdata) return res.status(401).json(errorapi_limit)
            res.json({
                status: true,
                code: res.statusCode,
                author: process.env.AUTHOR,
                message: "Success Get Instagram Download",
                video: data[0].download_link
            })
    }
    else { 
        res.status(404).json({
            status: false,
            code: 404,
            message: "Error, Video tidak ditemukan"
        })
    }
}
catch(e) {
    res.status(404).json({
        status: false,
        author: process.env.AUTHOR,
        code: 404,
        message: "Video tidak ditemukan"
    })
}
  })

  const { ytMp4, ytMp3} = require("../lib/y2mate")

  router.get('/ytvideo', async(req, res) => {
    const { url, apikey } = req.query;
    if (!apikey || !url) return res.status(401).json(error_apikey);
    const find = await checkapi(req.query.apikey);
    if(!find) return res.status(404).json(errorapi)
        try {
const data = await ytMp4(url)
    if(data !== undefined) {
        const leakdata = await minusapikey(apikey)
        if (!leakdata) return res.status(401).json(errorapi_limit)
            res.json({
                status: true,
                code: res.statusCode,
                author: process.env.AUTHOR,
                message: "Success Get Youtube Video",
                result: data
            })
    }
    else { 
        res.status(404).json({
            status: false,
            code: 404,
            message: "Error, Video tidak ditemukan"
        })
    }
}
catch(e) {
    res.status(404).json({
        status: false,
        author: process.env.AUTHOR,
        code: 404,
        message: "Video tidak ditemukan"
    })
}
  })


  router.get('/ytmusic', async(req, res) => {
    const { url, apikey } = req.query;
    if (!apikey || !url) return res.status(401).json(error_apikey);
    const find = await checkapi(req.query.apikey);
    if(!find) return res.status(404).json(errorapi)
        try {
const data = await ytMp4(url)
    if(data !== undefined) {
        const leakdata = await minusapikey(apikey)
        if (!leakdata) return res.status(401).json(errorapi_limit)
            res.json({
                status: true,
                code: res.statusCode,
                author: process.env.AUTHOR,
                message: "Success Get Youtube music",
                result: data
            })
    }
    else { 
        res.status(404).json({
            status: false,
            code: 404,
            message: "Error, Video tidak ditemukan"
        })
    }
}
catch(e) {
    res.status(404).json({
        status: false,
        author: process.env.AUTHOR,
        code: 404,
        message: "musik tidak ditemukan"
    })
}
  })
  
  router.get('/fbdl', async(req, res) => {
    const { url, apikey } = req.query;
    if (!apikey || !url) return res.status(401).json(error_apikey);
    const find = await checkapi(req.query.apikey);
    if(!find) return res.status(404).json(errorapi)

            getFbVideoInfo("https://www.facebook.com/FoodMakersBr/videos/tire-o-feij%C3%A3o-do-pote-de-sorvete-e-fa%C3%A7a-essa-receita-ainda-hoje/454262112817834/")
            .then(async(result)=>{
                const leakdata = await minusapikey(apikey)
                if (!leakdata) return res.status(401).json(errorapi_limit)
                    res.json({
                        status: true,
                        code: res.statusCode,
                        author: process.env.AUTHOR,
                        message: "Success Get Facebook Video",
                        result: result
                    })
            }).catch((err)=>{
                res.status(404).json({
                    status: false,
                    author: process.env.AUTHOR,
                    code: 404,
                    message: "Video tidak ditemukan"
                })
            })
  })
module.exports = router;

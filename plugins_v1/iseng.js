const express = require('express');

const router = express.Router();
const axios = require('axios')
const api = require("caliph-api");
const { createApikey, minusapikey, checkapi } = require('../lib/apibot');
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

  
  router.get('/tobinner', async(req, res) => {
    const { text, apikey } = req.query;
    if (!apikey || !text) return res.status(401).json(error_apikey);
    const find = await checkapi(req.query.apikey);
    if(!find) return res.status(404).json(errorapi)
        const leakdata = await minusapikey(apikey)
        if (!leakdata) return res.status(401).json(errorapi_limit)

        const data = await api.encrypt.binary.enc(text)
        res.json({
            status: true,
            code: res.statusCode,
            author: process.env.AUTHOR,
            message: "Success Get Encrypt Binary",
            data: data
        })
        })

        router.get('/decrypt', async(req, res) => {
            const { text, apikey } = req.query;
            if (!apikey || !text) return res.status(401).json(error_apikey);
            const find = await checkapi(req.query.apikey);
            if(!find) return res.status(404).json(errorapi)
                const leakdata = await minusapikey(apikey)
                if (!leakdata) return res.status(401).json(errorapi_limit)
        
                const data = await api.encrypt.binary.dec(text)
                res.json({
                    status: true,
                    code: res.statusCode,
                    author: process.env.AUTHOR,
                    message: "Success Get Encrypt Binary",
                    data: data
                })
                })

                router.get('/family100', async(req, res) => {
                    const { apikey } = req.query;
                    if (!apikey) return res.status(401).json(error_apikey);
                    
                    const find = await checkapi(req.query.apikey);
                    if (!find) return res.status(404).json(errorapi);
                    
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                    
                    const data = await api.game.family100();
                    const pertanyaan = data.result.pertanyaan;
                    const jawaban = data.result.jawaban;
                    
                    res.json({
                        status: true,
                        code: res.statusCode,
                        author: process.env.AUTHOR,
                        message: "Success Get Family 100",
                        pertanyaan,
                        jawaban
                    });
                });
              
                router.get('/nokia', async (req, res) => {
                  const { apikey, image } = req.query;
                 
                
                  if (!apikey || !image) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/nokia?image=${image}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/drip', async (req, res) => {
                  const { apikey, image } = req.query;
                 
                
                  if (!apikey || !image) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/drip?image=${image}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/adios', async (req, res) => {
                  const { apikey, image } = req.query;
                 
                
                  if (!apikey || !image) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://vacefron.nl/api/adios?user=${image}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/blur', async (req, res) => {
                  const { apikey, image } = req.query;
                 
                
                  if (!apikey || !image) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/blur?image=${image}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/adios', async (req, res) => {
                  const { apikey, image } = req.query;
                 
                
                  if (!apikey || !image) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://vacefron.nl/api/adios?user=${image}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/archivement', async (req, res) => {
                  const { apikey, text } = req.query;
                 
                
                  if (!apikey || !text) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                    const random = Math.floor(Math.random() * 45) + 1;
                    const uriset = `https://api.alexflipnote.dev/achievement?text=${text}&icon=${random}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/supreme', async (req, res) => {
                  const { apikey, text } = req.query;
                 
                
                  if (!apikey || !text) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                    const random = Math.floor(Math.random() * 45) + 1;
                    const uriset = `https://api.alexflipnote.dev/supreme?text=${text}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });


                router.get('/invert', async (req, res) => {
                  const { apikey, image } = req.query;
                 
                
                  if (!apikey || !image) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/invert?image=${image}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/greyscale', async (req, res) => {
                  const { apikey, image } = req.query;
                 
                
                  if (!apikey || !image) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/invert?image=${image}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/wanted', async (req, res) => {
                  const { apikey, image } = req.query;
                 
                
                  if (!apikey || !image) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/wanted?image=${image}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/communism', async (req, res) => {
                  const { apikey, image } = req.query;
                 
                
                  if (!apikey || !image) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/communism?image=${image}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/jail', async (req, res) => {
                  const { apikey, image, deg } = req.query;
                 
                
                  if (!apikey || !image) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/jail?image=${image}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/sadcat', async (req, res) => {
                  const { apikey, text } = req.query;
                 
                
                  if (!apikey || !text) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/sadcat?text=${text}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/hue', async (req, res) => {
                  const { apikey, image, deg } = req.query;
                 
                
                  if (!apikey || !image || !deg) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/hue-rotate?img=${image}&deg=${deg}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/imagequote', async (req, res) => {
                  const { apikey, image, text, author } = req.query;
                
                  if (!apikey || !image || !text || !author) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/quote?image=${encodeURIComponent(image)}&text=${encodeURIComponent(text)}&font=Poppins-Bold&name=${encodeURIComponent(author)}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                router.get('/welcomer', async (req, res) => {
                  const { apikey, background, text1, text2, text3, avatar } = req.query;
            
                  if (!apikey || !background || !text1 || !text2 || !text3 || !avatar) return res.status(401).json(error_apikey);
                
                  try {
                    const find = await checkapi(apikey);
                    if (!find) return res.status(404).json(errorapi);
                
                    const uriset = `https://api.popcat.xyz/welcomecard?background=${background}&text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&text3=${encodeURIComponent(text3)}&avatar=${avatar}`;
                    const { data } = await axios.get(uriset, { responseType: 'arraybuffer' });
                
                    const leakdata = await minusapikey(apikey);
                    if (!leakdata) return res.status(401).json(errorapi_limit);
                
                    res.set('Content-Type', 'image/jpeg');
                    res.send(data);
                  } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({
                      status: false,
                      author: process.env.AUTHOR,
                      code: 500,
                      message: "Internal Server Error"
                    });
                  }
                });

                


module.exports = router;

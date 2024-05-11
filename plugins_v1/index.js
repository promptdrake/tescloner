const express = require('express');
const router = express.Router();
/*
Import Modules
*/
const { 
  apivalidator,
   validatebyip,
  getUpdateCo } = require('../lib/checkapi');




 const checkapi = require('./checkapi');
  router.use('/auth', checkapi);

  const downloader = require('./downloader');
  router.use('/dl', downloader);

  const iseng = require('./iseng');
  router.use('/fun', iseng);

  const ai = require('./ai');
  router.use('/ai', ai);
  
  const updaterhangar = require('./updater');
const { author } = require('caliph-api');
const os = require('os');
  router.use('/updater', updaterhangar);

  /**
   * @swagger
   * /api/v1/ipv4:
   *   get:
   *     summary: Get IPv4 information
   *     description: Retrieve the IPv4 address and socket information.
   *     responses:
   *       200:
   *         description: Successful response with IPv4 information.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: boolean
   *                   description: The status of the response.
   *                 ip:
   *                   type: string
   *                   description: The IPv4 address.
   *                 socket:
   *                   type: string
   *                   description: The remote socket address.
   */
  router.get('/ipv4', (req, res) => {
    res.json({
      status: true,
      ip: req.ip,
      socket: req.socket.remoteAddress
    });
  });

  router.get('/runtime', async (req, res) => {
    const uptime = process.uptime();
    const days = Math.floor(uptime / (3600 * 24));
    const hours = Math.floor((uptime % (3600 * 24)) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const uptimeFormatted = `${days} day ${hours} hour ${minutes} minutes ${seconds} seconds`;

    res.json({
      status: true,
      code: 200,
      author: process.env.AUTHOR,
      uptime: uptimeFormatted
    });
  });


    router.get('/spec', async (req, res) => {
      const serverSpec = {
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        cpuModel: os.cpus()[0].model,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        uptime: os.uptime()
      };

      res.json({
        status: true,
        code: 200,
        serverSpec: serverSpec
      });
    });
  


router.get('/', (req, res) => {
  res.json({
    status: res.statusCode,
    author: process.env.AUTHOR,
    message: 'Welcome To Aisbir Authentication API',
  });
});

module.exports = router;

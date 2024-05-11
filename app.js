const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const ejs = require("ejs")
const cors = require('cors');
const bodyparser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
var options = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }, @media screen and (max-width: 600px) { .swagger-ui .wrapper { width: 100% } }',
};

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./plugins_v1');
const justadmin = require('./justadmin');

const app = express();

app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.set('trust proxy', true);
app.use(express.static('public'));
 app.set('view engine', 'ejs');
app.get('/', (req, res) => {
res.redirect('/docs');
});

app.use('/api/v1', api);
app.use('/api/admin', justadmin);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

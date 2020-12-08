const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

// import routers
const routerIdx = require('./routers/index');

const app = express();
const PORT = process.env.PORT || 3000;
// const whitelist = ['http://localhost:4000', 'http://example2.com'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// use routers
app.use('/api', routerIdx);

// error handler
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  if (err.status === 500) {
    res.status(500).send({
      code: 500,
      message: 'server error',
    });
  } else {
    next(err);
  }
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({
    code: 500,
    message: err.message,
  });
});

// app listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server on port ${PORT}`);
});

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config()
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression')
const httpStatus = require('http-status');


require('./db/models')

const indexRouter = require('./routes/index');
const apiV1Router = require('./routes/v1');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');

const app = express();

app.use(compression())
app.use(helmet());
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use((error, req, res, next) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Could not perform the action");
});

app.use('/', indexRouter);
app.use('/api/v1', apiV1Router);

app.use(notFound)

app.use(errorHandler)


module.exports = app;

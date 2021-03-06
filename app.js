var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var playersRouter = require('./routes/players');
var matchesRouter = require('./routes/matches');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/players', playersRouter);
app.use('/matches', matchesRouter);

module.exports = app;

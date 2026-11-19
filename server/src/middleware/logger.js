// winston: creates, formats and stores application logs
const winston = require('winston');
// captures the HTTP request sent to the express server
const morgan = require('morgan');
// deconstruct the functions you need from winston
// combine: combine multiple format rules
// timestamp: add a date and time to each log 
// json: to format and save the data as json
const { combine, timestamp, json } = winston.format;


// Create the instance of a winston logger
const winstonLogger = winston.createLogger({
  // Level: error, warn, info, http, verbose, debug, silly.
  level: 'http', //will log errors, warnings, info and http
  // Format: how we want our logs to look.
  format: combine(timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A'}), json()),
  // Transports: Specifies where we are logging to: console, file, db etc
  //creates a log.json file to store all the logs
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'log.json'})],
});


// Morgan logs/captures incoming HTTP request 
const morganLogger = morgan(
  function (tokens, req, res){
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: Number.parseFloat(tokens['response-time'](req, res)),
      response_time_ms: tokens['response-time'](req, res) + 'ms',
      remote_address: tokens['remote-addr'](req, res),
      remote_user: tokens['remote-user'](req, res),
      date: tokens.date(req, res),
      http_version: tokens['http-version'](req, res),
      user_agent: tokens['user-agent'](req, res),
      referrer: tokens.referrer(req, res)
    })
  },
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        winstonLogger.http(`incoming-request`, data);
      },
    },
  }
);


module.exports.winstonLogger = winstonLogger;
module.exports = morganLogger;
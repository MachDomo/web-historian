var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  let contentType;
  let fType = path.extname(asset);

  if ( fType === '.css' ) {
    contentType = 'text/css';
  } else if ( fType === '.js' ) {
    contentType = 'application/js';
  } else {
    contentType = 'text/html';
  }

  // console.log('ContentType', contentType);


  fs.readFile(asset, (err, data) => {
    if (err) {
      // console.log(err);
    } else {
      // res.setHeader('Content-Type', contentType);      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
    }
    res.end();
  });

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

exports.handleGetFiles = function(response, fileName, contentType) {

  fs.readFile(`${dir + fileName}`, function(err, data) {
    if (err) {
      response.writeHead(404);
      response.write('Not Found!');
    } else {
      response.writeHead(200, {'Content-Type': contentType});
      response.write(data);
    }
    response.end();
  });
};


// As you progress, keep thinking about what helper functions you can put here!

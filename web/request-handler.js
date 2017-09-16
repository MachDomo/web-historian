var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
// require more modules/folders here!
var helpers = require('./http-helpers.js');
var fs = require('fs');
var querystring = require('querystring');


var actions = {
  'GET': function(req, res) {
    // '/';
    if (req.url === '/') {
      req.url = '/index.html';
    } //index.html
    let asset = archive.paths.siteAssets + req.url;

    //
    helpers.serveAssets(res, asset);
  },
  'POST': function(req, res) {

    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('err', (err) => {
      throw err;
    });

    req.on('end', () => {

      var post = querystring.parse(body);
      console.log('body', body);
      // body url=www.google.com
      console.log('post', post);
      archive.isUrlInList(post.url, function(exists) {
        if (!exists) {
          console.log('WOOOOOO');
          archive.addUrlToList(post.url);
        }
      });
      res.writeHead(200, { 'Content-type': 'text/plain' });
      res.end();
    });
  }
};




exports.handleRequest = function(req, res) {

  actions[req.method](req, res);
  // if (req.method === 'GET') {

  //   if (req.url === '/') {
  //     let indexPath = archive.paths.siteAssets + '/index.html';
  //     fs.readFile(indexPath, (err, data) => {
  //       if (err) { throw err; }
  //       res.writeHead(200, helpers.headers['Content-type']);
  //       res.write(data);
  //       res.end();
  //     });
  //   }
  //   if (req.url === '/styles.css') {
  //     console.log('styles requested');
  //     helpers.serveAssets(res, archive.paths.siteAssets + req.url);
  //   }
  // } else {
  //   res.writeHead(404);
  //   res.end();
  // }
  // res.end(archive.paths.list);
};

// fs.readFile('/etc/passwd', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
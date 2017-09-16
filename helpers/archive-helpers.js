var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    let sitesArr = data.split('\n');
    console.log('callback', callback);
    callback(sitesArr);
  });
  // console.log('callback on sitesArr', callback(sitesArr));
  // console.log('Inside readListofUrls', sitesArr);
  // return callback(sitesArr);

};

exports.isUrlInList = function(url, callback1) {
  console.log('inside isUrlInList');
  exports.readListOfUrls((sites) => {
    console.log('sites------------>', sites);
    console.log('url', url);
    let answer = _.contains(sites, url);
    console.log('answer', answer);
    callback1(answer);
  });
  // step 1 read list
  // step 2 see if url is contained in the read list

};


/*
exports.isUrlInList(url, function(exists) {
  if (!exists) {
    addUrlToList
  }
})

*/

exports.addUrlToList = function(url, callback) {
  // console.log('TEST ------->', exports.isUrlInList(url));

  fs.appendFile(exports.paths.list, url + '\n', (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Data was appended to file');
    }
  });
  // Url in list???
};

exports.isUrlArchived = function(url, callback) {};

exports.downloadUrls = function(urls) {};
// test
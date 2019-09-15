module.exports = (function() {
  const fs = require('fs');
  const request = require('request');
  const togeojson = require('togeojson');
  const xmldom = new (require('xmldom')).DOMParser();

  /**
   *
   * @param {string} path
   *
   * @returns { string }
   */
  const readKml = path => {
    return new Promise((resolve, reject) => {
      if (path.indexOf('http') === 0) {
        request(path, (err, _response, body) => {
          if (err) return reject(err);
          resolve(body);
        });
      } else {
        fs.readFile(path, (err, data) => {
          if (err) return reject(err);
          resolve(data.toString());
        });
      }
    });
  };

  /**
   *
   * @param {string} path
   *
   * @returns { Object }
   */
  const toJson = path => {
    return new Promise((resolve, reject) => {
      readKml(path)
        .then(res => xmldom.parseFromString(res))
        .then(res => togeojson.kml(res))
        .then(resolve)
        .catch(reject);
    });
  };

  return {
    readKml,
    toJson,
  };
})();

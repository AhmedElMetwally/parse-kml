module.exports = (function() {
  const fs = require('fs');
  const http = require('http');
  const https = require('https');
  const togeojson = require('@tmcw/togeojson');
  const { DOMParser } = require('@xmldom/xmldom');

  const download = (url, redirects = 5) => {
    return new Promise((resolve, reject) => {
      const client = /^https:/i.test(url) ? https : http;
      client
        .get(url, res => {
          const { statusCode, headers } = res;
          if (statusCode >= 300 && statusCode < 400 && headers.location && redirects > 0) {
            res.resume();
            resolve(download(new URL(headers.location, url).href, redirects - 1));
            return;
          }
          if (statusCode < 200 || statusCode >= 300) {
            res.resume();
            reject(new Error(`Failed to fetch ${url}: ${statusCode}`));
            return;
          }
          const chunks = [];
          res.on('data', chunk => chunks.push(chunk));
          res.on('end', () => resolve(Buffer.concat(chunks)));
          res.on('error', reject);
        })
        .on('error', reject);
    });
  };

  /**
   *
   * @param {string} path
   *
   * @returns { Promise<string> }
   */
  const readKml = async path => {
    if (/^https?:\/\//i.test(path)) {
      return (await download(path)).toString('utf8');
    }
    return fs.promises.readFile(path, 'utf8');
  };

  /**
   *
   * @param {string} path
   *
   * @returns { Promise<Object> }
   */
  const toJson = async path => {
    const kml = await readKml(path);
    return togeojson.kml(new DOMParser().parseFromString(kml, 'text/xml'));
  };

  return {
    readKml,
    toJson,
  };
})();

module.exports = (function() {
  const fs = require('fs');
  const togeojson = require('@tmcw/togeojson');
  const { DOMParser } = require('@xmldom/xmldom');

  /**
   *
   * @param {string} path
   *
   * @returns { Promise<string> }
   */
  const readKml = async path => {
    if (/^https?:\/\//i.test(path)) {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
      }
      return response.text();
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

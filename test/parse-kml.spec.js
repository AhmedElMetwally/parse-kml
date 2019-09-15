const assert = require('assert');
const parseKMZ = require('../index');

describe('#0 Read KML', function() {
  it('Read KML File From URL', function() {
    parseKMZ
      .readKml('https://developers.google.com/kml/documentation/KML_Samples.kml')
      .then(res => assert.equal(typeof res, 'string'));
  });
  it('Read KML File From Dir', function() {
    parseKMZ
      .readKml('./kml-files/KML_Samples.kml')
      .then(res => assert.equal(typeof res, 'string'));
  });
});

describe('#1 To JSON', function() {
  it('Parse KML File From URL', function() {
    parseKMZ
      .toJson('https://developers.google.com/kml/documentation/KML_Samples.kml')
      .then(res => assert.equal(typeof res, 'object'));
  });
  it('Parse KML File From Dir', function() {
    parseKMZ
      .toJson('./kml-files/KML_Samples.kml')
      .then(res => assert.equal(typeof res, 'object'));
  });
});

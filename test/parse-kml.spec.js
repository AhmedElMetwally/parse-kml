const assert = require('assert');
const { describe, it } = require('node:test');
const parseKML = require('../index');

const URL = 'https://developers.google.com/kml/documentation/KML_Samples.kml';
const FILE = './kml-files/KML_Samples.kml';

describe('#0 Read KML', function() {
  it('Read KML File From URL', async function() {
    const res = await parseKML.readKml(URL);
    assert.strictEqual(typeof res, 'string');
    assert.ok(res.includes('<kml'));
  });
  it('Read KML File From Dir', async function() {
    const res = await parseKML.readKml(FILE);
    assert.strictEqual(typeof res, 'string');
    assert.ok(res.includes('<kml'));
  });
  it('Rejects for a missing file', async function() {
    await assert.rejects(parseKML.readKml('./kml-files/missing.kml'));
  });
});

describe('#1 To JSON', function() {
  it('Parse KML File From URL', async function() {
    const res = await parseKML.toJson(URL);
    assert.strictEqual(res.type, 'FeatureCollection');
    assert.ok(res.features.length > 0);
  });
  it('Parse KML File From Dir', async function() {
    const res = await parseKML.toJson(FILE);
    assert.strictEqual(res.type, 'FeatureCollection');
    assert.ok(res.features.length > 0);
    assert.ok(res.features.some(f => f.geometry && f.geometry.type === 'Point'));
  });
});

parse-kml
===========
[![npm](https://img.shields.io/npm/v/parse-kml.svg)](https://www.npmjs.com/package/parse-kml)

Ever had the urge to parse KML? And wanted to access the data in some sane,
easy way? Don't want to compile a C parser, for whatever reason? Then parse-kml is
what you're looking for!

Converts KML (from a local file or a URL) to [GeoJSON](https://geojson.org/).

Installation
============

```bash
npm install parse-kml
```

Requires Node.js 18 or newer.

Usage
=====

```javascript
const parseKML = require('parse-kml');

// Read KML From URL
parseKML
  .readKml('https://developers.google.com/kml/documentation/KML_Samples.kml')
  .then(console.log)
  .catch(console.error);

// Read KML From File
parseKML
  .readKml('./path-to-file/file-name.kml')
  .then(console.log)
  .catch(console.error);

// KML To JSON From URL
parseKML
  .toJson('https://developers.google.com/kml/documentation/KML_Samples.kml')
  .then(console.log)
  .catch(console.error);

// KML To JSON From File (async/await)
const geojson = await parseKML.toJson('./path-to-file/file-name.kml');
console.log(geojson.features);
```

API
===

| Function | Returns |
| --- | --- |
| `readKml(pathOrUrl)` | `Promise<string>`: the raw KML text |
| `toJson(pathOrUrl)` | `Promise<FeatureCollection>`: GeoJSON |

Paths starting with `http://` or `https://` are downloaded; anything else is read from disk.

Need KMZ? See [parse-kmz](https://www.npmjs.com/package/parse-kmz).

Changelog
=========

**2.0.0**
- Requires Node.js 18+ (uses built-in `fetch`; the deprecated `request` package is gone).
- Switched to the maintained `@xmldom/xmldom` and `@tmcw/togeojson`, fixing known security issues in the old dependencies.
- HTTP errors (e.g. 404) now reject instead of resolving with the error page.

Found a bug? Feel free to [open an issue](https://github.com/AhmedElMetwally/parse-kml/issues).

parse-kml (1.x, legacy)
===========
[![npm](https://img.shields.io/npm/v/parse-kml/legacy.svg?label=npm%40legacy)](https://www.npmjs.com/package/parse-kml/v/legacy)
[![test](https://github.com/AhmedElMetwally/parse-kml/actions/workflows/test.yml/badge.svg?branch=v1)](https://github.com/AhmedElMetwally/parse-kml/actions/workflows/test.yml?query=branch%3Av1)

> **This is the 1.x line for old projects on Node.js 12 – 16.**
> On Node.js 18 or newer, use 2.x instead: see the [main README](https://github.com/AhmedElMetwally/parse-kml#readme).

Converts KML (from a local file or a URL) to [GeoJSON](https://geojson.org/).

Which version should I use?
===========================

| Your project's Node.js (`node -v`) | Install | Version |
| --- | --- | --- |
| 18 or newer (new projects) | `npm install parse-kml` | 2.x |
| 12, 14 or 16 (old projects) | `npm install parse-kml@legacy` | 1.x |

Tested on every push, on every Node.js version from 12 to 24:

| Node.js | 12 | 14 | 16 | 18 | 20 | 22 | 24 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1.1.x | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2.x | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |

Already using 1.0.x? Run `npm update parse-kml`. Your `^1.0.x` range picks up 1.1.x, with the same API and no code changes.

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

// KML To JSON From File
parseKML
  .toJson('./path-to-file/file-name.kml')
  .then(console.log)
  .catch(console.error);
```

| Function | Returns |
| --- | --- |
| `readKml(pathOrUrl)` | `Promise<string>`: the raw KML text |
| `toJson(pathOrUrl)` | `Promise<FeatureCollection>`: GeoJSON |

Paths starting with `http://` or `https://` are downloaded; anything else is read from disk.

Changelog
=========

**1.1.0**
- Works on Node.js 12 through 24.
- Removed the deprecated `request` package; downloads use Node's built-in `http`/`https` (redirects are followed).
- Switched to the maintained `@xmldom/xmldom` (0.8) and `@tmcw/togeojson` (4.7), fixing known security issues in the old dependencies.
- HTTP errors (e.g. 404) now reject instead of resolving with the error page.
- Fixed the README examples (they had a syntax error).

Found a bug? Feel free to [open an issue](https://github.com/AhmedElMetwally/parse-kml/issues).

parse-kml
===========
[![npm](https://img.shields.io/npm/v/parse-kml.svg)](https://www.npmjs.com/package/parse-kml)
[![test](https://github.com/AhmedElMetwally/parse-kml/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/AhmedElMetwally/parse-kml/actions/workflows/test.yml?query=branch%3Amaster)

Ever had the urge to parse KML? And wanted to access the data in some sane,
easy way? Don't want to compile a C parser, for whatever reason? Then parse-kml is
what you're looking for!

Converts KML (from a local file or a URL) to [GeoJSON](https://geojson.org/).

Installation
============

Check your project's Node.js version with `node -v`, then:

| Your project's Node.js | Install | Version |
| --- | --- | --- |
| 18 or newer (new projects) | `npm install parse-kml` | 2.x (latest) |
| 12, 14 or 16 (old projects) | `npm install parse-kml@legacy` | 1.x ([docs](https://github.com/AhmedElMetwally/parse-kml/tree/v1#readme)) |

Both lines are tested on every push, on every Node.js version from 12 to 24:

| Node.js | 12 | 14 | 16 | 18 | 20 | 22 | 24 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2.x | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| 1.1.x | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### Old project already using 1.0.x?

- **Staying on Node 12–16:** run `npm update parse-kml`. Your `^1.0.x` range picks up 1.1.x, with the same API and no code changes.
- **Moving to 2.x:** you need Node 18+. Run `npm install parse-kml@latest`. The API is the same, but run your tests:
  2.x uses a newer GeoJSON converter, so a few results can differ slightly
  (for example, the Google `KML_Samples.kml` gives 21 features on 2.x and 20 on 1.x).

npm never moves you from 1.x to 2.x on its own. A `^1.0.0` range stays on 1.x until you upgrade on purpose.

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

**2.0.1**
- Documented which version to use on which Node.js version; added CI for Node.js 18 to 24.
- Released 1.1.0 (`npm install parse-kml@legacy`) for projects on Node.js 12 to 16.

**2.0.0**
- Requires Node.js 18+ (uses built-in `fetch`; the deprecated `request` package is gone).
- Switched to the maintained `@xmldom/xmldom` and `@tmcw/togeojson`, fixing known security issues in the old dependencies.
- HTTP errors (e.g. 404) now reject instead of resolving with the error page.

Found a bug? Feel free to [open an issue](https://github.com/AhmedElMetwally/parse-kml/issues).

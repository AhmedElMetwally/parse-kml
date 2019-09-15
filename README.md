parse-kml
===========
Ever had the urge to parse KML? And wanted to access the data in some sane,
easy way? Don't want to compile a C parser, for whatever reason? Then parse-kml is
what you're looking for!

Installation
============

Simplest way to install `parse-kml` is to use [npm](http://npmjs.org), just `npm
install parse-kml` which will download parse-kml and all dependencies.

Usage
=====

```javascript
const parseKML = require('parse-kml');
// Read KML From URL
parseKML
  .readKml('https://developers.google.com/kml/documentation/KML_Samples.kml')
  .then(console.log);
  .catch(console.error);
 
// Read KML From File
parseKML
  .readKml('./path-to-file/file-name.kml')
  .then(console.log);
  .catch(console.error);
  
// KML To JSON From URL
parseKML
  .toJson('https://developers.google.com/kml/documentation/KML_Samples.kml')
  .then(console.log);
  .catch(console.error);
 
// KML To JSON From File
parseKML
  .toJson('./path-to-file/file-name.kml')
  .then(console.log);
  .catch(console.error);
```

But if you know you really found a bug, feel free to open an issue instead.

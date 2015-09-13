# read-closest-package

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Reads the closest package.json file and parses its JSON.

```js
require('read-closest-package')(function(err, data, filename) {
  console.log(data.version)
  console.log(data.description)
  console.log(filename)
})
```

Also has a sync API which returns `null` on any errors:

```js
var closest = require('read-closest-package')

var pkg = closest.sync()
if (pkg) 
  console.log(pkg.version)
```

## Usage

[![NPM](https://nodei.co/npm/read-closest-package.png)](https://www.npmjs.com/package/read-closest-package)

#### `closest([opt], cb)`

Looks for the closest package and calls the callback `cb` with `(err, data,
filename)`.

- `cwd` the working directory to search up from for the package.json (defaults to `process.cwd()`)
- `filter` a filter passed to [closest-package](https://github.com/hughsk/closest-package/)

If there was an error finding the pacakge or parsing JSON, `err` will be non-null.

#### `data = closest.sync([opt])`

The same as above, but synchronous. Returns null on any errors.

## See Also

- [pkg-dir](https://github.com/sindresorhus/pkg-dir)
- [closest-package](https://github.com/hughsk/closest-package/)
- [read-pkg](https://github.com/sindresorhus/read-pkg)
- [normalize-package-data](https://github.com/npm/normalize-package-data)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/read-closest-package/blob/master/LICENSE.md) for details.

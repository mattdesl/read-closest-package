var closest = require('closest-package')
var read = require('load-json-file')

var truthy = function() { return true }

module.exports = function(opt, cb) {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }
  if (typeof cb !== 'function') {
    throw new TypeError('must specify function as second argument')
  }

  var cwd = opt.cwd || process.cwd()
  var filter = opt.filter || truthy
  closest(cwd, filter, function(err, file) {
    if (err || !file) {
      return process.nextTick(function() {
        cb(new Error('Could not find a root package.json from:\n'+cwd))
      })
    }
    read(file).then(function (json) {
      cb(null, json)
    }, cb)
  })
}

module.exports.sync = function(opt) {
  opt = opt||{}
  var cwd = opt.cwd || process.cwd()
  var filter = opt.filter || truthy
  var result = closest.sync(cwd, filter)
  if (result) {
    return read.sync(result)
  }
  return null
}
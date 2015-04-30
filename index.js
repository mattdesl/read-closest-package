var closest = require('closest-package')
var read = require('read-json')
var fs = require('fs')

var truthy = function() { return true }

module.exports = function(opt, cb) {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }

  var cwd = opt.cwd || process.cwd()
  var filter = opt.filter || truthy
  closest(cwd, filter, function(err, file) {
    if (err || !file) {
      return process.nextTick(function() {
        cb(new Error('Could not find a root package.json from:\n'+cwd))
      })
    }
    read(file, cb)
  })
}

module.exports.sync = function(opt) {
  opt = opt||{}
  var cwd = opt.cwd || process.cwd()
  var filter = opt.filter || truthy
  var result = closest.sync(cwd, filter)
  if (result) {
    var data = fs.readFileSync(result, 'utf8')
    if (!data) 
      return null
    try {
      return JSON.parse(data)
    } catch (e) { }
  }
  return null
}
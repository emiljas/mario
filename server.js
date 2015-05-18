var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

var serve = serveStatic('./', {'index': ['index.html', 'index.htm']})

var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
})

server.listen(3000, "192.168.1.198")

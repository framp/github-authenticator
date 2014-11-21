var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var requireDir = require('./lib/requireDir');

var app = express();

app.use(serveStatic(__dirname + '/public'));
app.use(compression({ threshold: 512 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
requireDir(__dirname + '/controllers', app);

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000,
           process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
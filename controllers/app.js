var request = require('request');

var App = require('../models/app');

module.exports = function(app){
  app.post('/apps', function(req, res, next){
    App.create(req.body)
    .then(function(app) {
      res.send(201, app.values);
    }, function(err){
      console.error(err);
      res.send(500);
    });
  });
  
  app.put('/apps/:client_id', function(req, res, next){
    App.update(req.body, { where: { client_id: req.params.client_id } })
    .then(function(app) {
      res.send(200, app.values);
    }, function(err){
      console.error(err);
      res.send(500);
    });
  });
  
  app.get('/apps/:client_id', function(req, res, next){
    App.find({ client_id: req.params.client_id })
    .then(function(app) {
      res.send(200, app.values);
    }, function(err){
      console.error(err);
      res.send(500);
    });
  });
  
  app.get('/callback/:client_id', function(req, res, next){
    App.find({ client_id: req.params.client_id })
    .then(function(app) {
      console.log("CANE", app.values, req.query, req.body);
      var code = req.query.code;
      request.post({
        url: 'https://github.com/login/oauth/access_token', 
        body: {
          client_id: app.values.client_id,
          client_secret: app.values.client_secret,
          code: code
        }, 
        header: { accept: 'json' },
        json: true
      }, function(err, incoming, body){
        console.log("DIO", err, incoming, body);
        var accessToken = body.access_token || 'error';
        var callback = app.values.callback.replace('{ID}', accessToken);
        res.redirect(callback);
      })
    }, function(err){
      console.error(err);
      res.send(500);
    });
  });
}

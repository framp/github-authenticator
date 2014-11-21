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
    App.update(req.body, { client_id: req.body.client_id })
    .then(function(app) {
      res.send(200, app.values);
    }, function(err){
      console.error(err);
      res.send(500);
    });
  });
  
  app.get('/apps/:client_id', function(req, res, next){
    App.find({ client_id: req.body.client_id })
    .then(function(app) {
      res.send(200, app.values);
    }, function(err){
      console.error(err);
      res.send(500);
    });
  });
  
  app.get('/callback/:client_id', function(req, res, next){
    App.find({ client_id: req.body.client_id })
    .then(function(app) {
      res.send(200, app.values);
    }, function(err){
      console.error(err);
      res.send(500);
    });
  });
}

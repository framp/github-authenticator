var App = require('../models/app');

module.exports = function(app){
  app.post('/apps', function(req, res, next){
    App
    .create(req.body)
    .success(function(app) {
      res.send(201, app.values);
    })
  });
  
  app.get('/apps/:client_id', function(){
    App
    .find({ client_id: req.body.client_id })
    .success(function(app) {
      res.send(200, app.values);
    })
  });
  
  app.get('/callback/:client_id', function(){
    App
    .find({ client_id: req.body.client_id })
    .success(function(app) {
      
    })
  });
}

var request = require('request');

var App = require('../models/app');

function error500(err){
  console.error(err);
  res.send(500);
}

module.exports = function(app){
  app.post('/apps', function(req, res, next){
    App.create(req.body)
    .then(function(app) {
      if (!app) 
        return res.send(404);
      res.send(201, app.values);
    }, error500);
  });
  
  app.get('/apps/:client_id', function(req, res, next){
    App.find({ where: { client_id: req.params.client_id, 
                        client_secret: req.query.client_secret } })
    .then(function(app) {
      if (!app) 
        return res.send(404);
      res.send(200, app.values);
    }, error500);
  });
  
  app.put('/apps/:client_id', function(req, res, next){
    App.update(req.body, 
               { where: { client_id: req.params.client_id, 
                          client_secret: req.body.client_secret },
                 returning: true })
    .then(function(app) {
      if (!app || !app[0] || !app[1] || !app[1][0]) 
        return res.send(404);
      res.send(200, app[1][0]);
    }, error500);
  });
  
  app.delete('/apps/:client_id', function(req, res, next){
    App.destroy({ where: { client_id: req.params.client_id, 
                          client_secret: req.body.client_secret } })
    .then(function(app) {
      res.send(200, app.values);
    }, error500);
  });
  
  app.get('/callback/:client_id', function(req, res, next){
    App.find({ where: { client_id: req.params.client_id } })
    .then(function(app) {
      if (!app) 
        return res.send(404);
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
        var accessToken = body.access_token || 'error';
        var callback = app.values.callback.replace('{ID}', accessToken);
        res.redirect(callback);
      })
    }, error500);
  });
}

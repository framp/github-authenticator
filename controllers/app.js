var request = require('request');

var App = require('../models/app');

function error500(res, err){
  console.error(err);
  res.status(500).send(err);
}

module.exports = function(app){
  app.post('/apps', function(req, res, next){
    App.create(req.body)
    .then(function(app) {
      if (!app) 
        return res.status(404).send();
      res.status(201).send(app.values);
    }, error500.bind(null, res));
  });
  
  app.get('/apps/:client_id', function(req, res, next){
    App.find({ where: { client_id: req.params.client_id, 
                        client_secret: req.query.client_secret } })
    .then(function(app) {
      if (!app) 
        return res.status(404).send();
      res.status(200).send(app.values);
    }, error500.bind(null, res));
  });
  
  app.put('/apps/:client_id', function(req, res, next){
    App.update(req.body, 
               { where: { client_id: req.params.client_id, 
                          client_secret: req.body.client_secret },
                 returning: true })
    .then(function(app) {
      if (!app || !app[0] || !app[1] || !app[1][0]) 
        return res.status(404).send();
      res.status(200).send(app[1][0]);
    }, error500.bind(null, res));
  });
  
  app.delete('/apps/:client_id', function(req, res, next){
    App.destroy({ where: { client_id: req.params.client_id, 
                          client_secret: req.body.client_secret } })
    .then(function(app) {
      res.status(200).send();
    }, error500.bind(null, res));
  });
  
  app.get('/callback/:client_id', function(req, res, next){
    App.find({ where: { client_id: req.params.client_id } })
    .then(function(app) {
      if (!app) 
        return res.status(404).send();
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
    }, error500.bind(null, res));
  });
}

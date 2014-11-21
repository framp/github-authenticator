var fs = require('fs');
var path = require('path');

module.exports = function(dir, app){
  if (fs.existsSync(dir)){
    fs.readdirSync(dir).forEach(function(file){
      var filePath = path.join(dir, file);
      if (file.match(/\.js$/))
        return require(filePath)(app);
      if (fs.lstatSync(filePath).isDirectory())
        return requireDir(filePath, app);
    });
  }
} 

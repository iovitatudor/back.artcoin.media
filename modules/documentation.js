const path = require("path");

module.exports = function(req,res){
  res.sendFile(path.resolve() + '/views/documentation.html');
}
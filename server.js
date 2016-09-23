var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));
app.use('/vendor', express.static(__dirname + '/node_modules'));

app.listen(8001, function () {
  console.log("PORT: 8001");
});

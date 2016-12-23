var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname + '/../');

require('dotenv').config();

app.use(express.static(rootPath));

//app.get('/summoner', function(req, res){
//  res.send('Hello World!');
//});

//app.get('*', function(req, res) { res.sendFile(rootPath + '/index.html'); });

app.get('/championList', function (req, res) {
  var endpoint = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image,stats&api_key=" + process.env.RIOT_API_KEY;
  //res.send('request to get all champion list...');
  res.redirect(endpoint);
});

app.get('/itemList', function (req, res) {
  var endpoint = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=all&api_key=" + process.env.RIOT_API_KEY;
  res.redirect(endpoint);
});

app.listen(8001);
console.log('Listening on port 8001...');
console.log(process.env.RIOT_API_KEY);
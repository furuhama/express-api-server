// Init Express application
var express = require("express");
var app = express();

// Init server with port 3000
var server = app.listen(3000, function(){
  console.log("Express Server is listening to PORT: " + server.address().port);
});

var languageList = [
  {
    id: "1",
    name: "Ruby",
    type: "Dynamic"
  },{
    id: "2",
    name: "Rust",
    type: "Static"
  }
]

// Define Routings

// languages#index
app.get("/api/languages", function(req, res, next){
  console.log("protocol: " + req.protocol);
  console.log("method: " + req.method);
  console.log("originalUrl: " + req.originalUrl);
  console.log("hostname: " + req.hostname);
  console.log("body: " + req.body);

  res.json(languageList);
});

// languages#show
app.get("/api/languages/:languageId", function(req, res, next){
  let language;

  for (i = 0; i < languageList.length; i++){
    // You can use parameter with `req.params.PARAMETER_NAME`
    if (languageList[i].id == req.params.languageId){
      language = languageList[i];
    }
  }

  res.json(language);
});

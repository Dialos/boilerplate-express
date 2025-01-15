require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
console.log("Hello World")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  var method = req.method;
  var path = req.path;
  var ip = req.ip;
  console.log(method + " " + path + " - " + ip);
  next()
} )

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({"time": req.time});
});

/* app.get("/", function(req, res) {
    res.send('Hello Express');
  })
*/

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html")
})

app.use("/public", express.static(__dirname + "/public"))

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE==="uppercase") {
  res.json({"message": "Hello json".toUpperCase()});
} else {
    res.json({"message": "Hello json"});
  }
})

app.get("/:word/echo", function(req, res) {
  var word = req.params.word;
  res.json({"echo": word});
})

app.post("/name", function(req, res){
  var firstname = req.body.first;
  var lastname = req.body.last;
 res.json({"name": `${firstname} ${lastname}`});
})

app.get("/name", function(req, res) {
  var firstname = req.query.first;
  var lastname = req.query.last;
  res.json({"name": `${firstname} ${lastname}`});
})

































 module.exports = app;

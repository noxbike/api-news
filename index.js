var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router').router;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/bonjour', function(req, res) {
    res.send('Bonjour!');
});

app.use('/api', router);

app.listen(4000, function() {
    console.log("Application d'exemple écoutant sur le port 4000");
})
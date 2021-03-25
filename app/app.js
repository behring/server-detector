const propertiesPath='urls.properties';
const request = require('request');

var express = require('express');
var logger = require('./javascripts/logger.js');
var propertiesReader = require('properties-reader');
var urlProperties = propertiesReader(propertiesPath);
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'pug')
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("server-dectect app listening at http://%s:%s", host, port);
});

app.get('/', function (req, res) {
    var urls = loadUrls();
    var urlPromises = urls.map(item => {
        return requestUrl(item)
    });
    Promise.all(urlPromises).then(items => {
        res.render('index', {
            urls: items
        })
    });
});

app.post('/urls', function (req, res) {
    if(req.body.method=="delete") {
        delete urlProperties._properties[req.body.name]
    } else {
        urlProperties.set(req.body.name, req.body.url);
    }
    console.log("urlProperties: ", urlProperties);
    urlProperties.save(propertiesPath).then(function(){
        res.status(200).redirect("/");
    }, function() {
        res.status(500).send("error");
    });
});

function loadUrls() {
    var properties = urlProperties._properties;
    var urls = [];
    for (var key in properties) {
        var url = {
            name: key,
            url: properties[key],
            isSuccess: true,
        };
        urls.push(url)
    }
    return urls;
}

function requestUrl(item) {
    item.isSuccess = true;
    return new Promise(resolve => {
        request(item.url, function (error, response) {

            if (error != null || response.statusCode != 200) {
                logger.log('error', `error: ${JSON.stringify(error)}`);
                logger.log('info', `url item: ${JSON.stringify(item)}, statusCode: ${response && response.statusCode}`);
                item.isSuccess = false;
            } 
            resolve(item);
        });
    });
}
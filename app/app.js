var express = require('express');
const request = require('request');
var logger = require('./javascripts/logger.js');

var app = express();
app.set('view engine', 'pug')
app.use(express.static('public'));

var urls = [{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },{
        url: "https://www.baidu.com/afdafsfasfsfasdfadsfasfasdfasfasdfasfasfasf",
        isSuccess: true,
    },
    {
        url: "https://www.taobao.com",
        isSuccess: true,
    },
    {
        url: "https://www.jd.com",
        isSuccess: true,
    },
]

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("server-dectect app listening at http://%s:%s", host, port);
});

app.get('/', function (req, res) {
    var urlPromises = urls.map(item => {
        return requestUrl(item)
    });
    Promise.all(urlPromises).then(items => {
        console.log('url items: ', items);
        res.render('index', {
            urls: items
        })
    });
});

function requestUrl(item) {
    item.isSuccess = true;
    return new Promise(resolve => {
        request(item.url, function (error, response) {
            
            if (error != null || response.statusCode != 200) {
                logger.log('error', `error: ${JSON.stringify(error)}`);
                item.isSuccess = false;
            }
            logger.log('info', `url item: ${JSON.stringify(item)}, statusCode: ${response && response.statusCode}`);
            resolve(item);
        });
    });
}
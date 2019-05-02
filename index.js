var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
app.get("/", function (req, res) {
    if (!req.query.userName) {
        var filePath = path.join(__dirname, 'form.html');
        res.status(400);
        res.sendFile(filePath);
        return;
    }
    var filePath = path.join(__dirname, 'index.html');
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("開檔失敗");
            return;
        }
        data = data.toString();
        data = data.replace(/%%title%%/g, "使用 Template 做回應");
        data = data.replace("%%userName%%", req.query.userName);
        res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
        res.write(data);
        res.end();
    });
});

var port = 3000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});

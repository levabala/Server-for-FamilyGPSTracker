var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('./path.js');
console.log('Start server');

var server = http.createServer(function(req,res){
    var postData="";
    console.log('New request from ' + req.socket.remoteAddress);
    var address = url.parse(req.url, true);
    switch (address.pathname){
        case '/Empty':
            sendFile('Empty.html', res);
            break;
        case '/android':
            var request = "";
            if (req.method=="POST"){
                req.addListener("data", function(postDataChunk){
                    postData += postDataChunk;
                    console.log("New chunk! " + postDataChunk);
                });

                req.addListener("end", function(){
                    path.loadPath(req, res, postData);
                    sendFile('uploaded.html', res);
                });
            }
            break;
        default:
            res.statusCode = 404;
            res.end('Not found');
    }
});
server.listen(3000, '192.168.3.5');


function sendFile(fileName,res){
    var fileStream = fs.createReadStream(fileName);
    fileStream
        .on('error', function(){
            res.statusCode = 500;
            res.end('Server error');
        })
        .pipe(res);
}

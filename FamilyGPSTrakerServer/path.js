var fs = require('fs');
var Pathes = require('./Pathes.json');
exports.loadPath = function(req, res, path){
    console.log("Path: " + path);
    var ip = req.socket.remoteAddress;
    var date = new Date();
    var name = "From " + ip + " at " + date;
    Pathes[name] = path;
    if (typeof Pathes == 'object') Pathes = JSON.stringify(Pathes);
    var dateId = ip + 'at' + date.getFullYear()+date.getMonth()+date.getDay()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
    fs.writeFile('./Trackes/' + dateId + '.gpx', path, function(err){
        if (err) console.log('ОШИБКА: ' + err);
    });
    fs.writeFile('./Pathes.json', Pathes, function(err){
        if (err) console.log('ОШИБКА: ' + err);
    });
    res.statusCode=202;
    res.message="Маршрут получен... Спасибо за пользование нашим сервесом!";
    res.end("Маршрут получен... Спасибо за пользование нашим сервесом!");
};

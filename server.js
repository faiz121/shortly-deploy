// Change 2 : I made this change from my local
var app = require('./server-config.js');

var port = 80;

app.listen(port);

console.log('Server now listening on port ' + port);

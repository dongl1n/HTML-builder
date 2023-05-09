const fs = require('fs');
let stream = new fs.ReadStream('./01-read-file/text.txt', {encoding: 'utf-8'});

stream.on('readable', function(){
    var data = stream.read();
    if(data) process.stdout.write(data);
});
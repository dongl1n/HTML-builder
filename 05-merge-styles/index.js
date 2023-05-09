const fs = require('fs');
const path = require('path');

fs.readdir("./05-merge-styles/styles", {withFileTypes: true}, (err, files) => { //Чтение содержимого папки **styles**
    if (err){
        console.log(err);
    }
    else {
        fs.unlink("./05-merge-styles/project-dist/bundle.css", (err) => {
            if (err) console.log(err); 
            else console.log("bundle.css удален");
        });
        files.forEach(file => {
            if(path.extname(file.name)===".css") {
                let __file = './05-merge-styles/styles/' + file.name;
                let stream = new fs.ReadStream(__file, {encoding: 'utf-8'});
                stream.on('readable', function(){
                    let data = stream.read();
                    let buf;
                    fs.appendFile('./05-merge-styles/project-dist/bundle.css', buf = String((data===null)?"":data), (err) => {
                        if (err){
                            console.log(err);
                        }
                        else {
                            console.log("bundle.css перезаписан");
                        }
                    });
                });
            }
        })
    }
})
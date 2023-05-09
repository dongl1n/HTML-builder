let fs = require('fs');
const path = require('path');

fs.stat('./04-copy-directory/files-copy', function(err) {
    if (!err) {
        console.log('Директория уже существует');
    }
    else if (err.code === 'ENOENT') {
        console.log('Директории не существует');
        fs.mkdir('./04-copy-directory/files-copy', err => {
            if(err) throw err;
            console.log('Директория успешно создана');
        });
    }
    let list=[];
    fs.readdir("./04-copy-directory/files", {withFileTypes: true}, (err, files) => {
        if (err){
            console.log(err);
        }
        else {
            files.forEach(file => {
                list.push(path.basename(file.name));
                let __file = "./04-copy-directory/files/"+path.basename(file.name);
                let __fileCopy = "./04-copy-directory/files-copy/"+path.basename(file.name);
                console.log(__file)
                fs.copyFile(__file, __fileCopy, err => {
                    if(err) throw err; // не удалось скопировать файл
                    console.log('Файл успешно скопирован');
                });
            })
        }
    });
    fs.readdir("./04-copy-directory/files-copy/", {withFileTypes: true}, (err, files) => {
        if (err){
            console.log(err);
        }
        else {
            files.forEach(file => {
                if(!list.includes(path.basename(file.name))){
                    fs.unlink( "./04-copy-directory/files-copy/"+path.basename(file.name), err => {
                        if(err) throw err; // не удалось удалить файл
                        console.log('Файл успешно удалён');
                    });
                }
            })
        }
    });
    
});
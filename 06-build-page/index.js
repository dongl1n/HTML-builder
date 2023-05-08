const fs = require('fs');
const path = require('node:path');

fs.readdir("./06-build-page/assets", {withFileTypes: true}, (err, dirs) => {
    if (err){
        console.log(err);
    }
    else {
        dirs.forEach(dir => {
            let __dir = "./06-build-page/project-dist/assets/"+path.basename(dir.name);
            console.log(__dir)
            fs.mkdir(String(__dir), { recursive: true }, err => {
                if(err) throw err;
                console.log(`Папка ${__dir} успешно создана`);
            });
        })
    }
});

fs.readdir("./06-build-page/styles", {withFileTypes: true}, (err, files) => {
    if (err){
        console.log(err);
    }
    else {
        fs.unlink("./06-build-page/project-dist/style.css", (err) => {
            if (err) console.log(err); 
            else console.log("style.css удален");
        });
        files.forEach(file => {
            if(path.extname(file.name)===".css") {
                let __file = './06-build-page/styles/' + file.name;
                let stream = new fs.ReadStream(__file, {encoding: 'utf-8'});
                stream.on('readable', function(){
                    let data = stream.read();
                    fs.appendFile("./06-build-page/project-dist/style.css", String(data), (err) => {
                        if (err){
                            console.log(err);
                        }
                        else {
                            console.log("style.css перезаписан");
                        }
                    });
                });
            }
        })
    }
})

let dataHeader, dataArticle, dataFooter;
let streamHeader = new fs.ReadStream("./06-build-page/components/header.html", {encoding: 'utf-8'});
    streamHeader.on('readable', function(){
        dataHeader = streamHeader.read();
    });
let streamArticle = new fs.ReadStream("./06-build-page/components/articles.html", {encoding: 'utf-8'});
    streamArticle.on('readable', function(){
    dataArticle = streamArticle.read();
    });
let streamFooter = new fs.ReadStream("./06-build-page/components/footer.html", {encoding: 'utf-8'});
    streamFooter.on('readable', function(){
    dataFooter = streamFooter.read();
    });

fs.unlink("./06-build-page/project-dist/index.html", (err) => {
    if (err) console.log(err); 
    else console.log("index.html удален");
});

let stream = new fs.ReadStream("./06-build-page/template.html", {encoding: 'utf-8'});
stream.on('readable', function(){
    let dataIndex = stream.read();
    if(dataIndex){ 
        dataIndex = dataIndex.replace(/{{header}}/, dataHeader);
        dataIndex = dataIndex.replace(/{{articles}}/, dataArticle);
        dataIndex = dataIndex.replace(/{{footer}}/, dataFooter);
    }
    fs.appendFile("./06-build-page/project-dist/index.html", String(dataIndex), (err) => {
        if (err){
            console.log(err);
        }
        else {
            console.log("index.html перезаписан");
        }
    });
});
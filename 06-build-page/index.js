const fs = require('fs');
const path = require('path');

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

let styles = {};

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
                    switch(__file){
                        case "./06-build-page/styles/header.css": { if(data) styles.header=data; break;}
                        case "./06-build-page/styles/main.css": { if(data) styles.main=data; break;}
                        case "./06-build-page/styles/footer.css": { if(data) styles.footer=data; break;}
                    }
                    fs.writeFile("./06-build-page/project-dist/style.css", styles.header+styles.main+styles.footer, (err) => {
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
    let buf;
    fs.appendFile("./06-build-page/project-dist/index.html", buf = String((dataIndex===null)?"":dataIndex), (err) => {
        if (err){
            console.log(err);
        }
        else {
            console.log("index.html перезаписан");
        }
    });
});

fs.readdir("./06-build-page/assets/fonts", {withFileTypes: true}, (err, files) => {
    if (err){
        console.log(err);
    }
    else {
        files.forEach(file => {
            let __file = "./06-build-page/assets/fonts/"+path.basename(file.name);
            let __fileCopy = "./06-build-page/project-dist/assets/fonts/"+path.basename(file.name);
            fs.copyFile(__file, __fileCopy, err => {
                if(err) throw err; // не удалось скопировать файл
                console.log('Файл успешно скопирован');
            });
        })
    }
});

fs.readdir("./06-build-page/assets/img", {withFileTypes: true}, (err, files) => {
    if (err){
        console.log(err);
    }
    else {
        files.forEach(file => {
            let __file = "./06-build-page/assets/img/"+path.basename(file.name);
            let __fileCopy = "./06-build-page/project-dist/assets/img/"+path.basename(file.name);
            fs.copyFile(__file, __fileCopy, err => {
                if(err) throw err; // не удалось скопировать файл
                console.log('Файл успешно скопирован');
            });
        })
    }
});

fs.readdir("./06-build-page/assets/svg", {withFileTypes: true}, (err, files) => {
    if (err){
        console.log(err);
    }
    else {
        files.forEach(file => {
            let __file = "./06-build-page/assets/svg/"+path.basename(file.name);
            let __fileCopy = "./06-build-page/project-dist/assets/svg/"+path.basename(file.name);
            fs.copyFile(__file, __fileCopy, err => {
                if(err) throw err; // не удалось скопировать файл
                console.log('Файл успешно скопирован');
            });
        })
    }
});
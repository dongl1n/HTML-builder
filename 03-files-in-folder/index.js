const fs = require('fs');
const path = require('node:path'); 
let __file = "./secret-folder";

fs.readdir("./secret-folder", {withFileTypes: true}, (err, files) => {
    if (err){
        console.log(err);
    }
    else {
        files.forEach(file => {
            __file = "./secret-folder/"+path.basename(file.name);
            fs.stat(__file, (err, stats) => {
                if (err) {
                    console.error(err)
                    return;
                }
                console.log(path.basename(file.name, path.extname(file.name)) + " - " + path.extname(file.name) + " - " + stats.size/1024 + "kb");
            })
        })
    }
})
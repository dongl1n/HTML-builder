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
                if(err) throw err; // не удалось создать папку
                console.log(`Папка ${__dir} успешно создана`);
            });
        })
    }
});


const fs = require('fs');

let stream = fs.createWriteStream('./02-write-file/text.txt');
console.log("Введите текст (для выхода нажмите ctrl+c или напишите exit): ");
process.stdin.on("data", data => {
    if(data.toString().includes("exit")) {
        process.stdout.write("\nКонец записи");
        process.exit();
    }
    else stream.write(data);
})

process.on('SIGINT', () => {
    process.stdout.write("\nКонец записи");
    process.exit();
});
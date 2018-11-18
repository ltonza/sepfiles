const fs = require('fs');

var path = 'input';
var pathOut = 'output';

console.log(`Lendo diretorio: ${path}`);

var files = fs.readdir(path, function (err, files) {
    console.log(`Arquivos encontrados: ${files.length}`);
    files.forEach(file => {
        var filename = `${path}\\${file}`;
        var output = `${pathOut}\\${file.substring(0, file.length - 4)}`;
        console.log(`Processando: ${filename}`);

        fs.readFileSync(filename).toString().split(/\r?\n/).forEach(function (line) {
            var id = line.substring(2, 5);
            console.log(`${file} ${id} : ${line}`);
        })
    });
});


const fs = require('fs');

const path = 'input';
const pathOut = 'output';

const reg = /^(..)(...)/;

const ids = {
    '000': '02914460011276',
    '024': '02914460002447',
    '025': '02914460002447',
    '026': '02914460002447',
    '028': '02914460002447',
    '037': '02914460003761',
    '038': '02914460003842',
    '039': '02914460003923',
    '040': '02914460004067',
    '092': '02914460019846',
    '192': '02914460019250',
    '193': '02914460019331',
    '194': '02914460019412',
    '198': '02914460019846',
    '225': '02914460022553',
    '280': '02914460002447',
    '282': '02914460002447',
    '295': '02914460003842',
    '580': '02914460002447',
    '636': '02914460019250',
    '637': '02914460019412',
    '639': '02914460019250',
    '640': '02914460019250',
    '641': '02914460019250',
    '642': '02914460019250',
    '644': '02914460019250',
    '645': '02914460019250',
    '646': '02914460019250',
    '647': '02914460019250',
    '659': '02914460019250',
    '891': '02914460019250',
    '902': '02914460019846',
    '920': '02914460022553'
};

console.log(`Limpando diretorio: ${pathOut}`);

fs.readdirSync(pathOut).forEach(file => {
    let filename = `${pathOut}\\${file}`;
    console.log(`\tRemovendo: ${filename}`);
    fs.unlinkSync(filename);
});

console.log(`Lendo diretorio: ${path}`);

fs.readdir(path, function (err, files) {
    console.log(`Arquivos encontrados: ${files.length}`);
    files.forEach(file => {
        let filename = `${path}\\${file}`;
        console.log(`Processando: ${filename}`);
        let parts = {
            AA: '',
            B1: {},
            ZZ: ''
        };
        let header,footer = '';

        fs.readFileSync(filename, 'latin1').toString().split(/\r?\n/).forEach(function (line) {
            let result = reg.exec(line);
            if (result === null)
                return;
            
            switch (result[1]) {
                case "AA": {
                    parts.AA = line;
                    break;
                }
                case "ZZ": {
                    parts.ZZ = line;
                    break;
                }
                case "B1": {
                    let id = ids[result[2]];
                    if (!parts.B1.hasOwnProperty(id))
                        parts.B1[id] = [parts.AA.replace(ids['000'],id)];    
                    parts.B1[id].push(line);
                    break;
                }
                default: {
                    console.error(`${file} ${result[1]} '${result[2]}': ${line}`);
                    break;
                }
            }
        })
        Object.entries(parts.B1).forEach(([key, value]) => {
            let outputFile = `${pathOut}\\${file.substring(0, file.length - 4)}_${key}.txt`;
            console.log(`\tGravando: ${outputFile} com ${value.length} registros`);
            fs.writeFileSync(outputFile, [...value, parts.ZZ].join('\r\n'), 'latin1');
        });
    });
});


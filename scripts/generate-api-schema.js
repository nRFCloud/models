/**
 * This file prepares the JSON schemas for inclusion in the iris-api.json.
 */

const fs = require('fs');
const path = require('path');

const srcDir = process.argv[process.argv.length - 2];
const outDir = process.argv[process.argv.length - 1];

fs.readdir(srcDir, (err, files) => {
    files.filter(f => /\.schema\.json$/.test(f)).forEach(file => {
        fs.readFile(path.join(srcDir, file), 'utf-8', (err, data) => {
            fs.writeFile(path.join(outDir, file), data.replace(/\"\$ref\": \"[^"]+\/([^\.]+)\.schema\.json\"/g, '"$ref": "#/definitions/$1Schema"'), err => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            });
        });
    });
});

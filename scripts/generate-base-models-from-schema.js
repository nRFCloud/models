/**
 * This file builds the interfaces from the JSON schema files.
 */

const js2ts = require('json-schema-to-typescript');
const fs = require('fs');
const path = require('path');

const srcDir = process.argv[process.argv.length - 2];
const targetDir = process.argv[process.argv.length - 1];

fs.readdir(srcDir, (err, files) => {
    files.filter(f => /[^.]+\.json$/.test(f)).forEach(file => {
        fs.readFile(path.join(srcDir, file), 'utf-8', (err, data) => {
            const d = JSON.parse(data);
            const { title } = d;
            return js2ts.compile(d, title, { cwd: srcDir })
                .then(ts => {
                    fs.writeFile(path.join(targetDir, `${title}.d.ts`), ts, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
        });
    });
});

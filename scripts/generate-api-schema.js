/**
 * This file prepares the JSON schemas for inclusion in the iris-api.json.
 */

const fs = require('fs');
const path = require('path');

const srcDir = process.argv[process.argv.length - 2];
const outDir = process.argv[process.argv.length - 1];

const removeExampleFromProperties = (obj) => ({
    ...obj, properties: Object.keys(obj.properties).reduce((props, key) => {
        const c = {...obj.properties[key]};
        delete c.example;
        props[key] = c;
        return props;
    }, {})
});

fs.readdir(srcDir, (err, files) => {
    files.filter(f => /\.schema\.json$/.test(f)).forEach(file => {
        fs.readFile(path.join(srcDir, file), 'utf-8', (err, data) => {
            data = data.replace(/\"\$ref\": \"[^"]+\/([^\.]+)\.schema\.json\"/g, '"$ref": "#/definitions/$1Schema"');
            let schema = JSON.parse(data);
            if (schema.properties) {
                schema = removeExampleFromProperties(schema);
            }
            if (schema.allOf) {
                schema.allOf = schema.allOf.map(s => {
                    if (s.properties) {
                        return removeExampleFromProperties(s);
                    }
                    return s;
                });
            }

            fs.writeFile(path.join(outDir, file), JSON.stringify(schema, null, 2), err => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            });
        });
    });
});

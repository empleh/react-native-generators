/* File System Object */
var fs = require('fs');

const readGenerator = (err, data) => {
    /* If an error exists, show it, otherwise show the file */
    if (err) {
        Function('error', 'throw error')(err);
        return;
    }

    return data;
};

const capitalizeWord = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

const formatName = name => {
    const splitName = name.split(/_|-/);

    return splitName.reduce((a, b) => a + capitalizeWord(b), '');
};

const replaceTemplate = (template, name) => {
    return template.replace(/@@Component_Name@@/g, formatName(name));
};

const writeTemplateToFile = (path, name, fileContent) => {
    if (path.trim().length > 0) {
        fs.mkdirSync(path, { recursive: true });
    }

    fs.writeFile(`${path}${name}.ts`, fileContent, err => {
        if (err) throw err;

        console.log('File Generated');
    });
};

const generateAtom = (path, name) => {
    fs.readFile('generators/react-native-atom-component.ts.template', 'utf-8', (err, data) => {
        const template = readGenerator(err, data);

        const replacedTemplate = replaceTemplate(template, name);

        writeTemplateToFile(path, name, replacedTemplate);
    });
};

const generateRedux = (path, name) => {
    fs.readFile('generators/react-native-redux-component.ts.template', 'utf-8', (err, data) => {
        const template = readGenerator(err, data);

        const replacedTemplate = replaceTemplate(template, name);

        writeTemplateToFile(path, name, replacedTemplate);
    });
};

const typeMap = {
    ['--atom']: generateAtom,
    ['--redux']: generateRedux
};

execute = () => {
    const args = process.argv.slice(process.argv.findIndex(a => a.startsWith('--')));
    const type = args[0];
    const pathIndex = args[1].lastIndexOf('/') + 1;
    const path = args[1].substring(0, pathIndex);
    const name = args[1].substring(pathIndex);

    typeMap[type](path, name);
};
execute();

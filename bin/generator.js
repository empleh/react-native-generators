#!/usr/bin/env node
'use strict';

var fs = require('fs');
var filePath = require('path');
var pathPrefix = filePath.resolve('node_modules/@ms/react-templates/bin');

const readGenerator = (err, data) => {
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

    fs.writeFile(`${path}${name}.tsx`, fileContent, err => {
        if (err) throw err;

        console.log('File Generated');
    });
};

const generateAtom = (path, name) => {
    fs.readFile(pathPrefix + '/generators/react-atom-component.ts.template', 'utf-8', (err, data) => {
        const template = readGenerator(err, data);

        const replacedTemplate = replaceTemplate(template, name);

        writeTemplateToFile(path, name, replacedTemplate);
    });
};

const generateRedux = (path, name) => {
    fs.readFile(pathPrefix + '/generators/react-redux-component.ts.template', 'utf-8', (err, data) => {
        const template = readGenerator(err, data);

        const replacedTemplate = replaceTemplate(template, name);

        writeTemplateToFile(path, name, replacedTemplate);
    });
};

const typeMap = {
    ['--atom']: generateAtom,
    ['--redux']: generateRedux
};

const HELP_MESSAGE = `   Invalid arguments
    
    Start with a type to generate
        ${Object.keys(typeMap).reduce((a, b) => a + '\n        ' + b)}
        
    Next pass a file name with optional path
        
    Example:
        react-gen --atom src/atoms/input
`;

const run = () => {
    const args = process.argv.slice(process.argv.findIndex(a => a.startsWith('--')));

    if (args.length <= 1) {
        console.log(HELP_MESSAGE);
        return;
    }

    const type = args[0];
    const pathIndex = args[1].lastIndexOf('/') + 1;
    const path = args[1].substring(0, pathIndex);
    const name = args[1].substring(pathIndex);

    if (!typeMap[type]) {
        console.log(HELP_MESSAGE);
    }

    typeMap[type](path, name);
};

run();

import { writeFile } from 'fs';
import { argv } from 'yargs';

const targetPath = `./src/environments/environment.${argv.environment}.ts`;
const dataEnv = {
    isProd: (argv.environment === 'prod'),
    envName: argv.environment
};
const envConfigFile = templateEnv(dataEnv);

writeFile(targetPath, envConfigFile, (error) => (error)? console.log(error): '');

function templateEnv(data){
    return `export const environment = {
        production: ${replaceRegex(data.isProd)},
        envName: '${replaceRegex(data.environment)}'};`
}

function replaceRegex (str){
   return str.replace(/[^a-zA-Z ]/g, "");
}
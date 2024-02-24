import { getRepos } from './utils/file_utils.js';

console.log(
    '************************************************\n' +
        ' Repository List \n' +
        '-------------------------------------------------------------\n',
);
getRepos().forEach(element => {
    console.log(' * ' + element.owner + '/' + element.name);
});

console.log('************************************************');

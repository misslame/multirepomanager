import { octokit } from './main.js';
import { addToRepositoryList, removeFromRepositoryList } from './utils/file_utils.js';
import { RequestError } from '@octokit/request-error';

const MAX_ARG_LENGTH = 3;

try {

    var repo_name;
    var repo_owner;

    // TEMP npm run shenanigans
    // TODO: use actual custom commands / arguments
    // ********************************************
    // * 1.  npm run add -- repo_owner repo_name
    // * 2. npm run add -- repo_owner/repo_name
    // * 3.  npm run remove -- repo_owner repo_name
    // * 4. npm run remove -- repo_owner/repo_name
    // ********************************************
    const args = process.argv.slice(2);
    const command = args.at(0);
    if (args.length == MAX_ARG_LENGTH) {
        repo_owner = args.at(1);
        repo_name = args.at(2);
    } else if ( args.length < MAX_ARG_LENGTH ) {
        const repo_url = args.at(1).split('/');
        repo_owner = repo_url.at(0);
        repo_name = repo_url.at(1);
    } else {
        throw new Error ( '[ERROR]: InvalidArgumentsError: Please provide repo owner and repo name \n.Ex. npm run add -- owner/reponame');
    }

    await octokit.request( 'GET /repos/{owner}/{repo}',  {
        owner: repo_owner,
        repo: repo_name,
    });

    // Add repo to list of repos. 
    if ( command === 'add' ) {
        addToRepositoryList(repo_owner, repo_name);
    } else if ( command === 'remove' ) {
        removeFromRepositoryList(repo_owner, repo_name);
    } else {
        throw new Error ( '[ERROR]: Command not given for action to be performed. This is probably something wrong with the tool.' );
    }

} catch (exception) {
    if ( exception instanceof RequestError) {
        console.log('[ERROR]: RequestError: Could not determine if repository exists, please provide a valid repository.');
    } else if ( exception instanceof TypeError) {
        console.log('[ERROR]: InvalidArgumentsError: Please provide repo owner and repo name \n.Ex. npm run add -- owner/reponame \n' + exception);
    } else {
        console.log(exception);
    }
}

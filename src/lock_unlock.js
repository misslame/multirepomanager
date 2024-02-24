import { octokit } from './main.js';
import { getRepos } from './utils/file_utils.js';
import { RequestError } from '@octokit/request-error';

const MAX_ARG_LENGTH = 2;

try {
    var branch_name;

    // TEMP npm run shenanigans
    // TODO: use actual custom commands / arguments
    // ********************************************
    // * 1.  npm run lock -- branch_name
    // * 2. npm run unlock -- branch_name
    // ********************************************
    const args = process.argv.slice(2);
    const command = args.at(0);
    if (args.length == MAX_ARG_LENGTH) {
        branch_name = args.at(1);
    } else {
        throw new Error ( '[ERROR]: InvalidArgumentsError: Please provide branch name \n.Ex. npm run add -- branch_name');
    }
    
    if (command != 'lock' && command != 'unlock') 
        throw new Error ( '[ERROR]: Command not given for action to be performed. This is probably something wrong with the tool.' );

    const will_lock = (command == 'lock');

    // loop through repos and lock them. 
    for ( const element of getRepos()) { 
        console.log( command + 'ing ' + element.owner + '/' + element.name);

        var currentProtection = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection', {
            owner: element.owner,
            repo: element.name,
            branch: branch_name
        });

        var updatedProtection = await octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
            owner: element.owner,
            repo: element.name,
            branch: branch_name,
            enforce_admins: currentProtection.data.enforce_admins.enabled,
            required_pull_request_reviews: currentProtection.data.required_pull_request_reviews,
            restrictions: null,
            required_status_checks: null,
            lock_branch: will_lock
        });
        console.log(command + 'ed ' + element.owner + '/' + element.name);
    }

} catch ( exception ) {
    if ( exception instanceof RequestError) {
        console.log('[ERROR]: Something went wrong while sending the request...\n' + exception);
    } else if ( exception instanceof TypeError) {
        console.log('[ERROR]: InvalidArgumentsError: Please provide branch name \n.Ex. npm run add -- branch_name\n' + exception);
    } else {
        console.log(exception);
    }
}
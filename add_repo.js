import { octokit } from "./main.js"
import { RequestError } from "@octokit/request-error";

const MAX_ARG_LENGTH = 2;

try{

    var repo_name;
    var repo_owner;

    // TEMP npm run shenanigans
    // TODO: use actual custom commands / arguments
    // ********************************************
    // * 1.  npm run add_repo repo_owner repo_name
    // * 2. npm run add_repo repo_owner/repo_name
    // ********************************************
    const args = process.argv.slice(2);
    if (args.length == MAX_ARG_LENGTH) {
        repo_owner = args.at(0);
        repo_name = args.at(1);
    } else {
        const repo_url = args.at(0).split('/');
        repo_owner = repo_url.at(0);
        repo_name = repo_url.at(1);
    }

    await octokit.request('GET /repos/{owner}/{repo}' , {
        owner: repo_owner,
        repo: repo_name,
    });

    // Add repo to list of repos. 

} catch (exception) {
    if ( exception instanceof RequestError) {
        console.log('RequestError: Could not determine if repository exists, please provide a valid repository.');
    } else if ( exception instanceof TypeError) {
        console.log("InvalidArguments provided. Please provide repo owner and repo name. Ex. npm run add_repo -- owner/reponame");
    } else {
        console.log(exception);
    }
}

// try {
//     await octokit.request('GET /repos/{owner}/{repo}', {
//         owner: 'OWNER',
//         repo: 'REPO',
//         headers: {
//             'X-GitHub-Api-Version': '2022-11-28'
//         }
//     })
// }
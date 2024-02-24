import * as fs from 'fs';

const PATH_TO_REPOSITORY_LIST_JSON = 'src/assets/repo_list.json';

const DEFAULT_JSON_FORMAT = {
    repos: [],
};

function initJsonObj() {
    return new Promise(resolve => {
        fs.readFile(PATH_TO_REPOSITORY_LIST_JSON, (err, content) => {
            if (err) {
                resolve(DEFAULT_JSON_FORMAT);
            } else {
                resolve(JSON.parse(content));
            }
        });
    });
}

var json_obj = await initJsonObj();

function repoExists(repo_owner, repo_name) {
    return json_obj.repos.some(element => {
        return element.owner == repo_owner && element.name == repo_name;
    });
}

export function addToRepositoryList(repo_owner, repo_name) {
    if (repoExists(repo_owner, repo_name)) {
        throw new Error('[ERROR]: AlreadyExistsError: Repository already exists on the list.');
    }

    json_obj.repos.push({
        owner: repo_owner,
        name: repo_name,
    });

    fs.writeFile(PATH_TO_REPOSITORY_LIST_JSON, JSON.stringify(json_obj), function (result) {
        if (result) {
            console.log('[ERROR]: ' + result);
        } else {
            console.log('Successfully added to the repository list.');
        }
    });
}

export function getRepos() {
    return json_obj.repos;
}

export function removeFromRepositoryList(repo_owner, repo_name) {
    if (!repoExists(repo_owner, repo_name)) {
        throw new Error("[ERROR]: RepoDoesntExistError: Repository doesn't exist.");
    }

    json_obj.repos = json_obj.repos.filter(function (element) {
        return !(element.owner == repo_owner && element.name == repo_name);
    });

    fs.writeFile(PATH_TO_REPOSITORY_LIST_JSON, JSON.stringify(json_obj), function (result) {
        if (result) {
            console.log('[ERROR]: ' + result);
        } else {
            console.log('Successfully removed from the repository list.');
        }
    });
}

# Multi-Repo Manager
Tool for allowing multiple repo branch management. 

### Current Features: 
    - Lock the same named branch accross multiple repos
    - Unlock the same named branch accross multiple repos

## Commands: 
Below are commands that can be run using `npm run [command] -- [args]`
#### `npm run authenticate`
Confirm that you can authenticate and your configuration is properly set up. 
#### `npm run add -- [repo_owner]/[repo_name]`
Add a repository to the list of managed repositories
#### `npm run add -- [repo_owner] [repo_name]`
Add a repository to the list of managed repositories
#### `npm run remove -- [repo_owner]/[repo_name]` 
Remove a repository from the list of managed repositories
#### `npm run remove -- [repo_owner] [repo_name]` 
Remove a repository from the list of managed repositories
#### `npm run lock -- [branch_name]`
Lock the branches with the above name on all repositories in the list
#### `npm run unlock -- [branch_name]`
Unlock the branches with the above name on all repositories in the list
#### `npm run list`
View list of currently managed repositories
#### `npm run help`
View commands
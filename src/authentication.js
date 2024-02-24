import { octokit } from './main.js';

// Authenticate
try {
    const {
        data: { user_name },
    } = await octokit.rest.users.getAuthenticated();
    console.log('Hello, %s, you have successfully authenticated.', user_name);
} catch (exception) {
    console.log('Failed to Authenticate. Please check your access token.');
}

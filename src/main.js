import dotenv from "dotenv";
import { Octokit } from "octokit";

dotenv.config();

// Create Client 
export const octokit = new Octokit({ 
    auth: process.env.ACCESS_TOKEN
});


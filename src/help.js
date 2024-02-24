// My views for this file is to have a more comprehensive help menu, especially as the tool grows larger. 

const HELP_MESSAGE = "******************************************\n" +
                                        " Help:                                                                  \n" +
                                        "------------------------------------------------------\n" +
                                        "npm run                                                               \n" +
                                        "    authenticate                                                   \n" +
                                        "        Check if your configuration authenticated. \n" +
                                        "    add -- repo_owner repo_name                         \n" +
                                        "         Add repo that has above owner & name      \n" +
                                        "    add -- repo_owner/repo_name                        \n" +
                                        "         Add repo that has above owner & name      \n" +
                                        "    remove  -- repo_owner repo_name                  \n" +
                                        "         remove repo that has above owner & name \n" +
                                        "    remove -- repo_owner/repo_name                   \n" +
                                        "         remove repo that has above owner & name  \n" +
                                        "    lock -- branch_name                                         \n" +
                                        "         lock branch_name on each repo in list         \n" +
                                        "    unlock -- branch_name                                      \n" +
                                        "         unlock branch_name on each repo in list      \n" +
                                        "    init                                                                    \n" +
                                        "         initialize repo list with given list from a file \n" +
                                        "    help                                                                   \n" +
                                        "         show commands                                            \n" + 
                                        " *******************************************\n";

console.log ( HELP_MESSAGE );
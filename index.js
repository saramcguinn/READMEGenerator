const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

//function to prompt user for input
function getUserInput() {
    return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name?"
            },
            {
                type: "input",
                name: "location",
                message: "What city do you live in?"
            },
            {
                type: "input",
                name: "bio",
                message: "Enter a brief bio:"
            },
            {
                type: "input",
                name: "linkedin",
                message: "What is your LinkedIn profile url?"
            },
            {
                type: "input",
                name: "github",
                message: "What is your GitHub profile url?"
            }
        ]);
} 

// function to create README file content
function createREADMEcontent(responses) {
    return `
    
    `
}

// function to initialize program
function init() {
    getUserInput()
    .then(function(responses) {
        const READMEcontent = createREADMEcontent(responses);
        writeFileAsync("README.md", READMEcontent);
        console.log("New README file successfully generated.")
    })
    .catch(function(err) {
        if (err) {
            return console.log(err);
        }
    })
}

// function call to initialize program
init();

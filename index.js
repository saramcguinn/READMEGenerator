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
                message: "Your name:"
            },
            {
                type: "input",
                name: "githubUsername",
                message: "Your GitHub username:"
            },
            {
                type: "input",
                name: "githubURL",
                message: "Your GitHub profile url:"
            },
            {
                type: "input",
                name: "email",
                message: "Your email address:"
            },
            {
                type: "input",
                name: "title",
                message: "Project title:"
            },
            {
                type: "input",
                name: "description",
                message: "Project description:"
            },
            {
                type: "input",
                name: "installation",
                message: "Project installation information:"
            },
            {
                type: "input",
                name: "usage",
                message: "Project usage information:"
            },
            {
                type: "input",
                name: "license",
                message: "Project license information:"
            },
            {
                type: "input",
                name: "contributing",
                message: "Information about contributing to this project:"
            },
            {
                type: "input",
                name: "tests",
                message: "Information about testing for this project:"
            }
        ]);
} 

// function to create README file content
function createREADMEcontent(responses) {
    return
`# ${responses.title}

## Description: 
${responses.description}

## Table of Contents
    * Installation
    * Usage
    * License
    * Contributing
    * Tests
    * Questions

## Installation
${responses.installation}

## Usage
${responses.usage}

## License
${responses.license}

## Contributing
${responses.contributing}

## Tests
${responses.tests}

## Questions
Please contact me with questions about this project.
Name: ${responses.name}
GitHub: ${responses.githubUsername}
        ${responses.githubURL}
Email: ${responses.email}
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

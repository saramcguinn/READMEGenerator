const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

//objects for badges and license information
const licenseBadges = 
{
MIT : "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
GNU_GPLv3: "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
Apache: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
BSD_3clause: "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
BSD_2clause: "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)",
ISC: "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
Artistic_2: "[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic%202.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)",
Unlicense: "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
}

const licenseDetails = 
{
MIT : "The MIT license is open source. For details, see https://opensource.org/licenses/MIT.",
GNU_GPLv3: "The GNU General Public License is a free, copyleft license. For details, see https://www.gnu.org/licenses/gpl-3.0.",
Apache: "The Apache 2.0 license is open source. For details, see https://opensource.org/licenses/Apache-2.0.",
BSD_3clause: "The BSD 3-Clause license is open source. For details, see https://opensource.org/licenses/BSD-3-Clause.",
BSD_2clause: "The BSD 2-Clause license is open source. For details, see https://opensource.org/licenses/BSD-2-Clause.",
ISC: "The ISC license is open source. For details, see https://opensource.org/licenses/ISC.",
Artistic_2: "The Artistic License 2.0, or Perl, is open source. For details, see https://opensource.org/licenses/Artistic-2.0.",
Unlicense: "This code is public domain. For details, see http://unlicense.org/.",
}

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
            type: "list",
            name: "license",
            message: "Project license:",
            choices: ["MIT", "GNU_GPLv3", "Apache", "BSD_3clause", "BSD_2clause", "ISC", "Artistic_2", "Unlicense"]
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
    return `# ${responses.title}
${licenseBadges[responses.license]}

## Description: 
${responses.description}

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)

## Installation
${responses.installation}

## Usage
${responses.usage}

## License
${licenseDetails[responses.license]}

## Contributing
${responses.contributing}

## Tests
${responses.tests}

## Questions
Please contact me with questions about this project.

* Name: **${responses.name}**
* GitHub: ${responses.githubUsername} | ${responses.githubURL}
* Email: ${responses.email}
`
}

// function to initialize program
function init() {
    getUserInput()
        .then(function (responses) {
            const READMEcontent = createREADMEcontent(responses);
            writeFileAsync("README.md", READMEcontent);
            console.log("New README.md file successfully generated.")
        })
        .catch(function (err) {
            if (err) {
                return console.log(err);
            }
        })
}

// function call to initialize program
init();

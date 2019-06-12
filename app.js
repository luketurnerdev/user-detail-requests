const chalk = require ("chalk");
const inq = require("inquirer");
let details = {};


function mainMenu() {
        console.log('Hello, what would you like to do?');
        inq.prompt (
            [
                {
                    type: "checkbox",
                    name: "menuOptions",
                    choices: [
                        {name: "Add new user"},
                        {name: "Remove a user"},
                        {name: "View a specific usier"},
                        {name: "View all users"},
                        {name: "Quit"}
                    ]

                }
            ]
        )

        .then(answers => {
            console.log(answers.menuOptions);
            switch (answers.menuOptions[0]) {
                case ("Add new user"):
                    console.log('new user selected');
                    newUser();
                    break;

                case ("Remove a user"):
                    removeUser();
                    break;
                case ("View a specific user"):
                    viewSpecificUser();
                    break;

                case ("View all users"):
                    viewAllUsers();
                    break;
                    

                case ("Quit"):
                    console.log('Goodbye!');
                    process.exit();

                default:
                    console.log('default');
                    break;
            }
        });

}

function viewAllUsers() {

    //Using Object.entries(objectName) to iterate through key value pairs
    //We define these keys and values using a let statement

      for (let [name, number] of Object.entries(details)) {
          console.log(`Name: ${name}, Number: ${number}`);
      }

      mainMenu();
}

function removeUser() {
    //Prompt user for the username to be deleted
    //Check if it exists
    //if so, delete it and run viewAllusers()
    //if not, run this function again

    inq.prompt(
        [
            {
                type: 'input',
                name: "unwantedUser",
                message: "Please enter the user to be deleted"
            }
        ]
    )

    .then (answers => {
        //If details object contains the entered name, delete it
        let deleted = false;
        for (let [key, value] of Object.entries(details)) {
            if (answers.unwantedUser === key) {
                //perform operation and break here
                delete details[key];
                console.log(`User ${key} has been successfully deleted.`);
                deleted = true;
            mainMenu();
            }
        
        }

    if (deleted === false) {
        console.log('User not found.')
        mainMenu();
    }
    })
}

function viewSpecificUser() {

    inq.prompt(
        [
            {
                type: 'input',
                name: "wantedUser",
                message: "Please enter the user to search for"
            }
        ]
    )

    .then (answers => {
        //If details object contains the entered name, delete it
        let found = false;
        for (let [key, value] of Object.entries(details)) {
            if (answers.wantedUser === key) {
                //perform operation and exit to main menu
                console.log(`User: ${details[key]}. Number: ${details[value]}`);
                console.log(`User ${key} has been successfully deleted.`);
                deleted = true;
            mainMenu();
            }
        
        }

    if (found === false) {
        console.log('User not found.')
        mainMenu();
    }
    })
}


function newUser() {
    inq.prompt(
        [
            {
                name: "name",
                type: "input",
                message: "What is your name?"
            },
            {
                name: "phoneNumber",
                type: "number",
                message: "What is your phone number?"
            }
            
        ]
        
    )
    .then(responses => {
        let {name, phoneNumber} = responses;

        if (isNaN(phoneNumber)) {
            throw "That is not a number, please try again."   
        }
        details[name] = phoneNumber;
        // console.log(`Your name is ${chalk.blue(name)}, and your number is ${chalk.yellow(phoneNumber)}.`);
        mainMenu();
    })

    .catch ( err => {
        console.log(err);
        newUser();
    });

   }
mainMenu();

//Add a menu where the user can add a contact, remove a contact, or view all contacts.
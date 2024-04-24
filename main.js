import inquirer from "inquirer";
import chalk from 'chalk';
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
    fuelIncrease() {
        this.fuel = Math.min(this.fuel + 25, 100); // Ensure the energy doesn't exceed 100
    }
    getEnergy() {
        return this.fuel;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
    fuelIncrease() {
        this.fuel = Math.min(this.fuel + 25, 100); // Ensure the energy doesn't exceed 100
    }
}
async function main() {
    const playerData = await inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter your name:"
        }]);
    const playerName = playerData.name;
    const player = new Player(playerName);
    let opponents = await inquirer.prompt([{
            type: "list",
            name: "select",
            message: "Pick an opponent to fight",
            choices: ["Toji", "Sukuna", "Geto"]
        }]);
    const newOpponent = new Opponent(opponents.select);
    let opponentColor = 'white'; // Set a default color
    switch (opponents.select) {
        case 'Toji':
            opponentColor = 'magenta';
            break;
        case 'Sukuna':
            opponentColor = 'red';
            break;
        case 'Geto':
            opponentColor = 'blueBright';
            break;
        default:
            opponentColor = 'white';
    }
    console.log(`${chalk.bold.white(playerName)} VS ${chalk.bold[opponentColor](newOpponent.name)}`);
    do {
        let ask = await inquirer.prompt([{
                type: "list",
                name: "option",
                message: "Select your action:",
                choices: ["Attack", "Heal", "Run"]
            }]);
        switch (ask.option) {
            case "Attack":
                console.log("x !!! Slayed an enemy yahhh!!! X");
                newOpponent.fuelDecrease(); // Decrease opponent's energy
                player.fuelDecrease(); // Decrease player's energy
                break;
            case "Heal":
                console.log("Energy restored");
                player.fuelIncrease(); // Increase player's energy
                newOpponent.fuelDecrease(); // Decrease opponent's energy
                break;
            case "Run":
                console.log("RUN X !!! X RUN !!! X RUN!!!");
                console.log(chalk.redBright.bold("X YOU ARE DEAD X"));
                break;
            default:
                console.log("Invalid action!");
        }
        console.log(`${playerName}'s energy: ${player.getEnergy()}`);
        console.log(`${newOpponent.name}'s energy: ${newOpponent.fuel}`);
    } while (player.getEnergy() > 0 && newOpponent.fuel > 0);
    if (player.getEnergy() <= 0) {
        console.log("X DEAD LOSE X");
    }
    else {
        console.log("!!WIN WIN U DEFEATED THE ENEMY!!");
    }
}
// Call the async function to start the program 
main();

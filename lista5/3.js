const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
const number = Math.floor(Math.random() * 101);
rl.setPrompt("Podaj liczbę (0-100): ");
rl.prompt();
rl.on("line", function (line) {
  if (parseInt(line.trim()) < number) {
    console.log("Za mało!");
  } else if (parseInt(line.trim()) > number) {
    console.log("Za dużo!");
  } else {
    console.log("Brawo, zgadłeś!");
    process.exit(0);
  }
  rl.prompt();
}).on("close", function () {
  process.exit(0);
});

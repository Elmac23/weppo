const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt("Jak się nazywasz? ");
rl.prompt();
rl.on("line", function (line) {
  console.log("Witaj " + line.trim() + "!");
  rl.close();
  rl.prompt();
}).on("close", function () {
  process.exit(0);
});

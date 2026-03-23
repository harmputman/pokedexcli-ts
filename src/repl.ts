import { State } from "./state.js";

export function startREPL(state: State): void {
    state.readline.prompt();

    state.readline.on("line", async (input: string) => {
        const words = cleanInput(input);

        if (words.length === 0) {
            state.readline.prompt();
            return;
        }

        const commandName = words[0];
        const args = words.slice(1);

        const cmd = state.commands[commandName];

        if (!cmd) {
            console.log(
                `Unknown command: "${commandName}". Type "help" for a list of commands.`,
            );
            state.readline.prompt();
            return;
        }

        try {
            await cmd.callback(state, ...args);
        } catch (e) {
            console.log(e);
        }

        state.readline.prompt();
    });
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

import { createInterface, type Interface } from "readline";
import { getCommands } from "./registry.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>
};

export function initState(): State {
    return {
        readline: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: getCommands(),
    };
}

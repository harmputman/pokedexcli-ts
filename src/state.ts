import { createInterface, type Interface } from "readline";
import { getCommands } from "./registry.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>,
    api: PokeAPI,
    nextLocationsURL: string;
    prevLocationsURL: string;
    pokedex: Record<string, Pokemon>;
};

export function initState(): State {
    return {
        readline: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: getCommands(),
        api: new PokeAPI(new Cache(500)),
        nextLocationsURL: "",
        prevLocationsURL: "",
        pokedex: {},
    };
}

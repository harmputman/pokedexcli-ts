import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("you must provide a pokemon name");
    }

    const name = args[0];
    const pokemon = await state.api.fetchPokemon(name);

    console.log(`Throwing a Pokeball at ${name}...`);

    const catchThreshold = Math.max(0, 1 - pokemon.base_experience / 300);
    const roll = Math.random();

    if (roll < catchThreshold) {
        console.log(`${name} was caught!`);
        console.log("You may now inspect it with the inspect command.");
        state.pokedex[name] = pokemon;
    } else {
        console.log(`${name} escaped!`);
    }
}

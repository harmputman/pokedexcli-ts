import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("you must provide a pokemon name");
    }

    const name = args[0];
    const pokemon = state.pokedex[name];

    if (!pokemon) {
        console.log("you have not caught that pokemon");
        return;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    for (const s of pokemon.stats) {
        console.log(`  -${s.stat.name}: ${s.base_stat}`);
    }
    console.log("Types:");
    for (const t of pokemon.types) {
        console.log(`  - ${t.type.name}`);
    }
}

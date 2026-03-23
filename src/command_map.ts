import { State } from "./state.js";

export async function commandMapForward(state: State): Promise<void> {
    const locations = await state.api.fetchLocations(
        state.nextLocationsURL ?? undefined,
    );

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    for (const loc of locations.results) {
        console.log(loc.name);
    }
}

export async function commandMapBack(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        throw new Error("you're on the first page");
    }

    const locations = await state.api.fetchLocations(
        state.prevLocationsURL,
    );

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    for (const loc of locations.results) {
        console.log(loc.name);
    }
}

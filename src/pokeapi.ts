import { z } from "zod";
import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  #cache: Cache;

  constructor(cache: Cache) {
    this.#cache = cache;
  }

  async get(url: string) {
    const cached = this.#cache.get(url);
    if (cached) {
        return cached;
    }
    try {
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`${response} ${response.statusText}`);
        }

        const data = response.json();

        this.#cache.add(url, data);

        return data;
    } catch (e) {
      throw new Error(`Error fetching from url ${url}: ${(e as Error).message}`);
    }
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let url = `${PokeAPI.baseURL}/location-area`;

    if (pageURL) {
        url = pageURL;
    }

    const locations: ShallowLocations = await this.get(url);

    return locations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const location: Location = await this.get(`${PokeAPI.baseURL}/location-area/${locationName}`);

    return location;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const pokemon: Pokemon = await this.get(`${PokeAPI.baseURL}/pokemon/${pokemonName}`);

    return pokemon;
  }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
        rate: number;
        version: {
            name: string;
            url: string;
        };
        }[];
    }[];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string;
    };
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
        encounter_details: {
            chance: number;
            condition_values: any[];
            max_level: number;
            method: {
                name: string;
                url: string;
            };
            min_level: number;
        }[];
        max_chance: number;
        version: {
            name: string;
            url: string;
        };
        }[];
    }[];
};

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
};

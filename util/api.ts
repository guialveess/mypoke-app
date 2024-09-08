import axios from "axios";

export async function getPokemons(endpoint: string) {
  const baseUrl = "https://pokeapi.co/api/v2/";
  const finalUrl = baseUrl + endpoint;

  return new Promise((resolve, reject) => {
    axios
      .get(finalUrl)
      .then(async (response) => {
        const pokemons = response.data.results;
        console.log("data", response.data);
        let pokemonArray = [];
        for await (const poke of pokemons) {
          const pokeDetails = await getDetail(poke.url);
          pokemonArray.push(pokeDetails);
        }
        resolve(pokemonArray);
        // return pokemonArray
      })
      .catch((error) => {
        reject({});
        // return []
      });
  });
}

export async function getDetail(url: string) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject({});
      });
  });
}

export interface Pokemon {
  abilities: Array<any>;
  base_experience: number;
  forms: Array<any>;
  game_indices: Array<any>;
  height: number;
  held_items: Array<any>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<any>;
  name: string;
  order: number;
  past_types: Array<any>;
  species: any;
  sprites: any;
  stats: Array<any>;
  types: Array<any>;
  weight: number;
}

interface PokemonBasic {
  name: string;
  url: string;
}

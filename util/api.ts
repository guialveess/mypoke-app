import axios from "axios";

// Definindo a estrutura básica do Pokémon
export interface PokemonBasic {
  name: string;
  url: string;
}

// Definindo a estrutura completa do Pokémon
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
  sprites: {
    front_default: string;
    [key: string]: any; // Para permitir outras propriedades do objeto sprites
  };
  stats: Array<any>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  weight: number;
}

// Função para obter uma lista básica de Pokémon
export async function getPokemons(endpoint: string): Promise<PokemonBasic[]> {
  const baseUrl = "https://pokeapi.co/api/v2/";
  const finalUrl = baseUrl + endpoint;

  try {
    const response = await axios.get(finalUrl);
    return response.data.results; // Retorna uma lista de Pokémon básicos
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return []; // Retorna uma lista vazia em caso de erro
  }
}

// Função para obter detalhes de um Pokémon específico
export async function getDetail(url: string): Promise<Pokemon> {
  try {
    const response = await axios.get(url);
    return response.data; // Retorna os detalhes do Pokémon
  } catch (error) {
    console.error("Error fetching pokemon details:", error);
    return {} as Pokemon; // Retorna um objeto vazio em caso de erro
  }
}

import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Paginator from "../components/paginator";
import TypePills from "../components/type-pills";
import { getPokemons, getDetail, Pokemon, PokemonBasic } from "../util/api";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import pokeballAnimation from "../public/lottie/pokeball.json";

export default function PokemonSearch() {
  const router = useRouter();
  const [listPokemons, setListPokemons] = useState<Pokemon[]>([]);
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [limit, setLimit] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    try {
      setLoading(true);
      const basicPokemons = await getPokemons("pokemon?limit=1000");

      if (basicPokemons && Array.isArray(basicPokemons)) {
        console.log("Fetched Pokémon list:", basicPokemons);
        const pokemonDetails = await fetchPokemonsDetails(basicPokemons);
        setListPokemons(pokemonDetails);
        slicePokemon(pokemonDetails);
      } else {
        console.error("Unexpected result structure:", basicPokemons);
        setError("Invalid Pokémon data structure received.");
      }
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
      setError("Failed to fetch Pokémon data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonsDetails = async (pokemonList: PokemonBasic[]) => {
    try {
      const temp: Pokemon[] = [];
      for (const poke of pokemonList) {
        const result = await getDetail(poke.url);

        if (result && result.id && result.name && result.sprites) {
          temp.push(result);
        } else {
          console.error("Unexpected Pokémon detail structure:", result);
        }
      }
      console.log("Fetched Pokémon details:", temp);
      return temp;
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      return [];
    }
  };

  const slicePokemon = (pokemonList: Pokemon[]) => {
    const bottomValue = currentPage * limit - limit;
    const topValue =
      limit * currentPage >= pokemonList.length
        ? pokemonList.length
        : limit * currentPage;

    const filteredPokemons = pokemonList.filter((poke: Pokemon) =>
      poke.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayed = filteredPokemons.slice(bottomValue, topValue);
    console.log("Displayed Pokémon:", displayed);
    setDisplayedPokemons(displayed);
  };

  useEffect(() => {
    if (listPokemons.length > 0) {
      slicePokemon(listPokemons);
    }
  }, [currentPage, searchTerm, listPokemons]);

  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  const pokemonClicked = (pokemon: Pokemon) => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-[90%] mx-auto mt-4">
        {/* Container for search and animation */}
        <div className="flex flex-col items-center w-full max-w-md mb-8">
          {/* Search Bar */}
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Nome do Pokémon..."
              className="p-2 border rounded-lg flex-grow text-center"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading && (
              <Lottie
                animationData={pokeballAnimation}
                loop={true}
                style={{ width: "50px", height: "50px" }}
              />
            )}
          </div>
          {/* Title */}
          <div className="text-4xl font-black mb-4">Buscar Pokémon</div>
        </div>

        {/* ERROR MESSAGE */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* POKEMON CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {!loading && displayedPokemons.length > 0
            ? displayedPokemons.map((item: Pokemon, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white/50 rounded-lg p-4 shadow-md cursor-pointer"
                  onClick={() => pokemonClicked(item)}
                >
                  {item.sprites.front_default && (
                    <Image
                      unoptimized
                      src={item.sprites.front_default}
                      loader={() => item.sprites.front_default}
                      alt={item.name + " front"}
                      width={100}
                      height={100}
                    />
                  )}
                  <div className="font-black text-xl my-2">#{item.id}</div>
                  <div className="font-black text-xl capitalize">
                    {item.name}
                  </div>

                  <div className="flex flex-row item-center justify-center gap-2 mt-2">
                    {item.types.map((type, index) => (
                      <TypePills
                        key={index}
                        type={type.type.name}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              ))
            : !loading && (
                <div className="text-center text-lg font-semibold">
                  Nenhum Pokémon encontrado.
                </div>
              )}
        </div>

        {/* PAGINATOR */}
        {listPokemons.length > 0 && (
          <div className="mt-8">
            <Paginator
              totalItems={listPokemons.length}
              limit={limit}
              color="blue"
              currentPage={currentPage}
              pageChanged={(page: number) => setCurrentPage(page)}
              limitChanged={(limit: number) => setLimit(limit)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

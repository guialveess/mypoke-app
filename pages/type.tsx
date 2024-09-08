import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Paginator from "../components/paginator";
import TypePills from "../components/type-pills";
import { getDetail, Pokemon } from "../util/api";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Importa o Lottie dinamicamente
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

  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    try {
      const result = await getDetail(
        "https://pokeapi.co/api/v2/pokemon?limit=1000"
      );

      if (result && Array.isArray(result.results)) {
        console.log("Fetched Pokémon list:", result);
        const pokemonDetails = await fetchPokemonsDetails(result.results);
        setListPokemons(pokemonDetails);
        slicePokemon(pokemonDetails);
        setLoading(false); // Define o carregamento como falso quando os dados são carregados
      } else {
        console.error("Unexpected result structure:", result);
        setLoading(false); // Define o carregamento como falso em caso de erro
      }
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
      setLoading(false); // Define o carregamento como falso em caso de erro
    }
  };

  const fetchPokemonsDetails = async (pokemonList: { url: string }[]) => {
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
    slicePokemon(listPokemons);
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
                style={{ width: "50px", height: "50px" }} // Ajuste o tamanho da animação aqui
              />
            )}
          </div>
          {/* Title */}
          <div className="text-4xl font-black mb-4">Buscar Pokémon</div>
        </div>

        {/* POKEMON CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {!loading && displayedPokemons.length > 0 ? (
            displayedPokemons.map((item: Pokemon, index) => (
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
                <div className="font-black text-xl capitalize">{item.name}</div>

                <div className="flex flex-row item-center justify-center gap-2 mt-2">
                  {item.types.map((type, index) => (
                    <TypePills
                      key={index}
                      type={type.type.name}
                      index={index}
                    ></TypePills>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-lg font-semibold">
              No Pokémon found
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

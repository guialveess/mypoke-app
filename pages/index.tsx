import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "../components/card";
// import styles from '../styles/Home.module.css'
import Layout from "../components/layout";
import Modal from "../components/modal";
import Paginator from "../components/paginator";
import { getDetail, getPokemons, Pokemon } from "../util/api";

import Pokemon1 from "/public/image/pokemon-1.png";
import Pokemon2 from "/public/image/pokemon-2.png";
import Pokemon3 from "/public/image/pokemon-3.png";

export default function Home() {
  const [pokemons, setPokemons] = useState<any>([]);
  const [selectedPokemon, setSelectedPokemons] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(9);

  const [totalPokemon, setTotalPokemon] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getPokemons();
  }, [limit, currentPage]);

  const getPokemons = () => {
    setIsLoading(true);
    getDetail(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
        currentPage * limit - limit
      }`
    ).then((resp: any) => {
      setTotalPokemon(resp.count);
      getDisplayedPokemons(resp.results);
    });
  };

  // fetch each detail of pokemon
  const getDisplayedPokemons = async (pokemons: any[]) => {
    let temp: any[] = [];
    for await (let poke of pokemons) {
      const result = await getDetail(poke.url);
      temp.push(result);
    }
    setPokemons(temp);
    setIsLoading(false);
  };

  return (
    <Layout>
      {/* HERO */}
      <div className="hero min-h-screen bg-white">
        <div className="hero-content flex-col lg:flex-row-reverse lg:justify-around w-[90%] mx-auto">
          <div className="w-60 h-60 relative">
            <Image
              unoptimized
              src={Pokemon1}
              alt="Pokemon 1"
              width={200}
              height={300}
              className="absolute -bottom-8 -right-10 z-30"
            />
            <Image
              unoptimized
              src={Pokemon2}
              alt="Pokemon 2"
              width={200}
              height={300}
              className="absolute z-10 right-4"
            />
            <Image
              unoptimized
              src={Pokemon3}
              alt="Pokemon 3"
              width={200}
              height={300}
              className="absolute -top-20 -left-10"
            />
          </div>
          <div className="max-w-lg">
            <h1 className="text-4xl font-black text-center lg:text-left mt-9 lg:mt-0">
              Todos os dados Pokémon que você precisa em um só lugar!
            </h1>
            <p className="py-4 text-center lg:text-left">
              Milhares de dados compilados em um só lugar
            </p>
            <a
              className="btn btn-primary mx-auto lg:mx-0 w-full lg:w-auto text-white py-2"
              href="#pokedex"
            >
              Checar PokèDex
            </a>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div
        className="w-[95%] flex flex-col items-stretch justify-start gap-4 bg-yellow-500 p-8 relative overflow-hidden mx-auto rounded-lg" // Adicionado rounded-lg para bordas arredondadas
        id="pokedex"
      >
        {/* DECORATION CIRCLE */}
        <div
          className={`z-0 w-80 h-80 absolute -top-32 -left-32 rounded-full border border-[60px] border-white/40 flex flex-col items-center justify-center`}
        ></div>
        <div
          className={`z-0 w-80 h-80 absolute -bottom-32 -right-32 rounded-full border border-[60px] border-white/40 flex flex-col items-center justify-center`}
        ></div>

        <div className="text-center font-black text-xl z-10">PokeDex</div>
        <div className="max-w-md mx-auto text-center z-10">
          Todas as Gerações
        </div>
        <div className="max-w-md mx-auto text-center -mt-4 z-10">
          Total de {totalPokemon} Pokémon
        </div>

        <div className="flex flex-row items-stretch justify-center flex-wrap max-w-2xl mx-auto mt-8">
          {pokemons.length > 0 &&
            pokemons.map((items: Pokemon, index: number) => (
              <Card
                key={index}
                modalId="pokemon-modal"
                id={index}
                data={items}
                onClick={(poke: any) => setSelectedPokemons(poke)}
              />
            ))}
        </div>

        {totalPokemon > 0 && (
          <Paginator
            disabled={isLoading}
            currentPage={currentPage}
            limit={limit}
            pageChanged={(page: number) => setCurrentPage(page)}
            limitChanged={(limit: number) => {
              setCurrentPage(1);
              setLimit(limit);
            }}
            totalItems={totalPokemon}
            color="white"
          />
        )}

        {selectedPokemon && <Modal data={selectedPokemon}></Modal>}
      </div>
    </Layout>
  );
}

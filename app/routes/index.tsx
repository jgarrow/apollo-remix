import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import graphqlClient from "~/graphql/client";
import gql from "graphql-tag";
import type { ApolloQueryResult } from "@apollo/client";

export const loader: LoaderFunction = async () => {
  const res = await graphqlClient.query({
    query: gql`
      query getPokemonList {
        pokemonList(limit: 10, offset: 30) {
          name
          weight
        }
      }
    `
  });

  return res;
}

export default function Index() {
  const queryResults = useLoaderData<ApolloQueryResult<{pokemonList: {name: string, weight: number}[]}>>();
  const data = queryResults.data?.pokemonList;
  console.log(data);
  return (
    <div>
      <h1>Pokemon</h1>
      {data.map(pokemon => <div key={pokemon.name}>{pokemon.name} {pokemon.weight / 10}kg</div>)}
    </div>
  );
}

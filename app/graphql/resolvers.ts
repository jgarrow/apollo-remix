import { IResolvers } from "@graphql-tools/utils";

export const resolvers: IResolvers = {
  Query: {
    pokemon: (_, args, context) => {
      console.log('context: ', context)
        return context.dataSources.pokemonAPI.getPokemon({id: args.id})
    },
    pokemonList: (_, {limit, offset = 0}, { dataSources }) => {
      return dataSources.pokemonAPI.getPokemonList({limit, offset})
    }
  },
  Pokemon: {
    variants: (parent, __, { dataSources }) => {
        return dataSources.pokemonAPI.getPokemonVariants(parent.species.url)
    }
  }
}
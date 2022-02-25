import { RESTDataSource } from "apollo-datasource-rest";

export class PokemonAPI extends RESTDataSource {
  constructor() {
      super();
      this.baseURL = 'https://pokeapi.co/api/v2/';
      // TODO: figure out caching w/ remix
      // https://github.com/apollographql/apollo-server/issues/3429#issuecomment-824686929
      this.initialize({}); 
  }

  async getPokemon({id = 1, url}) {
      const arg = url ? url : `pokemon/${id}`
      const res = await this.get(arg)
      return {
          ...res,
          name: res.name.toUpperCase()
      }
  }
  
  async getPokemonList({limit, offset}) {
    const res = await this.get(`pokemon?limit=${limit}&offset=${offset}`);
    return await Promise.all(res.results.map(pokemon => this.getPokemon({url: pokemon.url})))
  }

  async getPokemonVariants(url) {
      const res = await this.get(url)
      return res.varieties.map(({ pokemon }) => {
          console.log(pokemon.url)
          return this.getPokemon({url: pokemon.url})
      })
  }

}
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';

import schema from './schema';
import { PokemonAPI } from './datasources';

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: new SchemaLink({ 
    schema, 
    context: {
      dataSources: {
        pokemonAPI: new PokemonAPI()
      }
    } 
  })
});

export default graphqlClient;

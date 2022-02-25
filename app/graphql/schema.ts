import gql from 'graphql-tag';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = gql`
  type Pokemon {
      name: String!
      "List of a Pokemon's various variants"
      variants: [Pokemon!]
      weight: Int
  }

  type Query {
      pokemon(id: Int!): Pokemon
      pokemonList(limit: Int!, offset: Int): [Pokemon]!
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
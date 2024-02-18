// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql

  type Info {
    id: String
    key: String
  }

  type Query {
    info: [Info]
  }
`;

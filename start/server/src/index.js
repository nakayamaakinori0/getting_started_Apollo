const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

const server = new ApolloServer({ typeDefs });

server.listen({ port: 4999 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

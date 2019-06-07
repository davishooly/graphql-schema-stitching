require('babel-register');
require('babel-core/register');
require('babel-polyfill');
require('dotenv-safe').config({
  allowEmptyValues: true,
});

const path = require("path");
const { ApolloServer } = require("apollo-server");
const fetch = require("node-fetch");
const {
  introspectSchema,
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  mergeSchemas
} = require("graphql-tools");
const { importSchema } = require("graphql-import");
const { createHttpLink } = require("apollo-link-http");
const { ApolloLink } = require('apollo-link');

//local type definitions
const typeDefs = importSchema(path.join(__dirname, "/graphql/schema/schema.graphql"));

//fetch graphql results
const http = createHttpLink({uri:'https://api.github.com/graphql', fetch});
//set headers to the request
const remoteLink =  new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  return forward(operation);
});

const link = remoteLink.concat(http);

const generateRemoteSchema = async () =>{
  const schema = await  introspectSchema(link);
  return  makeRemoteExecutableSchema({
        schema,
        link
      }
  );
};

const generateAndMergeSchemas = async ()=>{
    const remoteSchema  = await generateRemoteSchema();
    const localSchema = makeExecutableSchema({
      typeDefs
    });
  return mergeSchemas({
    schemas: [ remoteSchema, localSchema],
    resolvers:{
      Query:{

      }
    }
  })
};

generateAndMergeSchemas().then(schema=>{
  const server = new ApolloServer({
    schema
  });
  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});


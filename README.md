### :rocket: graphql-schema-stitching :woman_cartwheeling:

#### Combining multiple GraphQL APIs into one

This project accompanies the [schema stitching](https://www.apollographql.com/docs/graphql-tools/schema-stitching/) implementation using NodeJS and [ApolloServer](https://www.apollographql.com/docs/apollo-server/).

- One of the main benefits of GraphQL is that we can query all of our data as part of one schema, and get everything we need in one request. But as the schema grows, it might become cumbersome to manage it all as one codebase, and it starts to make sense to split it into different modules. We may also want to decompose your schema into separate microservices, which can be developed and deployed independently.

- In both cases, we use mergeSchemas to combine multiple GraphQL schemas together and produce a merged schema that knows how to delegate parts of the query to the relevant subschemas. These subschemas can be either local to the server, or running on a remote server. They can even be services offered by 3rd parties, allowing us to connect to external data and create mashups.

### Next step.
### Apollo Federation.

- Apollo Federation is an architecture for composing multiple GraphQL services into a single graph that addresses this need. Unlike other approaches such as schema stitching, it is based on a declarative composition programming model that allows proper separation of concerns. This design allows teams to implement an enterprise-scale shared data graph as a set of loosely coupled, separately maintained GraphQL services.

Learn more about [Apollo-federation](https://github.com/davishooly/apollo-federation)

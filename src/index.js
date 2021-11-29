const { ApolloServer } = require('apollo-server');

const authentication = require('./utils/authentication');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const AuthAPI = require('./dataSources/auth');
const ProductAPI = require('./dataSources/product');



const server = new ApolloServer({
    context:
        authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        AuthAPI: new AuthAPI(),
        ProductAPI: new ProductAPI(),
    }),
    introspection: true,
    playground: true
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})

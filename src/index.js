const { ApolloServer } = require('apollo-server');

const authentication = require('./utils/authentication');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const AuthAPI = require('./dataSources/auth');
const ProductAPI = require('./dataSources/product');
const SellingAPI = require('./dataSources/selling');
const ReviewAPI = require('./dataSources/review');



const server = new ApolloServer({
    context:
        authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        AuthAPI: new AuthAPI(),
        ProductAPI: new ProductAPI(),
        SellingAPI: new SellingAPI(),
        ReviewAPI: new ReviewAPI()
    }),
    introspection: true,
    playground: true
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})

const userResolver = {
    Query: {
        userDetailById: async (_, { userId }, { dataSources, userIdToken }) => {
            if (userId == userIdToken) {
                return await dataSources.AuthAPI.getUserId(userId)
            } else {
                return null
            }
        }
    },
    Mutation: {
        signUpUser: async (_, { userInput }, { dataSources }) => {

            const user = {
                username: userInput.username,
                password: userInput.password,
                name: userInput.name,
                lastName: userInput.lastName,
                document: userInput.document,
                email: userInput.email,
                phoneNumber: userInput.phoneNumber
            }
            return await dataSources.AuthAPI.createUser(user); //Agregar await con otro proceso en otra api
        },

        updateUser: async (_, { userId, userInput }, { dataSources, userIdToken }) => {
            if (userId == userIdToken) {
                const user = {
                    username: userInput.username,
                    password: userInput.password,
                    name: userInput.name,
                    lastName: userInput.lastName,
                    document: userInput.document,
                    email: userInput.email,
                    phoneNumber: userInput.phoneNumber,
                    is_superuser: userInput.is_superuser
                }
                return await dataSources.AuthAPI.updateUser(userId, user);
            } else {
                return null
            }
        },

        logIn: (_, { credentials }, { dataSources }) =>
            dataSources.AuthAPI.authRequest(credentials),

        refreshToken: (_, { refresh }, { dataSources }) =>
            dataSources.AuthAPI.refreshToken(refresh),
    }
}

module.exports = userResolver;
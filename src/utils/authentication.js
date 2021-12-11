const { ApolloError } = require('apollo-server');
const serverConfig = require('../server');
const fetch = require('node-fetch')

const authentication = async ({ req }) => {

    const token = req.headers.authorization || '';

    if (token == '') {
        return {
            userIdToken: null
        }
    } else {
        try {
            let requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token }),
                redirect: 'follow'
            };

            let response = await fetch(
                `${serverConfig.auth_api_url}verifyToken/`, requestOptions
            )

            if (response.status != 200) {
                console.log(response)
                throw new ApolloError(`SESION INACTIVA - ${401}` + response.status, 401)
            }

            const userIdToken = (await response.json()).UserId

            // Averiguando si es superUser

            const user = await fetch(
                `${serverConfig.auth_api_url}user/${userIdToken}/`
            )

            if (user.status != 200) {
                console.log(response)
                throw new ApolloError(`ERROR AL CONSULTAR LOS PERMISOS - ${401}` + response.status, 401)
            }

            const isSuperuser = (await user.json()).is_superuser

            return { userIdToken, isSuperuser }

        } catch (error) {
            throw new ApolloError(`TOKEN ERROR: ${500}: ${error}`, 500)
        }
    }
}

module.exports = authentication;
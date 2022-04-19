const {Socket} = require('socket.io');

const {
    secret: {headerToken},
} = require('../../../config/config');

const {checkJWT} = require('../../helpers/jwt.helper');

const {getUserById} = require('../../apiModules/users/user.dao');

const validateSoketJWT = async (token) => {
    try {
        const {uid} = await checkJWT(token);
        return await getUserById(uid);
    } catch (error) {
        return error;
    }
};

module.exports = {
    ChatSocketController: async (client = new Socket(), sk) => {
        // TODO: verificar el JWT
        const user = await validateSoketJWT(client.handshake.headers[headerToken]);

        if (!user) {
            return client.disconnect();
        }

        console.log(`Cliente conectado: ${client.id} - user: ${user.first_name}`);
    },
};

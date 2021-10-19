module.exports = {
  UserDTO: (body) => {
    const {username, email, password, image} = body;
    return {username, email, password, image};
  },
};

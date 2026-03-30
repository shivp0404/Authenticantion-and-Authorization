const user = require("../auth/user.schema");

const UserRepositories = {
  findbyId: async (id) => {
    return user.findById(id).select("-password");
  },
  alluser: async () => {
    return await user.find().select("-password");
  },
};

module.exports = UserRepositories;

const User = require("../models/user");

class UserRepository {
  async register(data) {
    try {
      const newUser = await User.create(data);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByEmail({email}) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async updateUser(id,data) {
    try {
      const user = await User.updateOne({_id:id},data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllUsers(query) {
    try {
      const users = await User.find({
        "$or":[
          {name:query},
          {email:query}

        ]
      })
      return users;
    } catch (error) {
      console.log(error);
    }
  }
  
}

module.exports = UserRepository;

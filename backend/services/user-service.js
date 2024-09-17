const UserRepository = require("../repository/user-repository");
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(data) {
    try {
      const {password}=data
      const salt = await bcryptjs.genSalt(10)
      const hashpassword = await bcryptjs.hash(password,salt)

      const payload = {
        ...data,
        password:hashpassword
      }
      const oldUser = await this.userRepository.getUserByEmail(data);
      if (!oldUser) {
        const newUser = this.userRepository.register(payload);
        return newUser;
      }
      return oldUser;
    } catch (error) {
      console.log(error);
    }
  }
  async searchUsers(data) {
    try {
      const query = new RegExp(data.search,'i','g')
      const users = await this.userRepository.getAllUsers(query);
      return users;
    } catch (error) {
      console.log(error);
    }
  }
  async logInUser(data) {
    try {
        const oldUser = await this.userRepository.getUserByEmail(data);
        const tokenData = {
            id:oldUser._id,
            email:oldUser.email
        }
       
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
        const verifyPassword = await bcryptjs.compare(data.password,oldUser.password)
       if(verifyPassword)
        return token
            
        return null
    } catch (error) {
        console.log(error)
    }
  }

  async getUserDetails(token) {
    try {
        const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)
        const userDetails = await this.userRepository.getUserById(decode.id) 
        return userDetails 
    } catch (error) {
        console.log(error)
    }
  }
  async updateUser(token,data) {
    try {
        const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)
         await this.userRepository.updateUser(decode.id,data) 
         const updatedDetails = await this.userRepository.getUserById(decode.id)
        return updatedDetails
    } catch (error) {
        console.log(error)
    }
  }
}

module.exports = UserService;

const UserService = require("../services/user-service");

const userService = new UserService();

const cookieOptions={
    secure:true,
    httpOnly: true
}

 const registerUser = async (req, res) => {
  try {
    const response = await userService.registerUser(req.body);
    if(response){
        return res.status(201).json({
            success: true,
            message: "User Successfully created..",
            data: response,
            err: {},
          });

    }else{
        return res.status(500).json({
            success: false,
            message: "User already exist.."
          });
    }
   
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went Wrong...",
      data: {},
      err: error,
    });
  }
};
 const searchUsers = async (req, res) => {
  try {
    const response = await userService.searchUsers(req.body);
    if(response){
        return res.status(201).json({
            success: true,
            message: "All users details...",
            data: response,
            err: {},
          });

    }
   
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went Wrong...",
      data: {},
      err: error,
    });
  }
};

const updateUser = async (req, res) => {
    try {
      const token = req.cookies.token || ""
      const response = await userService.updateUser(token,req.body);
      if(response){
          return res.status(201).json({
              success: true,
              message: "User data Successfully... ",
              data: response,
              err: {},
            });
  
      }else{
          return res.status(500).json({
              success: false,
              message: "Error in updating user data..."
            });
      }
     
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went Wrong...",
        data: {},
        err: error,
      });
    }
  };

const logInUser = async (req, res) => {
    try {
      const response = await userService.logInUser(req.body);
      if(response){
          return res.cookie('token',response,cookieOptions).status(201).json({
              success: true,
              message: "User Successfully LoggedIn...",
              token: response,
              err: {},
            });
  
      }else{
          return res.status(500).json({
              success: false,
              message: "Enter correct details..."
            });
      }
     
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went Wrong...",
        data: {},
        err: error,
      });
    }
  };

const getUserDetails = async(req,res)=>{
    try {
        const token = req.cookies.token || ""
        const response = await userService.getUserDetails(token);
        if(response){
            return res.status(201).json({
                success: true,
                message: "User  data Successfully fetched...",
                data: response,
                err: {},
              });
    
        }else{
            return res.status(500).json({
                success: false,
                message: "Session out"
              });
        }
       
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Something went Wrong...",
          data: {},
          err: error,
        });
      }
    };

const logOut = async(req,res)=>{
    try {
        return res.cookie('token','',cookieOptions).status(201).json({
            logout: true,
            message: "Session Out ",
            err: {},
          });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went Wrong...",
            data: {},
            err: error,
          });
    }

}

module.exports= {
    registerUser,
    logInUser,
    getUserDetails,
    logOut,
    updateUser,
    searchUsers
}
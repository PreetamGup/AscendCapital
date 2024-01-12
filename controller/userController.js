import User from "../model/UserModel.js"
import bcrypt from 'bcrypt'


const userController ={

    register:async(req, res)=>{
        try {
            const { username, password } = req.body;
        
            // Check if the username already exists
            const existingUser = await User.findOne({ where: { username } });
        
            if (existingUser) {
              return res.status(400).json({
                success: false,
                message: 'Username already exists. Please choose a different one.',
              });
            }
        
            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);
        
            // Create a new user
            const newUser = await User.create({
              username,
              password: hashedPassword,
            });
        
            res.status(201).json({
              success: true,
              user: {
                user_id: newUser.user_id,
                username: newUser.username,
              },
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              message: 'Error creating user',
            });
          }
    },


    login: async (req, res)=>{
        try {
            const { username, password } = req.body;
        
            // Check if the user exists
            const existingUser = await User.findOne({ where: { username } });
        
            if (!existingUser) {
              return res.status(401).json({
                success: false,
                message: 'Invalid username or password',
              });
            }
        
            // Verify the password
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
            if (!isPasswordValid) {
              return res.status(401).json({
                success: false,
                message: 'Invalid username or password',
              });
            }
        
            res.status(200).json({
              success: true,
              user: {
                user_id: existingUser.user_id,
                username: existingUser.username,
              },
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              message: 'Error authenticating user',
            });
          }
    }


}


export default userController
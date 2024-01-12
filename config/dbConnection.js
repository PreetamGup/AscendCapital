import { Sequelize } from "sequelize";
import { config } from "dotenv";
config()

export const sequelize = new Sequelize('Todo', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres' 
  });



async function connectDB(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


export default connectDB;
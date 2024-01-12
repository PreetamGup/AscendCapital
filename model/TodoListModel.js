import { sequelize } from "../config/dbConnection.js";
import {  DataTypes } from "sequelize";
import User from "./UserModel.js";



const TodoList = sequelize.define('TodoList', {
    list_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    list_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  // Establishing a relationship between User and TodoList
  TodoList.belongsTo(User, { foreignKey: 'user_id' });
  
 export default TodoList;
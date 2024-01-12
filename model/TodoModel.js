import { sequelize } from "../config/dbConnection.js";
import {  DataTypes } from "sequelize";
import TodoList from "./TodoListModel.js";



const Todo = sequelize.define('Todo', {
    todo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false,
    },
  });
  
  // Establishing a relationship between TodoList and Todo
  Todo.belongsTo(TodoList, { foreignKey: 'list_id' });
  
 export default Todo;
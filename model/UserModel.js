import { sequelize } from "../config/dbConnection.js";
import {  DataTypes } from "sequelize";

const User =  sequelize.define("User", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
})


export default User
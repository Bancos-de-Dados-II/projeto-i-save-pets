import { sequelize } from "../db";

class Pet extends Model {}

Pet.init(
  {
    // Model attributes are defined here
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Pet', // We need to choose the model name
  },
);
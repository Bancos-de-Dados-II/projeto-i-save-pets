import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/dbname')
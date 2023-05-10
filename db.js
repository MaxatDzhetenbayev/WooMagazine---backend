import { Sequelize } from 'sequelize'
import { config } from 'dotenv'


config()


export const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
	host: process.env.DATABASE_HOST,
	dialect: 'postgres'
})
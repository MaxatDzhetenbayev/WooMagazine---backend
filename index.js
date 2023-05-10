import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { sequelize } from './db.js'
import * as Models from './models/models.js'

const app = express()
app.use(express.json())
app.use(cors())

config()

const PORT = process.env.PORT || 5000


app.listen(PORT, async () => {
	try {

		await sequelize.authenticate()
		// await sequelize.sync()
		console.log('SERVER IS WORKING!')
	} catch (err) {
		console.log(err)
	}
})
import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'


import { sequelize } from './db.js'
import { GlobalRouter } from './routes/index.js'


const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', GlobalRouter)

config()

const PORT = process.env.PORT || 5000


app.listen(PORT, async () => {
	try {

		await sequelize.authenticate()
		console.log('SERVER IS WORKING!')
	} catch (err) {
		console.log(err)
	}
})
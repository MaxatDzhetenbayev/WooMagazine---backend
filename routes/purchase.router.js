import { Router } from 'express'
import { PurchaseController } from '../controllers/index.js'

const app = Router()



app.post('/purchase', PurchaseController.createPurchase)




export const PurchaseRouter = app 
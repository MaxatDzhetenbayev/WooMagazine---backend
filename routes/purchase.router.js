import { Router } from 'express'
import { PurchaseController } from '../controllers/index.js'

const app = Router()



app.post('/purchase', PurchaseController.createPurchase)
app.get('/purchase/order/:id', PurchaseController.getClientPurchase)




export const PurchaseRouter = app 
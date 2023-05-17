import { Router } from 'express';
import { ProductRouter } from './product.router.js';
import { PurchaseRouter } from './purchase.router.js';
import { FeedbackRouter } from './feedback.router.js'

const app = Router()


app.use(ProductRouter)
app.use(PurchaseRouter)
app.use(FeedbackRouter)

export const GlobalRouter = app
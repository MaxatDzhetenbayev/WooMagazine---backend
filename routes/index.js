import { Router } from 'express';
import { ProductRouter } from './product.router.js';
import { PurchaseRouter } from './purchase.router.js';


const app = Router()


app.use(ProductRouter)
app.use(PurchaseRouter)


export const GlobalRouter = app
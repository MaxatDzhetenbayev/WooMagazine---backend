import { Router } from 'express';
import { ProductController } from '../controllers/index.js';

const app = Router()


app.get('/getProducts', ProductController.getAll)
app.get('/getProduct', ProductController.getOne)

app.post('/addProduct', ProductController.addProduct)
app.delete('/product/:id', ProductController.deleteProduct )

export const ProductRouter = app
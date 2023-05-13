import { Router } from 'express';
import { ProductController } from '../controllers/index.js';
import { mult } from '../middlewares/file.js'
const app = Router()


app.get('/getProducts', ProductController.getAll)
app.get('/getProduct', ProductController.getOne)

app.post('/addProduct', mult.single('image'), ProductController.addProduct)
app.delete('/product/:id', ProductController.deleteProduct)

export const ProductRouter = app
import { Router } from 'express';
import { ProductRouter } from './product.router.js';

const app = Router()

app.use(ProductRouter)


export const GlobalRouter = app
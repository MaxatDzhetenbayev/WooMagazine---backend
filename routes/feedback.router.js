import { Router } from 'express';
import { FeedbackController } from '../controllers/index.js';

const app = Router()


app.post('/feedback', FeedbackController.createFeedback)

export const FeedbackRouter = app
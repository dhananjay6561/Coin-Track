import express from 'express';
import { receiveMessage } from '../controllers/webhookController.js';

const router = express.Router();
router.post('/', receiveMessage); // Twilio webhook

export default router;

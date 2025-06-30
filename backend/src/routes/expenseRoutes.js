import express from 'express';
import { getExpenses, createExpense } from '../controllers/expenseController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes are protected - user must be authenticated
router.use(protect);

// GET /api/expenses - Get all expenses for the authenticated user
router.get('/', getExpenses);

// POST /api/expenses - Create a new expense
router.post('/', createExpense);

export default router; 
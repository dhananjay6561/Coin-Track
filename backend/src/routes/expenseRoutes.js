import express from 'express';
import { getExpenses, getExpense, createExpense, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes are protected - user must be authenticated
router.use(protect);

// GET /api/expenses - Get all expenses for the authenticated user
router.get('/', getExpenses);

// GET /api/expenses/:id - Get single expense by ID
router.get('/:id', getExpense);

// POST /api/expenses - Create a new expense
router.post('/', createExpense);

// PUT /api/expenses/:id - Update an expense
router.put('/:id', updateExpense);

// DELETE /api/expenses/:id - Delete an expense
router.delete('/:id', deleteExpense);

export default router; 
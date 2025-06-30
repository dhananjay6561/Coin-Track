import asyncHandler from 'express-async-handler';
import Expense from '../models/Expense.js';

// @desc    Create a new expense
// @route   POST /api/expenses
// @access  Private
export const createExpense = asyncHandler(async (req, res) => {
  const { amount, category, description, date } = req.body;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error('Valid amount is required');
  }

  const expense = await Expense.create({
    user: req.user._id,
    amount,
    category,
    description,
    date: date || new Date(),
  });

  res.status(201).json(expense);
});

// @desc    Get all expenses of logged-in user
// @route   GET /api/expenses
// @access  Private
export const getExpenses = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const query = { user: req.user._id };

  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const expenses = await Expense.find(query).sort({ date: -1 });

  res.json(expenses);
});

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
export const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense || expense.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Expense not found or unauthorized');
  }

  const { amount, category, description, date } = req.body;

  if (amount !== undefined) expense.amount = amount;
  if (category !== undefined) expense.category = category;
  if (description !== undefined) expense.description = description;
  if (date !== undefined) expense.date = date;

  const updatedExpense = await expense.save();

  res.json(updatedExpense);
});

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
export const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense || expense.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Expense not found or unauthorized');
  }

  await expense.deleteOne();

  res.json({ message: 'Expense deleted' });
});

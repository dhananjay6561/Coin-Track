import User from '../models/User.js';
import Expense from '../models/Expense.js';
import { parseExpenseMessage } from '../services/messageParser.js';

export const receiveMessage = async (req, res) => {
  const from = req.body.From;
  const number = from.replace('whatsapp:', '');
  const message = req.body.Body;

  try {
    const user = await User.findOne({ whatsappNumber: number });
    if (!user) {
      return res.send(`<Response><Message>You are not registered yet.</Message></Response>`);
    }

    const parsed = parseExpenseMessage(message);
    if (!parsed) {
      return res.send(`<Response><Message>Could not understand your message. Use: "Spent 100 on food"</Message></Response>`);
    }

    const expense = await Expense.create({
      user: user._id,
      amount: parsed.amount,
      category: parsed.category,
      description: parsed.description,
    });

    return res.send(`<Response><Message>Logged ₹${parsed.amount} for "${parsed.category}"</Message></Response>`);
  } catch (err) {
    console.error('Error:', err.message);
    return res.send(`<Response><Message>Error saving expense. Try again later.</Message></Response>`);
  }
};

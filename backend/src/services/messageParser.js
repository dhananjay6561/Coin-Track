export const parseExpenseMessage = (text) => {
  const regex = /spent\s+(\d+)\s*(?:rs|₹)?\s*on\s+(.+)/i;
  const match = text.match(regex);

  if (!match) return null;

  return {
    amount: parseFloat(match[1]),
    category: match[2].trim(),
    description: match[2].trim(),
  };
};

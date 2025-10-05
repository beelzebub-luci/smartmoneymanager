export const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);
};

export const calculateCategoryTotals = (expenses) => {
  const categoryTotals = {};
  expenses.forEach(expense => {
    const category = expense.category || 'Uncategorized';
    categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(expense.amount || 0);
  });
  return categoryTotals;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Others'
];

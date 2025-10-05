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
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

export const filterExpensesByPeriod = (expenses, period) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    
    switch (period) {
      case 'daily':
        return expenseDate >= today;
      case 'weekly':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return expenseDate >= weekAgo;
      case 'monthly':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return expenseDate >= monthStart;
      case 'yearly':
        const yearStart = new Date(now.getFullYear(), 0, 1);
        return expenseDate >= yearStart;
      default:
        return true;
    }
  });
};

export const getExpenseTrends = (expenses, period = 'monthly') => {
  const trends = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    let key;
    
    switch (period) {
      case 'daily':
        key = date.toLocaleDateString();
        break;
      case 'weekly':
        const weekNumber = Math.ceil((date - new Date(date.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
        key = `Week ${weekNumber}`;
        break;
      case 'monthly':
        key = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        break;
      case 'yearly':
        key = date.getFullYear().toString();
        break;
      default:
        key = date.toLocaleDateString();
    }
    
    trends[key] = (trends[key] || 0) + parseFloat(expense.amount || 0);
  });
  
  return Object.entries(trends).map(([period, amount]) => ({
    period,
    amount
  })).sort((a, b) => a.period.localeCompare(b.period));
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

export const PAYMENT_MODES = [
  'Cash',
  'UPI',
  'Card',
  'Wallet',
  'Online Transaction'
];

// Category key mapping for translations
export const getCategoryKey = (category) => {
  const keyMap = {
    'Food & Dining': 'foodDining',
    'Shopping': 'shopping',
    'Transportation': 'transportation',
    'Entertainment': 'entertainment',
    'Bills & Utilities': 'billsUtilities',
    'Healthcare': 'healthcare',
    'Education': 'education',
    'Travel': 'travel',
    'Others': 'others'
  };
  return keyMap[category] || 'others';
};

// Payment mode key mapping for translations
export const getPaymentModeKey = (mode) => {
  const keyMap = {
    'Cash': 'cash',
    'UPI': 'upi',
    'Card': 'card',
    'Wallet': 'wallet',
    'Online Transaction': 'onlineTransaction'
  };
  return keyMap[mode] || 'cash';
};

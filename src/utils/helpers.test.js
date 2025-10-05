import { filterExpensesByPeriod, getExpenseTrends, calculateCategoryTotals } from './helpers';

describe('Helper Functions', () => {
  const mockExpenses = [
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      description: 'Lunch',
      amount: 500,
      category: 'Food & Dining'
    },
    {
      id: '2',
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: 'Shopping',
      amount: 1000,
      category: 'Shopping'
    },
    {
      id: '3',
      date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: 'Transport',
      amount: 200,
      category: 'Transportation'
    }
  ];

  test('filterExpensesByPeriod - daily should return today\'s expenses', () => {
    const result = filterExpensesByPeriod(mockExpenses, 'daily');
    expect(result.length).toBe(1);
    expect(result[0].description).toBe('Lunch');
  });

  test('filterExpensesByPeriod - weekly should return last 7 days expenses', () => {
    const result = filterExpensesByPeriod(mockExpenses, 'weekly');
    expect(result.length).toBe(1);
    expect(result[0].description).toBe('Lunch');
  });

  test('filterExpensesByPeriod - monthly should return current month expenses', () => {
    const result = filterExpensesByPeriod(mockExpenses, 'monthly');
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  test('calculateCategoryTotals should sum expenses by category', () => {
    const result = calculateCategoryTotals(mockExpenses);
    expect(result['Food & Dining']).toBe(500);
    expect(result['Shopping']).toBe(1000);
    expect(result['Transportation']).toBe(200);
  });

  test('getExpenseTrends should return trend data', () => {
    const result = getExpenseTrends(mockExpenses, 'monthly');
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('period');
    expect(result[0]).toHaveProperty('amount');
  });
});

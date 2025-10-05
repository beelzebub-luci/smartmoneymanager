import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, ButtonGroup } from 'react-bootstrap';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { calculateCategoryTotals, formatCurrency, getCategoryKey, filterExpensesByPeriod, getExpenseTrends, CATEGORIES, PAYMENT_MODES } from '../utils/helpers';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

function Reports({ expenses, income }) {
  const { t } = useTranslation();
  const [period, setPeriod] = useState('monthly');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Apply filters
  let filteredExpenses = filterExpensesByPeriod(expenses, period);
  
  if (categoryFilter !== 'all') {
    filteredExpenses = filteredExpenses.filter(e => e.category === categoryFilter);
  }
  
  if (paymentFilter !== 'all') {
    filteredExpenses = filteredExpenses.filter(e => e.paymentMode === paymentFilter);
  }
  
  if (dateRange.start && dateRange.end) {
    filteredExpenses = filteredExpenses.filter(e => {
      const expenseDate = new Date(e.date);
      return expenseDate >= new Date(dateRange.start) && expenseDate <= new Date(dateRange.end);
    });
  }

  // Prepare data for charts
  const categoryTotals = calculateCategoryTotals(filteredExpenses);
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name: t(`categories.${getCategoryKey(name)}`),
    value
  }));

  const trendData = getExpenseTrends(filteredExpenses, period);
  const totalFilteredExpenses = filteredExpenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
  
  const incomeVsExpenseData = [
    { name: t('reports.income'), amount: income },
    { name: t('reports.expenses'), amount: totalFilteredExpenses }
  ];

  const handleExportCSV = () => {
    const headers = ['Date', 'Description', 'Amount', 'Category', 'Payment Mode', 'Notes'];
    const rows = filteredExpenses.map(e => [
      e.date,
      e.description,
      e.amount,
      e.category === 'Custom' && e.customCategory ? e.customCategory : e.category,
      e.paymentMode || '',
      e.notes || ''
    ]);
    
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses_${period}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="reports-section">
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-success text-white">
          <h5 className="mb-0">{t('reports.title')}</h5>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label className="small">{t('reports.timePeriod')}</Form.Label>
                <ButtonGroup className="d-flex">
                  <Button 
                    size="sm" 
                    variant={period === 'daily' ? 'primary' : 'outline-primary'}
                    onClick={() => setPeriod('daily')}
                  >
                    {t('reports.daily')}
                  </Button>
                  <Button 
                    size="sm" 
                    variant={period === 'weekly' ? 'primary' : 'outline-primary'}
                    onClick={() => setPeriod('weekly')}
                  >
                    {t('reports.weekly')}
                  </Button>
                  <Button 
                    size="sm" 
                    variant={period === 'monthly' ? 'primary' : 'outline-primary'}
                    onClick={() => setPeriod('monthly')}
                  >
                    {t('reports.monthly')}
                  </Button>
                  <Button 
                    size="sm" 
                    variant={period === 'yearly' ? 'primary' : 'outline-primary'}
                    onClick={() => setPeriod('yearly')}
                  >
                    {t('reports.yearly')}
                  </Button>
                </ButtonGroup>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="small">{t('reports.category')}</Form.Label>
                <Form.Select size="sm" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="all">{t('reports.allCategories')}</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{t(`categories.${getCategoryKey(cat)}`)}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="small">{t('reports.paymentMode')}</Form.Label>
                <Form.Select size="sm" value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
                  <option value="all">{t('reports.allPaymentModes')}</option>
                  {PAYMENT_MODES.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Label className="small">&nbsp;</Form.Label>
              <div className="d-grid">
                <Button size="sm" variant="success" onClick={handleExportCSV}>
                  {t('reports.exportCSV')}
                </Button>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small">{t('reports.dateFrom')}</Form.Label>
                <Form.Control 
                  type="date" 
                  size="sm" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small">{t('reports.dateTo')}</Form.Label>
                <Form.Control 
                  type="date" 
                  size="sm" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h6 className="mb-0">{t('reports.expenseByCategory')}</h6>
            </Card.Header>
            <Card.Body>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-muted py-5">{t('reports.noData')}</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h6 className="mb-0">{t('reports.incomeVsExpense')}</h6>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={incomeVsExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Header>
              <h6 className="mb-0">{t('reports.spendingTrends')}</h6>
            </Card.Header>
            <Card.Body>
              {trendData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-muted py-5">{t('reports.noData')}</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Reports;

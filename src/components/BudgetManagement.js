import React from 'react';
import { Card, Row, Col, ProgressBar, Badge, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { calculateCategoryTotals, formatCurrency, getCategoryKey, CATEGORIES } from '../utils/helpers';

function BudgetManagement({ expenses, budget, categoryBudgets }) {
  const { t } = useTranslation();
  const categoryTotals = calculateCategoryTotals(expenses);
  const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);

  const getCategoryBudget = (category) => {
    return categoryBudgets && categoryBudgets[category] ? categoryBudgets[category] : 0;
  };

  const getBudgetStatus = (spent, budgetAmount) => {
    if (budgetAmount === 0) return 'info';
    const percentage = (spent / budgetAmount) * 100;
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    return 'success';
  };

  const shouldShowAlert = (spent, budgetAmount) => {
    if (budgetAmount === 0) return false;
    const percentage = (spent / budgetAmount) * 100;
    return percentage >= 75;
  };

  return (
    <div className="budget-management">
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">{t('budgetManagement.title')}</h5>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <div className="text-center">
                <h6 className="text-muted small">{t('budgetManagement.totalBudget')}</h6>
                <h4 className="text-primary">{formatCurrency(budget)}</h4>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <h6 className="text-muted small">{t('budgetManagement.totalSpent')}</h6>
                <h4 className="text-danger">{formatCurrency(totalExpenses)}</h4>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <h6 className="text-muted small">{t('budgetManagement.remaining')}</h6>
                <h4 className={budget - totalExpenses >= 0 ? 'text-success' : 'text-danger'}>
                  {formatCurrency(budget - totalExpenses)}
                </h4>
              </div>
            </Col>
          </Row>

          {budget > 0 && (
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">{t('budgetManagement.overallProgress')}</span>
                <span className="text-muted small">
                  {((totalExpenses / budget) * 100).toFixed(1)}%
                </span>
              </div>
              <ProgressBar 
                now={(totalExpenses / budget) * 100} 
                variant={getBudgetStatus(totalExpenses, budget)}
                style={{ height: '20px' }}
              />
            </div>
          )}

          {budget > 0 && totalExpenses >= budget * 0.9 && (
            <Alert variant="danger" className="mb-3">
              <strong>{t('budgetManagement.alert')}:</strong> {t('budgetManagement.budgetExceeding')}
            </Alert>
          )}
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header>
          <h6 className="mb-0">{t('budgetManagement.categoryWise')}</h6>
        </Card.Header>
        <Card.Body>
          {CATEGORIES.map(category => {
            const spent = categoryTotals[category] || 0;
            const categoryBudget = getCategoryBudget(category);
            const hasData = spent > 0 || categoryBudget > 0;
            
            if (!hasData) return null;

            const percentage = categoryBudget > 0 ? (spent / categoryBudget) * 100 : 0;

            return (
              <div key={category} className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <strong>{t(`categories.${getCategoryKey(category)}`)}</strong>
                    {shouldShowAlert(spent, categoryBudget) && (
                      <Badge bg="warning" className="ms-2">
                        {t('budgetManagement.nearLimit')}
                      </Badge>
                    )}
                  </div>
                  <div className="text-end">
                    <div className="text-danger">{formatCurrency(spent)}</div>
                    {categoryBudget > 0 && (
                      <div className="text-muted small">
                        {t('budgetManagement.of')} {formatCurrency(categoryBudget)}
                      </div>
                    )}
                  </div>
                </div>
                {categoryBudget > 0 && (
                  <ProgressBar 
                    now={percentage > 100 ? 100 : percentage}
                    variant={getBudgetStatus(spent, categoryBudget)}
                    label={`${percentage.toFixed(0)}%`}
                  />
                )}
              </div>
            );
          })}
          
          {Object.keys(categoryTotals).length === 0 && (
            <p className="text-center text-muted py-3">{t('budgetManagement.noExpenses')}</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default BudgetManagement;

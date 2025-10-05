import React from 'react';
import { Card, ListGroup, ProgressBar } from 'react-bootstrap';
import { calculateCategoryTotals, formatCurrency, getCategoryKey } from '../utils/helpers';
import { useTranslation } from 'react-i18next';

function CategorySummary({ expenses, totalExpenses }) {
  const { t } = useTranslation();
  const categoryTotals = calculateCategoryTotals(expenses);
  const categories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  if (categories.length === 0) {
    return (
      <Card className="shadow-sm">
        <Card.Header className="bg-info text-white">
          <h5 className="mb-0">{t('categorySummary.title')}</h5>
        </Card.Header>
        <Card.Body className="text-center py-4 text-muted">
          <p className="mb-0">{t('categorySummary.empty')}</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-info text-white">
        <h5 className="mb-0">{t('categorySummary.title')}</h5>
      </Card.Header>
      <ListGroup variant="flush">
        {categories.map(([category, amount]) => {
          const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
          return (
            <ListGroup.Item key={category}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>{t(`categories.${getCategoryKey(category)}`)}</strong>
                <span className="text-danger">{formatCurrency(amount)}</span>
              </div>
              <ProgressBar 
                now={percentage} 
                label={`${percentage.toFixed(1)}%`}
                variant="info"
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
}

export default CategorySummary;

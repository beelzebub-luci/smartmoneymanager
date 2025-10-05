import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { formatCurrency } from '../utils/helpers';

function Dashboard({ income, totalExpenses, budget }) {
  const remaining = income - totalExpenses;

  return (
    <Row className="g-3 mb-4">
      <Col xs={12} md={6} lg={3}>
        <Card className="text-center shadow-sm h-100">
          <Card.Body>
            <Card.Title className="text-muted small">Total Income</Card.Title>
            <h3 className="text-success mb-0">{formatCurrency(income)}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6} lg={3}>
        <Card className="text-center shadow-sm h-100">
          <Card.Body>
            <Card.Title className="text-muted small">Total Expenses</Card.Title>
            <h3 className="text-danger mb-0">{formatCurrency(totalExpenses)}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6} lg={3}>
        <Card className="text-center shadow-sm h-100">
          <Card.Body>
            <Card.Title className="text-muted small">Budget</Card.Title>
            <h3 className="text-primary mb-0">{formatCurrency(budget)}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6} lg={3}>
        <Card className="text-center shadow-sm h-100">
          <Card.Body>
            <Card.Title className="text-muted small">Remaining</Card.Title>
            <h3 className={remaining >= 0 ? 'text-success mb-0' : 'text-danger mb-0'}>
              {formatCurrency(remaining)}
            </h3>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Dashboard;

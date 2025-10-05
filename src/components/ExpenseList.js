import React from 'react';
import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { formatCurrency } from '../utils/helpers';

function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center py-5 text-muted">
          <p className="mb-0">No expenses added yet. Click "Add Expense" to get started!</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">Expense History</h5>
      </Card.Header>
      <ListGroup variant="flush">
        {expenses.map(expense => (
          <ListGroup.Item key={expense.id} className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="mb-0">{expense.description}</h6>
                <strong className="text-danger">{formatCurrency(expense.amount)}</strong>
              </div>
              <div className="d-flex gap-2 align-items-center text-muted small">
                <Badge bg="secondary">{expense.category}</Badge>
                <span>{new Date(expense.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="ms-3 d-flex gap-2">
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => onEdit(expense)}
              >
                Edit
              </Button>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default ExpenseList;

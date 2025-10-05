import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function BudgetForm({ show, handleClose, income, budget, updateIncome, updateBudget }) {
  const [formData, setFormData] = useState({
    income: income,
    budget: budget
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    updateIncome(parseFloat(formData.income) || 0);
    updateBudget(parseFloat(formData.budget) || 0);
    
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Manage Income & Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Monthly Income</Form.Label>
            <Form.Control
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            <Form.Text className="text-muted">
              Your total monthly income
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Monthly Budget</Form.Label>
            <Form.Control
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            <Form.Text className="text-muted">
              Your spending budget for the month
            </Form.Text>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Update
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BudgetForm;

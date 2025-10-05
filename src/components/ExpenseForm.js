import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CATEGORIES, generateId } from '../utils/helpers';

function ExpenseForm({ show, handleClose, addExpense, editExpense, expenseToEdit }) {
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    amount: '',
    category: CATEGORIES[0],
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (expenseToEdit) {
      setFormData(expenseToEdit);
    } else {
      setFormData({
        id: '',
        description: '',
        amount: '',
        category: CATEGORIES[0],
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [expenseToEdit, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    const expense = {
      ...formData,
      id: formData.id || generateId(),
      amount: parseFloat(formData.amount)
    };

    if (expenseToEdit) {
      editExpense(expense);
    } else {
      addExpense(expense);
    }
    
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{expenseToEdit ? 'Edit Expense' : 'Add Expense'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount *</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              {expenseToEdit ? 'Update Expense' : 'Add Expense'}
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

export default ExpenseForm;

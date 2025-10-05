import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function BudgetForm({ show, handleClose, income, budget, updateIncome, updateBudget }) {
  const { t } = useTranslation();
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
        <Modal.Title>{t('budgetForm.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t('budgetForm.monthlyIncome')}</Form.Label>
            <Form.Control
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              placeholder={t('expenseForm.amountPlaceholder')}
              step="0.01"
              min="0"
            />
            <Form.Text className="text-muted">
              {t('budgetForm.incomeHelp')}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t('budgetForm.monthlyBudget')}</Form.Label>
            <Form.Control
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder={t('expenseForm.amountPlaceholder')}
              step="0.01"
              min="0"
            />
            <Form.Text className="text-muted">
              {t('budgetForm.budgetHelp')}
            </Form.Text>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              {t('buttons.update')}
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              {t('buttons.cancel')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BudgetForm;

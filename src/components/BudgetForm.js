import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CATEGORIES, getCategoryKey } from '../utils/helpers';

function BudgetForm({ show, handleClose, income, budget, updateIncome, updateBudget, categoryBudgets, updateCategoryBudgets }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    income: income,
    budget: budget
  });
  const [catBudgets, setCatBudgets] = useState(categoryBudgets || {});

  useEffect(() => {
    setFormData({ income, budget });
    setCatBudgets(categoryBudgets || {});
  }, [income, budget, categoryBudgets, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryBudgetChange = (category, value) => {
    setCatBudgets(prev => ({
      ...prev,
      [category]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    updateIncome(parseFloat(formData.income) || 0);
    updateBudget(parseFloat(formData.budget) || 0);
    if (updateCategoryBudgets) {
      updateCategoryBudgets(catBudgets);
    }
    
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

          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>{t('budgetForm.categoryBudgets')}</Accordion.Header>
              <Accordion.Body>
                <Row>
                  {CATEGORIES.map(category => (
                    <Col md={6} key={category} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small">{t(`categories.${getCategoryKey(category)}`)}</Form.Label>
                        <Form.Control
                          type="number"
                          size="sm"
                          value={catBudgets[category] || ''}
                          onChange={(e) => handleCategoryBudgetChange(category, e.target.value)}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                        />
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

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

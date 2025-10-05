import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CATEGORIES, PAYMENT_MODES, generateId, getCategoryKey, getPaymentModeKey } from '../utils/helpers';
import { useTranslation } from 'react-i18next';

function ExpenseForm({ show, handleClose, addExpense, editExpense, expenseToEdit }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    amount: '',
    category: CATEGORIES[0],
    date: new Date().toISOString().split('T')[0],
    notes: '',
    paymentMode: PAYMENT_MODES[0],
    customCategory: ''
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
        date: new Date().toISOString().split('T')[0],
        notes: '',
        paymentMode: PAYMENT_MODES[0],
        customCategory: ''
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
      alert(t('expenseForm.requiredFields'));
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
        <Modal.Title>{expenseToEdit ? t('expenseForm.editTitle') : t('expenseForm.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t('expenseForm.description')} *</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t('expenseForm.descriptionPlaceholder')}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t('expenseForm.amount')} *</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder={t('expenseForm.amountPlaceholder')}
              step="0.01"
              min="0"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t('expenseForm.category')}</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{t(`categories.${getCategoryKey(cat)}`)}</option>
              ))}
              <option value="Custom">{t('expenseForm.customCategory')}</option>
            </Form.Select>
          </Form.Group>

          {formData.category === 'Custom' && (
            <Form.Group className="mb-3">
              <Form.Label>{t('expenseForm.customCategoryName')}</Form.Label>
              <Form.Control
                type="text"
                name="customCategory"
                value={formData.customCategory}
                onChange={handleChange}
                placeholder={t('expenseForm.customCategoryPlaceholder')}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>{t('expenseForm.paymentMode')}</Form.Label>
            <Form.Select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
            >
              {PAYMENT_MODES.map(mode => (
                <option key={mode} value={mode}>{t(`paymentModes.${getPaymentModeKey(mode)}`)}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t('expenseForm.date')}</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t('expenseForm.notes')}</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              placeholder={t('expenseForm.notesPlaceholder')}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              {expenseToEdit ? t('expenseForm.updateButton') : t('expenseForm.addButton')}
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

export default ExpenseForm;

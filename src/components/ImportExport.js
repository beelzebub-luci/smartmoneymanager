import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { generateId } from '../utils/helpers';

function ImportExport({ show, handleClose, expenses, onImport }) {
  const { t } = useTranslation();
  const [importError, setImportError] = useState('');

  const handleExportCSV = () => {
    const headers = ['Date', 'Description', 'Amount', 'Category', 'Custom Category', 'Payment Mode', 'Notes'];
    const rows = expenses.map(e => [
      e.date,
      e.description,
      e.amount,
      e.category,
      e.customCategory || '',
      e.paymentMode || '',
      e.notes || ''
    ]);
    
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart_money_manager_expenses_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportExcel = () => {
    // For Excel, we'll use CSV format with .xls extension which Excel can open
    handleExportCSV();
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n');
        
        // Skip header row
        const dataLines = lines.slice(1).filter(line => line.trim());
        
        const importedExpenses = dataLines.map(line => {
          // Simple CSV parsing (handles quoted fields)
          const fields = [];
          let current = '';
          let inQuotes = false;
          
          for (let char of line) {
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              fields.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          fields.push(current.trim());
          
          return {
            id: generateId(),
            date: fields[0] || new Date().toISOString().split('T')[0],
            description: fields[1] || 'Imported Expense',
            amount: parseFloat(fields[2]) || 0,
            category: fields[3] || 'Others',
            customCategory: fields[4] || '',
            paymentMode: fields[5] || 'Cash',
            notes: fields[6] || ''
          };
        });

        onImport(importedExpenses);
        setImportError('');
        handleClose();
      } catch (error) {
        setImportError(t('importExport.importError'));
      }
    };
    
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('importExport.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {importError && (
          <Alert variant="danger" onClose={() => setImportError('')} dismissible>
            {importError}
          </Alert>
        )}

        <div className="mb-4">
          <h6 className="mb-3">{t('importExport.export')}</h6>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleExportCSV}>
              {t('importExport.exportCSV')}
            </Button>
            <Button variant="outline-primary" onClick={handleExportExcel}>
              {t('importExport.exportExcel')}
            </Button>
          </div>
        </div>

        <hr />

        <div>
          <h6 className="mb-3">{t('importExport.import')}</h6>
          <Form.Group>
            <Form.Label className="small text-muted">
              {t('importExport.importHelp')}
            </Form.Label>
            <Form.Control
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleImportCSV}
            />
          </Form.Group>
          <Alert variant="info" className="mt-3 small">
            <strong>{t('importExport.csvFormat')}:</strong><br />
            Date, Description, Amount, Category, Custom Category, Payment Mode, Notes
          </Alert>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('buttons.cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImportExport;

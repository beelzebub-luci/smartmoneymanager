import React, { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import AppNavbar from './components/AppNavbar';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategorySummary from './components/CategorySummary';
import BudgetForm from './components/BudgetForm';
import useLocalStorage from './hooks/useLocalStorage';
import useTheme from './hooks/useTheme';
import { calculateTotalExpenses } from './utils/helpers';
import './App.css';

function App() {
  const [theme, toggleTheme] = useTheme();
  const [expenses, setExpenses] = useLocalStorage('expenses', []);
  const [income, setIncome] = useLocalStorage('income', 0);
  const [budget, setBudget] = useLocalStorage('budget', 0);
  
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const totalExpenses = calculateTotalExpenses(expenses);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses(expenses.map(exp => 
      exp.id === updatedExpense.id ? updatedExpense : exp
    ));
    setExpenseToEdit(null);
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(exp => exp.id !== id));
    }
  };

  const openEditForm = (expense) => {
    setExpenseToEdit(expense);
    setShowExpenseForm(true);
  };

  const handleCloseExpenseForm = () => {
    setShowExpenseForm(false);
    setExpenseToEdit(null);
  };

  return (
    <div className="App min-vh-100">
      <AppNavbar theme={theme} toggleTheme={toggleTheme} />
      
      <Container className="pb-5">
        <Dashboard 
          income={income}
          totalExpenses={totalExpenses}
          budget={budget}
        />

        <div className="d-flex gap-2 mb-4">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => setShowExpenseForm(true)}
          >
            + Add Expense
          </Button>
          <Button 
            variant="success" 
            size="lg"
            onClick={() => setShowBudgetForm(true)}
          >
            💰 Manage Budget
          </Button>
        </div>

        <Row className="g-4">
          <Col xs={12} lg={8}>
            <ExpenseList 
              expenses={expenses}
              onEdit={openEditForm}
              onDelete={handleDeleteExpense}
            />
          </Col>
          <Col xs={12} lg={4}>
            <CategorySummary 
              expenses={expenses}
              totalExpenses={totalExpenses}
            />
          </Col>
        </Row>

        <ExpenseForm
          show={showExpenseForm}
          handleClose={handleCloseExpenseForm}
          addExpense={handleAddExpense}
          editExpense={handleEditExpense}
          expenseToEdit={expenseToEdit}
        />

        <BudgetForm
          show={showBudgetForm}
          handleClose={() => setShowBudgetForm(false)}
          income={income}
          budget={budget}
          updateIncome={setIncome}
          updateBudget={setBudget}
        />
      </Container>
    </div>
  );
}

export default App;

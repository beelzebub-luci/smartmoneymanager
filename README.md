# Smart Money Manager 💰

A modern, responsive web application for managing your personal finances. Track expenses, set budgets, and analyze your spending patterns with ease.

## Features

### 💡 Core Functionality
- **Add/Update/Delete Expenses**: Easily manage your daily expenses with a user-friendly interface
- **Income & Budget Management**: Set your monthly income and budget to stay on track
- **Category-wise Spending**: View detailed breakdown of expenses by category
- **Real-time Dashboard**: Monitor your financial health at a glance

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes with your preference saved in localStorage
- **Responsive Design**: Mobile-first design that works seamlessly on all devices
- **Modern UI**: Built with Bootstrap 5 and react-bootstrap components
- **PWA Support**: Install as a Progressive Web App on your device

### 🛠 Technology Stack
- **Frontend**: React.js with Functional Components and Hooks (useState, useEffect)
- **UI Framework**: Bootstrap 5 with react-bootstrap components
- **State Management**: React Hooks with localStorage persistence
- **Design**: Responsive, mobile-first approach

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wdranjeet/smartmoneymanager.git
cd smartmoneymanager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage

### Managing Expenses
1. Click "Add Expense" to create a new expense entry
2. Fill in the description, amount, category, and date
3. Click "Update Expense" on any expense to edit it
4. Click "Delete" to remove an expense

### Setting Budget
1. Click "Manage Budget" button
2. Set your monthly income and budget
3. The dashboard will automatically update to show your financial status

### Viewing Analytics
- The dashboard shows Total Income, Total Expenses, Budget, and Remaining balance
- The Category Summary section displays spending breakdown by category with visual progress bars

### Theme Toggle
- Use the theme switch in the navbar to toggle between light and dark modes
- Your preference is automatically saved and persisted across sessions

## Project Structure

```
src/
├── components/          # React components
│   ├── AppNavbar.js    # Navigation bar with theme toggle
│   ├── Dashboard.js    # Financial overview dashboard
│   ├── ExpenseForm.js  # Form for adding/editing expenses
│   ├── ExpenseList.js  # List of all expenses
│   ├── CategorySummary.js  # Category-wise spending view
│   └── BudgetForm.js   # Form for managing income/budget
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js  # Hook for localStorage management
│   └── useTheme.js     # Hook for theme management
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions for calculations
├── App.js              # Main application component
├── App.css             # Application styles
├── index.js            # Application entry point
└── index.css           # Global styles
```

## Features in Detail

### Expense Categories
- Food & Dining
- Shopping
- Transportation
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Travel
- Others

### Data Persistence
All data is stored in the browser's localStorage, ensuring your information persists across sessions without requiring a backend server.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Author

Ranjeet - [GitHub Profile](https://github.com/wdranjeet)

## Acknowledgments

- Built with Create React App
- UI components from react-bootstrap
- Icons and styling inspired by modern fintech applications

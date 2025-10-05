# Smart Money Manager 💰

A modern, responsive web application for managing your personal finances. Track expenses, set budgets, and analyze your spending patterns with ease.

## Features

### 💡 Core Functionality
- **Add/Update/Delete Expenses**: Easily manage your daily expenses with a user-friendly interface
- **Income & Budget Management**: Set your monthly income and budget to stay on track
- **Category-wise Spending**: View detailed breakdown of expenses by category
- **Custom Categories**: Define your own expense categories for better personalization
- **Payment Modes**: Track payment methods (Cash, UPI, Card, Wallet, Online Transaction)
- **Notes & Details**: Add notes to expenses for better record keeping
- **Real-time Dashboard**: Monitor your financial health at a glance
- **Multi-language Support**: Switch between English and Hindi (हिंदी) with complete UI translation
- **INR Currency**: Default currency format in Indian Rupees (₹)

### 📊 Reports & Analytics
- **Time Period Filters**: View expenses by Daily, Weekly, Monthly, or Yearly periods
- **Pie Charts**: Visual breakdown of expenses by category
- **Trend Charts**: Line charts showing spending trends over time
- **Income vs Expense Charts**: Bar charts comparing income and expenses
- **Advanced Filters**: Filter by date range, category, and payment method
- **Export Reports**: Download expense data as CSV files

### 💰 Budget Management
- **Overall Budget Tracking**: Set and track your monthly budget
- **Category-wise Budgets**: Set individual budgets for each expense category
- **Budget Alerts**: Get warnings when approaching 75% and 90% of budget limits
- **Progress Indicators**: Visual progress bars showing budget utilization
- **Budget Status**: Color-coded indicators (green/yellow/red) for budget health

### 📥 Import/Export
- **Bulk Export**: Export all expenses to CSV or Excel format
- **Bulk Import**: Import expenses from CSV or Excel files
- **Data Portability**: Easy backup and transfer of financial data

### 🎨 User Experience
- **Tab-based Navigation**: Switch between Dashboard, Reports, and Budget Tracking
- **Multi-language Interface**: Full support for English and Hindi with easy language switching
- **Dark/Light Mode**: Toggle between themes with your preference saved in localStorage
- **Responsive Design**: Mobile-first design that works seamlessly on all devices
- **Modern UI**: Built with Bootstrap 5 and react-bootstrap components
- **PWA Support**: Install as a Progressive Web App on your device

### 🛠 Technology Stack
- **Frontend**: React.js with Functional Components and Hooks (useState, useEffect)
- **UI Framework**: Bootstrap 5 with react-bootstrap components
- **Charts & Visualizations**: Recharts library for interactive data visualization
- **Internationalization**: react-i18next for multi-language support
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

## Deployment

### Deploying to Vercel

This project is configured for easy deployment to Vercel:

1. **Fork or clone this repository** to your GitHub account

2. **Import to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. **Configure the project** (usually auto-detected):
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Deploy**: Click "Deploy" and Vercel will build and deploy your app

The project includes:
- `.npmrc` file to handle dependency resolution
- `vercel.json` for proper routing configuration
- `ajv` as a dev dependency to resolve build issues

### Manual Deployment Steps

If you need to deploy manually:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# The build folder is ready to be deployed
```

You can deploy the `build` folder to any static hosting service like Netlify, GitHub Pages, or traditional web servers.

## Usage

### Managing Expenses
1. **Add Expense**: Click "Add Expense" button to create a new expense entry
   - Enter description, amount, category, and date
   - Optionally add payment mode, notes, or use a custom category
2. **Edit Expense**: Click "Edit" on any expense to modify it
3. **Delete Expense**: Click "Delete" to remove an expense
4. **View Expenses**: All expenses are listed with category badges and payment mode indicators

### Budget Management
1. **Set Overall Budget**:
   - Click "Manage Budget" button
   - Set your monthly income and overall budget
2. **Category-wise Budgets**:
   - In the Budget form, expand "Category-wise Budgets"
   - Set individual budgets for each category
3. **Track Budget**:
   - Switch to "Budget Tracking" tab
   - View overall budget progress and category-wise tracking
   - Get alerts when budget reaches 75% or 90% utilization

### Reports & Analytics
1. **View Reports**: Switch to the "Reports" tab
2. **Filter Data**:
   - Select time period: Daily, Weekly, Monthly, or Yearly
   - Filter by category or payment mode
   - Use custom date range for specific periods
3. **Visualize Data**:
   - Pie chart shows expense distribution by category
   - Line chart displays spending trends over time
   - Bar chart compares income vs expenses
4. **Export Data**: Click "Export CSV" to download filtered expense data

### Import/Export Data
1. **Export**:
   - Click "Import/Export" button on Dashboard
   - Choose "Export as CSV" or "Export as Excel"
   - File downloads automatically with all expense data
2. **Import**:
   - Click "Import/Export" button
   - Upload a CSV or Excel file with the correct format
   - Expenses are automatically added to your records

### Theme & Language
- **Theme Toggle**: Use the theme switch in the navbar to toggle between light and dark modes
- **Language Switching**: Click the language selector (🌐) to switch between English and Hindi
- All preferences are automatically saved and persisted across sessions

## Project Structure

```
src/
├── components/          # React components
│   ├── AppNavbar.js    # Navigation bar with theme toggle and language selector
│   ├── Dashboard.js    # Financial overview dashboard
│   ├── ExpenseForm.js  # Form for adding/editing expenses with payment modes and notes
│   ├── ExpenseList.js  # List of all expenses with detailed information
│   ├── CategorySummary.js  # Category-wise spending view
│   ├── BudgetForm.js   # Form for managing income/budget with category budgets
│   ├── BudgetManagement.js  # Budget tracking with alerts and progress
│   ├── Reports.js      # Reports & analytics with charts and filters
│   └── ImportExport.js # Import/export functionality for bulk data management
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js  # Hook for localStorage management
│   └── useTheme.js     # Hook for theme management
├── locales/            # Translation files
│   ├── en.json         # English translations
│   └── hi.json         # Hindi translations
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions for calculations, filtering, and trends
├── i18n.js             # Internationalization configuration
├── App.js              # Main application component with tab navigation
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

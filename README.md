# Smart Money Manager 💰

A modern, responsive web application for managing your personal finances. Track expenses, set budgets, and analyze your spending patterns with ease.

## Features

### 💡 Core Functionality
- **Add/Update/Delete Expenses**: Easily manage your daily expenses with a user-friendly interface
- **Income & Budget Management**: Set your monthly income and budget to stay on track
- **Category-wise Spending**: View detailed breakdown of expenses by category
- **Real-time Dashboard**: Monitor your financial health at a glance
- **Multi-language Support**: Switch between English and Hindi (हिंदी) with complete UI translation
- **INR Currency**: Default currency format in Indian Rupees (₹)

### 🎨 User Experience
- **Multi-language Interface**: Full support for English and Hindi with easy language switching
- **Dark/Light Mode**: Toggle between themes with your preference saved in localStorage
- **Responsive Design**: Mobile-first design that works seamlessly on all devices
- **Modern UI**: Built with Bootstrap 5 and react-bootstrap components
- **PWA Support**: Install as a Progressive Web App on your device

### 🛠 Technology Stack
- **Frontend**: React.js with Functional Components and Hooks (useState, useEffect)
- **UI Framework**: Bootstrap 5 with react-bootstrap components
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

### Language Switching
- Click the language selector (🌐) in the navbar to switch between English and Hindi
- All UI elements, including categories, buttons, and messages are fully translated
- Your language preference is automatically saved and persisted across sessions
- Currency format displays in Indian Rupees (₹) for both languages

## Project Structure

```
src/
├── components/          # React components
│   ├── AppNavbar.js    # Navigation bar with theme toggle and language selector
│   ├── Dashboard.js    # Financial overview dashboard
│   ├── ExpenseForm.js  # Form for adding/editing expenses
│   ├── ExpenseList.js  # List of all expenses
│   ├── CategorySummary.js  # Category-wise spending view
│   └── BudgetForm.js   # Form for managing income/budget
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js  # Hook for localStorage management
│   └── useTheme.js     # Hook for theme management
├── locales/            # Translation files
│   ├── en.json         # English translations
│   └── hi.json         # Hindi translations
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions for calculations
├── i18n.js             # Internationalization configuration
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

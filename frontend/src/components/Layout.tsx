import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-title">Expense Tracker</h1>
          <div className="nav-links">
            <Link
              to="/"
              className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
            >
              Dashboard
            </Link>
            <Link
              to="/expenses"
              className={location.pathname === '/expenses' ? 'nav-link active' : 'nav-link'}
            >
              Expenses
            </Link>
            <Link
              to="/categories"
              className={location.pathname === '/categories' ? 'nav-link active' : 'nav-link'}
            >
              Categories
            </Link>
          </div>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;


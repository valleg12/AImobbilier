import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Home, TrendingUp, Users, FileText, MessageCircle, ToggleLeft, ToggleRight } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isClientView, setIsClientView] = useState(false);

  const agentNavItems = [
    { path: '/', label: 'Dashboard', icon: Home }
  ];

  const clientNavItems = [
    { path: '/chat', label: 'Assistant Client', icon: MessageCircle }
  ];

  const navItems = isClientView ? clientNavItems : agentNavItems;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <Building2 size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
          AI Immobilier
        </Link>
        
        <ul className="nav-links">
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link 
                to={path} 
                className={location.pathname === path ? 'active' : ''}
              >
                <Icon size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Toggle Vue Agent/Client */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-medium)' }}>
            {isClientView ? 'Client' : 'Agent'}
          </span>
          <button
            onClick={() => setIsClientView(!isClientView)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-light)',
              padding: '0.25rem'
            }}
          >
            {isClientView ? <ToggleLeft size={20} /> : <ToggleRight size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

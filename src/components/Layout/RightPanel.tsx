import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronUp, User, Phone, Mail, Home, FileText, MessageSquare, Laptop, TrendingUp } from 'lucide-react';

interface RightPanelProps {
  collapsed: boolean;
}

const RightPanel: React.FC<RightPanelProps> = ({ collapsed }) => {
  const [sections, setSections] = useState({
    contacts: true
  });

  const toggleSection = (section: keyof typeof sections) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const mainNavItems = [
    { path: '/', label: 'Tableau de bord', icon: <Home size={18} />, unread: 0 },
    { path: '/communication', label: 'Communication', icon: <Laptop size={18} />, unread: 2 },
    { path: '/messages', label: 'BCA Messages', icon: <MessageSquare size={18} />, unread: 2 },
    { path: '/documents', label: 'Bibliothèque', icon: <FileText size={18} />, unread: 11 },
  ];

  const contacts = [
    {
      role: 'USC Rouen',
     nom: 'NOM Prénom',
     titre: 'Expert automobile',
      tel: 'XX XX XX XX XX',
      email: 'email@domaine.fr'
    },
    {
      role: 'Assuré',
      nom: 'NOM Prénom',
      tel: 'XX XX XX XX XX',
      email: 'email@domaine.fr'
    },
    {
      role: 'Émetteur',
      nom: 'NOM SOCIÉTÉ',
      tel: 'XX XX XX XX XX',
      email: 'email@domaine.fr'
    },
    {
      role: 'Réparateur',
      nom: 'Nom du Garage',
      tel: 'XX XX XX XX XX',
      email: 'email@domaine.fr'
    },
    {
      role: 'Épaviste',
      nom: 'NOM SOCIÉTÉ',
      tel: 'XX XX XX XX XX',
      email: 'email@domaine.fr'
    }
  ];

  if (collapsed) {
    return (
      <div className="p-2 text-center">
        <div className="rotate-90 transform origin-center whitespace-nowrap text-sm text-gray-500 mt-20">
          Navigation
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Main Navigation */}
      <div className="border-b border-gray-200 bg-white p-4">
        <h3 className="font-semibold text-[#0053A0] text-lg mb-3">Navigation</h3>
        <nav className="space-y-2">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-2 rounded-md transition-all duration-200 relative
                ${isActive ? 'bg-[#FFB800] text-[#0053A0]' : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              {item.icon}
              <span className="ml-3 text-sm">{item.label}</span>
              {item.unread > 0 && (
                <span className="absolute top-1/2 -translate-y-1/2 right-2 bg-[#D64800] text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {item.unread}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Contacts Section */}
      <div className="border-t border-gray-200 bg-white">
        <button 
          onClick={() => toggleSection('contacts')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-semibold text-[#0053A0] text-lg">Contacts du dossier</h3>
          {sections.contacts ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </button>
        {sections.contacts && (
          <div className="px-4 pb-4 space-y-3">
            {contacts.map((contact, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                  <div className="ml-2">
                    <p className="text-gray-800 text-sm">
                      <span className="font-medium">{contact.nom}</span>
                      {contact.titre && <span className="text-gray-600"> {contact.titre}</span>}
                    </p>
                    <p className="text-[#0053A0] text-xs">{contact.role}</p>
                  </div>
                </div>
                <div className="space-y-2 pl-10">
                  <a 
                    href={`tel:${contact.tel}`}
                    className="flex items-center text-gray-600 hover:text-[#0053A0] text-xs group"
                  >
                    <Phone size={12} className="mr-2 text-[#0053A0]" />
                    {contact.tel}
                  </a>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="flex items-center text-gray-600 hover:text-[#0053A0] text-xs group"
                  >
                    <Mail size={12} className="mr-2 text-[#0053A0]" />
                    {contact.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
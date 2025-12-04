import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, FileText, ChevronLeft, ChevronRight, Laptop, Home, Users } from 'lucide-react';
import Header from './Header';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Dashboard from '../Pages/Dashboard';
import Documents from '../Pages/Documents';
import Messages from '../Pages/Messages';
import Communication from '../Pages/Communication';
import { useMobileNavigation, MobileView } from '../../hooks/useMobileNavigation';

const Layout: React.FC = () => {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const location = useLocation();
  const { activeView, setActiveView, isMobile } = useMobileNavigation();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
        setLeftPanelOpen(false);
        setRightPanelOpen(false);
      } else if (width < 1024) {
        setScreenSize('tablet');
        setLeftPanelOpen(true);
        setRightPanelOpen(false);
      } else {
        setScreenSize('desktop');
        setLeftPanelOpen(true);
        setRightPanelOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleLeftPanel = () => {
    setLeftPanelOpen(!leftPanelOpen);
  };

  const toggleRightPanel = () => {
    setRightPanelOpen(!rightPanelOpen);
  };

  const getLeftPanelWidth = () => {
    if (!leftPanelOpen) return screenSize === 'mobile' ? 'w-0' : 'w-16';
    if (screenSize === 'mobile') return 'w-full';
    if (screenSize === 'tablet') return 'w-80';
    return 'w-80';
  };

  const getRightPanelWidth = () => {
    if (!rightPanelOpen) return screenSize === 'mobile' ? 'w-0' : 'w-16';
    if (screenSize === 'mobile') return 'w-full';
    if (screenSize === 'tablet') return 'w-80';
    return 'w-96';
  };

  const shouldShowMobileOverlay = screenSize === 'mobile' && (leftPanelOpen || rightPanelOpen);

  const renderMobileView = () => {
    if (!isMobile) return null;

    switch (activeView) {
      case 'dashboard':
        return (
          <div className="flex-1 overflow-auto bg-white">
            <Dashboard />
          </div>
        );
      case 'left':
        return (
          <div className="flex-1 overflow-auto bg-white">
            <LeftPanel collapsed={false} />
          </div>
        );
      case 'main':
        return (
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/communication" element={<Communication />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/documents" element={<Documents />} />
            </Routes>
          </div>
        );
      case 'right':
        return (
          <div className="flex-1 overflow-auto bg-white">
            <RightPanel collapsed={false} />
          </div>
        );
      case 'communication':
        return (
          <div className="flex-1 overflow-auto">
            <Communication />
          </div>
        );
      case 'messages':
        return (
          <div className="flex-1 overflow-auto">
            <Messages />
          </div>
        );
      case 'documents':
        return (
          <div className="flex-1 overflow-auto">
            <Documents />
          </div>
        );
      default:
        return (
          <div className="flex-1 overflow-auto">
            <Dashboard />
          </div>
        );
    }
  };

  const getMobileTabTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Tableau de bord';
      case 'left':
        return '< Informations Principales';
      case 'main':
        return '< Détail du dossier >';
      case 'right':
        return 'Navigation / Contacts >';
      case 'communication':
        return 'Communication';
      case 'messages':
        return 'BCA Messages';
      case 'documents':
        return 'Bibliothèque';
      default:
        return 'Tableau de bord';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />

      {/* Mobile Tab Bar */}
      {isMobile && (
        <div className="bg-[#0053A0] text-white px-4 py-3 flex items-center justify-center border-b border-gray-200">
          <h2 className="text-sm font-semibold">{getMobileTabTitle()}</h2>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {!isMobile ? (
          <>
            {shouldShowMobileOverlay && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                onClick={() => {
                  setLeftPanelOpen(false);
                  setRightPanelOpen(false);
                }}
              />
            )}

            <div
              className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-30 ${getLeftPanelWidth()} ${
                screenSize === 'mobile' && leftPanelOpen ? 'fixed inset-y-0 left-0' : ''
              }`}
            >
              {screenSize !== 'mobile' && (
                <div className="flex justify-end p-2">
                  <button
                    onClick={toggleLeftPanel}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                    aria-label={leftPanelOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                  >
                    {leftPanelOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                  </button>
                </div>
              )}
              <LeftPanel collapsed={!leftPanelOpen} />
            </div>

            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/communication" element={<Communication />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/documents" element={<Documents />} />
              </Routes>
            </div>

            <div
              className={`bg-white border-l border-gray-200 transition-all duration-300 ease-in-out z-30 ${getRightPanelWidth()} ${
                screenSize === 'mobile' && rightPanelOpen ? 'fixed inset-y-0 right-0' : ''
              }`}
            >
              {screenSize !== 'mobile' && (
                <div className="flex justify-start p-2">
                  <button
                    onClick={toggleRightPanel}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                    aria-label={rightPanelOpen ? 'Collapse details' : 'Expand details'}
                  >
                    {rightPanelOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                  </button>
                </div>
              )}
              <RightPanel collapsed={!rightPanelOpen} />
            </div>
          </>
        ) : (
          renderMobileView()
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="border-t border-gray-200 bg-white">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveView('left')}
              className={`flex flex-col items-center p-3 flex-1 ${activeView === 'left' ? 'text-[#0053A0] bg-blue-50' : 'text-gray-600'}`}
            >
              <FileText size={20} />
              <span className="text-xs mt-1">Infos</span>
            </button>
            <button
              onClick={() => setActiveView('main')}
              className={`flex flex-col items-center p-3 flex-1 ${activeView === 'main' ? 'text-[#0053A0] bg-blue-50' : 'text-gray-600'}`}
            >
              <FileText size={20} />
              <span className="text-xs mt-1">Dossier</span>
            </button>
            <button
              onClick={() => setActiveView('right')}
              className={`flex flex-col items-center p-3 flex-1 ${activeView === 'right' ? 'text-[#0053A0] bg-blue-50' : 'text-gray-600'}`}
            >
              <Users size={20} />
              <span className="text-xs mt-1">Contacts</span>
            </button>
          </div>
          <div className="flex justify-around border-t border-gray-200">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex flex-col items-center p-3 flex-1 ${activeView === 'dashboard' ? 'text-[#0053A0] bg-blue-50' : 'text-gray-600'}`}
            >
              <Home size={20} />
              <span className="text-xs mt-1">Tableau de bord</span>
            </button>
            <button
              onClick={() => setActiveView('communication')}
              className={`flex flex-col items-center p-3 flex-1 ${activeView === 'communication' ? 'text-[#0053A0] bg-blue-50' : 'text-gray-600'}`}
            >
              <Laptop size={20} />
              <span className="text-xs mt-1">Communication</span>
            </button>
            <button
              onClick={() => setActiveView('messages')}
              className={`flex flex-col items-center p-3 flex-1 ${activeView === 'messages' ? 'text-[#0053A0] bg-blue-50' : 'text-gray-600'}`}
            >
              <MessageSquare size={20} />
              <span className="text-xs mt-1">BCA Messages</span>
            </button>
            <button
              onClick={() => setActiveView('documents')}
              className={`flex flex-col items-center p-3 flex-1 ${activeView === 'documents' ? 'text-[#0053A0] bg-blue-50' : 'text-gray-600'}`}
            >
              <FileText size={20} />
              <span className="text-xs mt-1">Bibliothèque</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;

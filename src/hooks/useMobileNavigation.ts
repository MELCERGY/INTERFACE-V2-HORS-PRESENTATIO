import { useState, useEffect } from 'react';

export type MobileView = 'dashboard' | 'left' | 'main' | 'right' | 'communication' | 'messages' | 'documents';

export const useMobileNavigation = () => {
  const [activeView, setActiveView] = useState<MobileView>('left');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setActiveView('left');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    activeView,
    setActiveView,
    isMobile
  };
};

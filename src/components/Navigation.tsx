
import React from 'react';
import { Button } from './ui/button';

interface NavigationProps {
  activeTab: 'เลขเด็ด' | 'สถิติ' | 'admin';
  setActiveTab: (tab: 'เลขเด็ด' | 'สถิติ' | 'admin') => void;
  isAdmin: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, isAdmin }) => {
  return (
    <nav className="bg-white shadow-md border-b-2 border-cyan-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          <Button
            onClick={() => setActiveTab('เลขเด็ด')}
            variant={activeTab === 'เลขเด็ด' ? 'default' : 'ghost'}
            className={`rounded-none border-b-4 ${
              activeTab === 'เลขเด็ด'
                ? 'bg-cyan-600 text-white border-cyan-600'
                : 'text-cyan-700 border-transparent hover:border-cyan-300 hover:bg-cyan-50'
            } px-8 py-4 font-semibold text-lg`}
          >
            🔢 เลขเด็ด
          </Button>
          <Button
            onClick={() => setActiveTab('สถิติ')}
            variant={activeTab === 'สถิติ' ? 'default' : 'ghost'}
            className={`rounded-none border-b-4 ${
              activeTab === 'สถิติ'
                ? 'bg-cyan-600 text-white border-cyan-600'
                : 'text-cyan-700 border-transparent hover:border-cyan-300 hover:bg-cyan-50'
            } px-8 py-4 font-semibold text-lg`}
          >
            📊 สถิติ
          </Button>
          {isAdmin && (
            <Button
              onClick={() => setActiveTab('admin')}
              variant={activeTab === 'admin' ? 'default' : 'ghost'}
              className={`rounded-none border-b-4 ${
                activeTab === 'admin'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'text-red-700 border-transparent hover:border-red-300 hover:bg-red-50'
              } px-8 py-4 font-semibold text-lg`}
            >
              ⚙️ จัดการระบบ
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

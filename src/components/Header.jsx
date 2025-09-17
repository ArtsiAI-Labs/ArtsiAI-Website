
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ onMenuClick }) => {
  return (
    <header className="glass-effect border-b border-white/10 p-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-white hover:bg-white/10"
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <span className="text-xl font-bold gradient-text">ArtsiAI</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

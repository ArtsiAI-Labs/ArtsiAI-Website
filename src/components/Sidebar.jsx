
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Palette,
  Coins,
  Store,
  Image,
  Users,
  User,
  HelpCircle,
  LogOut,
  X,
  Wallet
} from 'lucide-react';

const Sidebar = ({ mobile = false, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    if (onClose) onClose();
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Palette, label: 'AI Art Studio', path: '/studio' },
    { icon: Coins, label: 'NFT Minting', path: '/mint' },
    { icon: Store, label: 'Marketplace', path: '/marketplace' },
    { icon: Image, label: 'My Collection', path: '/collection' },
    { icon: Users, label: 'Community Hub', path: '/community' },
    { icon: User, label: 'Profile & Settings', path: '/profile' },
    { icon: HelpCircle, label: 'Help / Docs', path: '/help' },
  ];

  return (
    <motion.div
      initial={mobile ? { x: -300 } : { opacity: 1 }}
      animate={mobile ? { x: 0 } : { opacity: 1 }}
      className={`${mobile ? 'w-80' : 'w-72'} h-screen sidebar-gradient backdrop-blur-xl border-r border-white/10 flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">ArtsiAI</h1>
              <p className="text-xs text-gray-400">Create. Mint. Collect.</p>
            </div>
          </div>
          {mobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-white/10">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email || (user?.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : 'No email')}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">AI Credits</span>
            <span className="text-blue-400 font-bold">{user?.credits || 0}</span>
          </div>
          {user?.walletAddress && (
            <div className="flex items-center mt-2 text-xs">
              <Wallet className="h-3 w-3 text-green-400 mr-1" />
              <span className="text-green-400">Wallet Connected</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={mobile ? onClose : undefined}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/30"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </motion.div>
  );
};

export default Sidebar;

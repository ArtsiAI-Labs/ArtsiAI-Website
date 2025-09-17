
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Palette,
  Coins,
  Store,
  Image,
  TrendingUp,
  Zap,
  Wallet,
  Plus,
  ArrowRight,
  Star
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const quickActions = [
    {
      icon: Palette,
      title: 'Generate Art',
      description: 'Create AI artwork',
      path: '/studio',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Coins,
      title: 'Mint NFT',
      description: 'Turn art into NFTs',
      path: '/mint',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Store,
      title: 'Marketplace',
      description: 'Browse & trade',
      path: '/marketplace',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { label: 'AI Credits', value: user?.credits || 0, icon: Zap, color: 'text-yellow-400' },
    { label: 'NFTs Owned', value: '12', icon: Image, color: 'text-blue-400' },
    { label: 'Total Sales', value: '2.4 ETH', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Artworks Created', value: '28', icon: Star, color: 'text-purple-400' }
  ];

  const recentActivity = [
    { type: 'mint', title: 'Minted "Cyber Dreams"', time: '2 hours ago', status: 'success' },
    { type: 'sale', title: 'Sold "Digital Sunset"', time: '1 day ago', status: 'success' },
    { type: 'create', title: 'Generated "Neon City"', time: '2 days ago', status: 'success' }
  ];

  const handleConnectWallet = () => {
    toast({
      title: "Wallet Connection",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - ArtsiAI</title>
        <meta name="description" content="Your ArtsiAI dashboard - manage your AI art, NFTs, and marketplace activity." />
      </Helmet>

      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.name || 'Creator'}! 👋
              </h1>
              <p className="text-gray-300 text-lg">
                Ready to create some amazing AI art today?
              </p>
            </div>
            
            <div className="mt-6 lg:mt-0 flex flex-col sm:flex-row gap-4">
              {!user?.walletAddress && (
                <Button
                  onClick={handleConnectWallet}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
              <Button
                onClick={() => navigate('/studio')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Art
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-card rounded-xl p-6 hover-lift"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={() => navigate(action.path)}
                className="glass-card rounded-xl p-6 cursor-pointer hover-lift group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
                <p className="text-gray-400 mb-4">{action.description}</p>
                <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span className="text-sm font-medium">Get started</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Featured */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {activity.type === 'mint' && <Coins className="h-5 w-5 text-white" />}
                    {activity.type === 'sale' && <TrendingUp className="h-5 w-5 text-white" />}
                    {activity.type === 'create' && <Palette className="h-5 w-5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Featured Artwork */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Featured Artwork</h3>
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  className="w-full h-48 object-cover"
                  alt="Featured AI artwork"
                 src="https://images.unsplash.com/photo-1693252258249-5ef8b8b1a0ed" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-bold text-lg">Cyber Dreams #001</h4>
                  <p className="text-gray-300 text-sm">by CryptoArtist</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-blue-400 font-bold">2.5 ETH</span>
                    <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

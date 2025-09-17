import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Mail, Wallet, Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [authTab, setAuthTab] = useState('email');
  
  const { login, signup, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const result = await login({
        type: 'email',
        email: formData.email,
        password: formData.password
      });
      if (result.success) {
        navigate('/dashboard');
      }
    } else {
      const result = await signup(formData);
      if (result.success) {
        navigate('/dashboard');
      }
    }
  };

  const handleWalletConnect = async (walletType) => {
    const result = await login({
      type: 'wallet',
      walletType
    });
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Login' : 'Sign Up'} - ArtsiAI</title>
        <meta name="description" content={`${isLogin ? 'Login to' : 'Join'} ArtsiAI and start creating amazing AI art and NFTs.`} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="glass-card rounded-3xl p-8 neon-glow">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold gradient-text mb-2">ArtsiAI</h1>
              <p className="text-gray-400">Create. Mint. Collect.</p>
            </div>

            {/* Auth Tabs */}
            <Tabs value={authTab} onValueChange={setAuthTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5 border border-white/10">
                <TabsTrigger 
                  value="email" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </TabsTrigger>
                <TabsTrigger 
                  value="wallet"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallet
                </TabsTrigger>
              </TabsList>

              {/* Email Auth */}
              <TabsContent value="email" className="space-y-6">
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                        placeholder="Enter your name"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 pr-10"
                        placeholder="Enter your password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 neon-glow"
                  >
                    {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
                  </Button>
                </form>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                  </button>
                </div>
              </TabsContent>

              {/* Wallet Auth */}
              <TabsContent value="wallet" className="space-y-4">
                <div className="text-center mb-6">
                  <p className="text-gray-300 text-sm">
                    Connect your wallet to {isLogin ? 'login' : 'create an account'}
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => handleWalletConnect('metaMask')}
                    disabled={loading}
                    className="w-full bg-orange-500/20 border border-orange-500/30 text-white hover:bg-orange-500/30 py-3"
                  >
                    <img class="w-6 h-6 mr-3" alt="MetaMask logo" src="https://images.unsplash.com/photo-1639322537163-dd9e9a344a97" />
                    Connect with MetaMask
                  </Button>

                  <Button
                    onClick={() => handleWalletConnect('walletConnect')}
                    disabled={loading}
                    className="w-full bg-blue-500/20 border border-blue-500/30 text-white hover:bg-blue-500/30 py-3"
                  >
                    <Wallet className="w-6 h-6 mr-3" />
                    Connect with WalletConnect
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-400 mt-4">
                  First time? We'll automatically create your account after wallet connection.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AuthPage;
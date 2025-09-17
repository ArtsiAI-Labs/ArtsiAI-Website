import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const logout = () => {
    if (isConnected) {
      disconnect();
    }
    setUser(null);
    localStorage.removeItem('artsi_user');
    toast({
      title: "Logged Out",
      description: "See you next time!",
    });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('artsi_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (isConnected && parsedUser.walletAddress === address) {
        setUser(parsedUser);
      } else if (!isConnected && parsedUser.type === 'email') {
        setUser(parsedUser);
      } else if (isConnected && parsedUser.walletAddress !== address) {
        logout();
      } else if (!isConnected && parsedUser.type === 'wallet') {
        logout();
      }
    }
    setLoading(false);
  }, [isConnected, address]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      
      if (credentials.type === 'email') {
        const mockUser = {
          id: Date.now().toString(),
          email: credentials.email,
          name: credentials.email.split('@')[0],
          type: 'email',
          credits: 100,
          walletAddress: null
        };
        
        setUser(mockUser);
        localStorage.setItem('artsi_user', JSON.stringify(mockUser));
        
        toast({
          title: "Welcome back!",
          description: "Successfully logged in with email.",
        });
        
        return { success: true };
      } else if (credentials.type === 'wallet') {
        const targetConnector = connectors.find(c => c.id === credentials.walletType);
        if (!targetConnector) {
          throw new Error(`Connector ${credentials.walletType} not found.`);
        }
        
        const { accounts } = await connectAsync({ connector: targetConnector });
        const connectedAddress = accounts[0];

        const message = `Welcome to ArtsiAI! Sign this message to log in. Nonce: ${Date.now()}`;
        await signMessageAsync({ message });
        
        const mockUser = {
          id: Date.now().toString(),
          walletAddress: connectedAddress,
          name: `User_${connectedAddress.slice(-6)}`,
          type: 'wallet',
          credits: 100,
          email: null
        };
        
        setUser(mockUser);
        localStorage.setItem('artsi_user', JSON.stringify(mockUser));
        
        toast({
          title: "Wallet Connected!",
          description: `Connected to ${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`,
        });
        
        return { success: true };
      }
    } catch (error) {
      console.error("Login Failed:", error);
      toast({
        title: "Login Failed",
        description: error.shortMessage || "The request was rejected or failed. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      
      const mockUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        type: 'email',
        credits: 100,
        walletAddress: null
      };
      
      setUser(mockUser);
      localStorage.setItem('artsi_user', JSON.stringify(mockUser));
      
      toast({
        title: "Account Created!",
        description: "Welcome to ArtsiAI! You've received 100 free credits.",
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Please try again.",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    if (!user || user.type !== 'email') {
      toast({ title: "Action not allowed", description: "This is for linking a wallet to an email account."});
      return { success: false };
    }
    
    try {
      const targetConnector = connectors.find(c => c.id === 'metaMask');
      const { accounts } = await connectAsync({ connector: targetConnector });
      const connectedAddress = accounts[0];

      const updatedUser = {
        ...user,
        walletAddress: connectedAddress,
      };
      
      setUser(updatedUser);
      localStorage.setItem('artsi_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Wallet Linked!",
        description: `Linked ${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)} to your account.`,
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error.shortMessage || "The request was rejected or failed. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    connectWallet,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
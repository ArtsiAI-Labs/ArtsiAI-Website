
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Wallet, Bell, Save, Edit, Upload, Link, Unlink } from 'lucide-react';

const Profile = () => {
  const { user, connectWallet } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    bio: user?.bio || 'AI artist and NFT enthusiast.',
    email: user?.email || ''
  });

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Saved",
      description: "Your profile information has been updated.",
    });
    setIsEditing(false);
  };

  const handleLinkEmail = () => {
    toast({
      title: "Link Email",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleUnlinkWallet = () => {
    toast({
      title: "Unlink Wallet",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Profile & Settings - ArtsiAI</title>
        <meta name="description" content="Manage your ArtsiAI profile, link accounts, and adjust your settings." />
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <User className="h-8 w-8 mr-3 text-purple-400" />
            Profile & Settings
          </h1>
          <p className="text-gray-300">Manage your account and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                  onClick={() => toast({ title: "Upload Picture", description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
              <p className="text-gray-400 mt-2">{profileData.bio}</p>
            </div>
          </motion.div>

          {/* Settings Panels */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Account Information */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Account Information</h3>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className={isEditing ? "bg-blue-500 hover:bg-blue-600" : "border-white/20 text-white hover:bg-white/10"}
                >
                  {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Username</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-white/5 border-white/20 text-white disabled:opacity-70"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-white">Bio</Label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full h-20 bg-white/5 border border-white/20 rounded-lg p-3 text-white disabled:opacity-70 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Linked Accounts */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Linked Accounts</h3>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-sm text-gray-400">{user?.email || 'Not linked'}</p>
                    </div>
                  </div>
                  {user?.email ? (
                    <Button variant="destructive" size="sm" disabled>
                      <Unlink className="h-4 w-4 mr-1" />
                      Unlink
                    </Button>
                  ) : (
                    <Button onClick={handleLinkEmail} size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <Link className="h-4 w-4 mr-1" />
                      Link
                    </Button>
                  )}
                </div>

                {/* Wallet */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center">
                    <Wallet className="h-5 w-5 mr-3 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Wallet</p>
                      <p className="text-sm text-gray-400">
                        {user?.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : 'Not linked'}
                      </p>
                    </div>
                  </div>
                  {user?.walletAddress ? (
                    <Button onClick={handleUnlinkWallet} variant="destructive" size="sm">
                      <Unlink className="h-4 w-4 mr-1" />
                      Unlink
                    </Button>
                  ) : (
                    <Button onClick={connectWallet} size="sm" className="bg-green-500 hover:bg-green-600">
                      <Link className="h-4 w-4 mr-1" />
                      Link
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="nft-sales" className="text-white">NFT Sales</Label>
                  <input type="checkbox" id="nft-sales" className="toggle-switch" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-followers" className="text-white">New Followers</Label>
                  <input type="checkbox" id="new-followers" className="toggle-switch" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="platform-updates" className="text-white">Platform Updates</Label>
                  <input type="checkbox" id="platform-updates" className="toggle-switch" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;

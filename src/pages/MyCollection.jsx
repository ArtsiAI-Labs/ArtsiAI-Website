
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Image as ImageIcon, Plus, DollarSign, Eye, Edit, Trash2, Share, Download, Bitcoin as Ethereum, TrendingUp } from 'lucide-react';

const MyCollection = () => {
  const [selectedTab, setSelectedTab] = useState('owned');
  const { user } = useAuth();
  const { toast } = useToast();

  const tabs = [
    { id: 'owned', label: 'Owned NFTs', count: 12 },
    { id: 'created', label: 'Created', count: 8 },
    { id: 'listed', label: 'Listed for Sale', count: 3 }
  ];

  const mockOwnedNFTs = [
    {
      id: 1,
      title: 'Cyber Dreams #001',
      image: 'https://picsum.photos/300/300?random=1',
      price: '2.5',
      lastSale: '2.1',
      status: 'owned',
      creator: 'CryptoArtist'
    },
    {
      id: 2,
      title: 'Digital Sunset',
      image: 'https://picsum.photos/300/300?random=2',
      price: '1.8',
      lastSale: '1.5',
      status: 'listed',
      creator: 'AICreator'
    },
    {
      id: 3,
      title: 'Neon City',
      image: 'https://picsum.photos/300/300?random=3',
      price: '3.2',
      lastSale: '2.8',
      status: 'owned',
      creator: 'FutureVision'
    }
  ];

  const mockCreatedNFTs = [
    {
      id: 4,
      title: 'My AI Portrait',
      image: 'https://picsum.photos/300/300?random=4',
      price: '0.9',
      sales: 2,
      status: 'sold',
      earnings: '1.8'
    },
    {
      id: 5,
      title: 'Abstract Flow',
      image: 'https://picsum.photos/300/300?random=5',
      price: '1.5',
      sales: 0,
      status: 'listed',
      earnings: '0'
    }
  ];

  const handleListForSale = (nft) => {
    toast({
      title: "List for Sale",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleRemoveListing = (nft) => {
    toast({
      title: "Remove Listing",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleShare = (nft) => {
    toast({
      title: "Share NFT",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleDownload = (nft) => {
    toast({
      title: "Download",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const renderNFTCard = (nft, isCreated = false) => (
    <motion.div
      key={nft.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-xl overflow-hidden hover-lift group"
    >
      <div className="relative">
        <img
          src={nft.image}
          alt={nft.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
            nft.status === 'listed' ? 'bg-green-500/80 text-white' :
            nft.status === 'sold' ? 'bg-blue-500/80 text-white' :
            'bg-gray-500/80 text-white'
          }`}>
            {nft.status === 'listed' ? 'For Sale' : 
             nft.status === 'sold' ? 'Sold' : 'Owned'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex space-x-2">
            <button
              onClick={() => handleShare(nft)}
              className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <Share className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={() => handleDownload(nft)}
              className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <Download className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2">{nft.title}</h3>
        
        {isCreated && (
          <p className="text-sm text-gray-400 mb-3">Created by you</p>
        )}
        
        {!isCreated && nft.creator && (
          <p className="text-sm text-blue-400 mb-3">by {nft.creator}</p>
        )}

        <div className="space-y-3">
          {/* Price Info */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Current Value</p>
              <div className="flex items-center text-white font-bold">
                <Ethereum className="h-4 w-4 mr-1" />
                {nft.price}
              </div>
            </div>
            
            {!isCreated && (
              <div className="text-right">
                <p className="text-xs text-gray-400">Last Sale</p>
                <div className="flex items-center text-gray-300">
                  <Ethereum className="h-3 w-3 mr-1" />
                  {nft.lastSale}
                </div>
              </div>
            )}
            
            {isCreated && (
              <div className="text-right">
                <p className="text-xs text-gray-400">Total Earnings</p>
                <div className="flex items-center text-green-400 font-bold">
                  <Ethereum className="h-3 w-3 mr-1" />
                  {nft.earnings}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            {nft.status === 'owned' && (
              <Button
                onClick={() => handleListForSale(nft)}
                size="sm"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                <DollarSign className="h-4 w-4 mr-1" />
                List for Sale
              </Button>
            )}
            
            {nft.status === 'listed' && (
              <Button
                onClick={() => handleRemoveListing(nft)}
                size="sm"
                variant="outline"
                className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                Remove Listing
              </Button>
            )}
            
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>My Collection - ArtsiAI</title>
        <meta name="description" content="Manage your NFT collection, view owned artworks, and track your created pieces on ArtsiAI." />
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <ImageIcon className="h-8 w-8 mr-3 text-purple-400" />
              My Collection
            </h1>
            <p className="text-gray-300">Manage your NFTs and track your digital art portfolio</p>
          </div>
          
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <div className="glass-card rounded-xl p-4">
              <div className="text-center">
                <div className="flex items-center justify-center text-white font-bold mb-1">
                  <Ethereum className="h-5 w-5 mr-1" />
                  12.4
                </div>
                <p className="text-xs text-gray-400">Portfolio Value</p>
              </div>
            </div>
            
            <Button
              onClick={() => toast({ title: "Create New", description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <ImageIcon className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">12</span>
            </div>
            <p className="text-gray-400 text-sm">NFTs Owned</p>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Plus className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-white">8</span>
            </div>
            <p className="text-gray-400 text-sm">Created</p>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">5</span>
            </div>
            <p className="text-gray-400 text-sm">Total Sales</p>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Ethereum className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">4.2</span>
            </div>
            <p className="text-gray-400 text-sm">Total Earnings</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex flex-wrap gap-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedTab === 'owned' && mockOwnedNFTs.map(nft => renderNFTCard(nft))}
            {selectedTab === 'created' && mockCreatedNFTs.map(nft => renderNFTCard(nft, true))}
            {selectedTab === 'listed' && mockOwnedNFTs
              .filter(nft => nft.status === 'listed')
              .map(nft => renderNFTCard(nft))}
          </div>

          {/* Empty State */}
          {((selectedTab === 'owned' && mockOwnedNFTs.length === 0) ||
            (selectedTab === 'created' && mockCreatedNFTs.length === 0) ||
            (selectedTab === 'listed' && mockOwnedNFTs.filter(nft => nft.status === 'listed').length === 0)) && (
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No NFTs Found</h3>
              <p className="text-gray-400 mb-6">
                {selectedTab === 'owned' && "You don't own any NFTs yet. Start by purchasing from the marketplace."}
                {selectedTab === 'created' && "You haven't created any NFTs yet. Visit the AI Art Studio to get started."}
                {selectedTab === 'listed' && "You don't have any NFTs listed for sale."}
              </p>
              <Button
                onClick={() => toast({ title: "Get Started", description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                {selectedTab === 'owned' && 'Browse Marketplace'}
                {selectedTab === 'created' && 'Create Artwork'}
                {selectedTab === 'listed' && 'List an NFT'}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default MyCollection;

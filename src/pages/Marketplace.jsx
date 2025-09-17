
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Store, Search, Filter, TrendingUp, Clock, DollarSign, Heart, Eye, Bitcoin as Ethereum, Grid3X3, List } from 'lucide-react';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('trending');
  const [viewMode, setViewMode] = useState('grid');
  const { toast } = useToast();

  const filters = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'new', label: 'New', icon: Clock },
    { id: 'price-low', label: 'Price: Low to High', icon: DollarSign },
    { id: 'price-high', label: 'Price: High to Low', icon: DollarSign }
  ];

  const categories = ['All', 'AI Art', 'Cyberpunk', 'Abstract', 'Fantasy', 'Portraits'];

  const mockNFTs = [
    {
      id: 1,
      title: 'Cyber Dreams #001',
      artist: 'CryptoArtist',
      price: '2.5',
      image: 'https://picsum.photos/400/400?random=1',
      likes: 234,
      views: 1520,
      category: 'Cyberpunk'
    },
    {
      id: 2,
      title: 'Digital Sunset',
      artist: 'AICreator',
      price: '1.8',
      image: 'https://picsum.photos/400/400?random=2',
      likes: 156,
      views: 890,
      category: 'Abstract'
    },
    {
      id: 3,
      title: 'Neon City',
      artist: 'FutureVision',
      price: '3.2',
      image: 'https://picsum.photos/400/400?random=3',
      likes: 342,
      views: 2100,
      category: 'Cyberpunk'
    },
    {
      id: 4,
      title: 'AI Portrait #42',
      artist: 'DigitalMind',
      price: '0.9',
      image: 'https://picsum.photos/400/400?random=4',
      likes: 89,
      views: 456,
      category: 'Portraits'
    },
    {
      id: 5,
      title: 'Fantasy Realm',
      artist: 'MysticAI',
      price: '4.1',
      image: 'https://picsum.photos/400/400?random=5',
      likes: 567,
      views: 3200,
      category: 'Fantasy'
    },
    {
      id: 6,
      title: 'Abstract Flow',
      artist: 'ModernArt',
      price: '1.5',
      image: 'https://picsum.photos/400/400?random=6',
      likes: 123,
      views: 678,
      category: 'Abstract'
    }
  ];

  const handleBuyNFT = (nft) => {
    toast({
      title: "Purchase NFT",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleLikeNFT = (nftId) => {
    toast({
      title: "Like NFT",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleViewArtist = (artist) => {
    toast({
      title: "View Artist Profile",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Marketplace - ArtsiAI</title>
        <meta name="description" content="Discover and trade unique AI-generated NFTs on the ArtsiAI marketplace. Buy, sell, and collect digital art." />
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
              <Store className="h-8 w-8 mr-3 text-green-400" />
              Marketplace
            </h1>
            <p className="text-gray-300">Discover and trade unique AI-generated NFTs</p>
          </div>
          
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <div className="glass-card rounded-xl p-3">
              <div className="flex items-center space-x-2">
                <Ethereum className="h-5 w-5 text-blue-400" />
                <span className="text-white font-bold">ETH 1,234.56</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="border-white/20"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="border-white/20"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search NFTs, artists, or collections..."
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
              >
                {filters.map((filter) => (
                  <option key={filter.id} value={filter.id} className="bg-gray-800">
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* NFT Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
        >
          {mockNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`glass-card rounded-xl overflow-hidden hover-lift group ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'w-full h-64'}`}>
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    onClick={() => handleBuyNFT(nft)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Ethereum className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-black/60 rounded-lg px-2 py-1">
                  <span className="text-white text-xs font-medium">{nft.category}</span>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => handleLikeNFT(nft.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <Heart className="h-4 w-4 text-white" />
                </button>
              </div>

              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{nft.title}</h3>
                    <button
                      onClick={() => handleViewArtist(nft.artist)}
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      by {nft.artist}
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-white font-bold">
                      <Ethereum className="h-4 w-4 mr-1" />
                      {nft.price}
                    </div>
                    <div className="text-xs text-gray-400">~$3,456</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{nft.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{nft.views}</span>
                    </div>
                  </div>
                  
                  {viewMode === 'list' && (
                    <Button
                      onClick={() => handleBuyNFT(nft)}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Ethereum className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
            onClick={() => toast({ title: "Load More", description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
          >
            Load More NFTs
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default Marketplace;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Coins, Upload, Bitcoin as Ethereum, Wallet, CheckCircle, AlertCircle, Image as ImageIcon, Tag, FileText } from 'lucide-react';

const NFTMinting = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    tags: '',
    royalty: '5'
  });
  const [isMinting, setIsMinting] = useState(false);
  const [mintingStep, setMintingStep] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const mintingSteps = [
    'Uploading to IPFS',
    'Creating metadata',
    'Deploying contract',
    'Minting NFT',
    'Complete!'
  ];

  const mockArtworks = [
    { id: 1, url: 'https://picsum.photos/300/300?random=1', title: 'Cyber Dreams', prompt: 'Futuristic cityscape with neon lights' },
    { id: 2, url: 'https://picsum.photos/300/300?random=2', title: 'Digital Sunset', prompt: 'Abstract digital art with warm colors' },
    { id: 3, url: 'https://picsum.photos/300/300?random=3', title: 'Neon City', prompt: 'Cyberpunk street scene at night' },
    { id: 4, url: 'https://picsum.photos/300/300?random=4', title: 'AI Portrait', prompt: 'Futuristic AI-generated portrait' }
  ];

  const handleImageSelect = (artwork) => {
    setSelectedImage(artwork);
    setMetadata(prev => ({
      ...prev,
      title: artwork.title,
      description: artwork.prompt
    }));
  };

  const handleMetadataChange = (field, value) => {
    setMetadata(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMint = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select an artwork to mint as NFT.",
        variant: "destructive",
      });
      return;
    }

    if (!metadata.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your NFT.",
        variant: "destructive",
      });
      return;
    }

    if (!user?.walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to mint NFTs.",
        variant: "destructive",
      });
      return;
    }

    setIsMinting(true);
    setMintingStep(0);

    // Simulate minting process
    for (let i = 0; i < mintingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMintingStep(i);
    }

    setTimeout(() => {
      setIsMinting(false);
      setMintingStep(0);
      toast({
        title: "NFT Minted Successfully!",
        description: "Your artwork has been minted as an NFT on Ethereum.",
      });
    }, 1000);
  };

  const handleUploadImage = () => {
    toast({
      title: "Image Upload",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>NFT Minting - ArtsiAI</title>
        <meta name="description" content="Mint your AI artwork as NFTs on the Ethereum blockchain. Add metadata and deploy to the marketplace." />
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
              <Coins className="h-8 w-8 mr-3 text-yellow-400" />
              NFT Minting
            </h1>
            <p className="text-gray-300">Turn your AI artwork into valuable NFTs on Ethereum</p>
          </div>
          
          <div className="mt-4 lg:mt-0 glass-card rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <Ethereum className="h-5 w-5 text-blue-400" />
              <span className="text-white font-bold">Ethereum Mainnet</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Gas fee: ~0.01 ETH</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <ImageIcon className="h-6 w-6 mr-2" />
                Select Artwork
              </h2>

              {/* Upload Option */}
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center mb-6">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-300 mb-3">Upload your own artwork</p>
                <Button
                  onClick={handleUploadImage}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Choose File
                </Button>
              </div>

              {/* Generated Artworks */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Your Generated Artworks</h3>
                <div className="grid grid-cols-2 gap-4">
                  {mockArtworks.map((artwork) => (
                    <motion.div
                      key={artwork.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleImageSelect(artwork)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage?.id === artwork.id
                          ? 'border-blue-500 ring-2 ring-blue-500/50'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <img
                        src={artwork.url}
                        alt={artwork.title}
                        className="w-full h-32 object-cover"
                      />
                      {selectedImage?.id === artwork.id && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                          <CheckCircle className="h-8 w-8 text-blue-400" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                        <p className="text-white text-xs font-medium truncate">{artwork.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Metadata & Minting */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Preview */}
            {selectedImage && (
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Preview</h3>
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 rounded-lg px-2 py-1">
                    <span className="text-white text-xs font-medium">NFT</span>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata Form */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <FileText className="h-6 w-6 mr-2" />
                NFT Metadata
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-white">Title *</Label>
                  <Input
                    id="title"
                    value={metadata.title}
                    onChange={(e) => handleMetadataChange('title', e.target.value)}
                    placeholder="Enter NFT title"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <textarea
                    id="description"
                    value={metadata.description}
                    onChange={(e) => handleMetadataChange('description', e.target.value)}
                    placeholder="Describe your NFT..."
                    className="w-full h-20 bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder:text-gray-400 focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="tags" className="text-white">Tags</Label>
                  <Input
                    id="tags"
                    value={metadata.tags}
                    onChange={(e) => handleMetadataChange('tags', e.target.value)}
                    placeholder="ai, art, digital, cyberpunk"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="royalty" className="text-white">Royalty (%)</Label>
                  <Input
                    id="royalty"
                    type="number"
                    min="0"
                    max="10"
                    value={metadata.royalty}
                    onChange={(e) => handleMetadataChange('royalty', e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Percentage you'll earn from future sales</p>
                </div>
              </div>
            </div>

            {/* Wallet Status */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Wallet className="h-5 w-5 mr-2" />
                Wallet Status
              </h3>
              
              {user?.walletAddress ? (
                <div className="flex items-center space-x-3 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-green-400 font-medium">Wallet Connected</p>
                    <p className="text-xs text-gray-300">
                      {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="text-orange-400 font-medium">Wallet Required</p>
                    <p className="text-xs text-gray-300">Connect wallet to mint NFTs</p>
                  </div>
                </div>
              )}
            </div>

            {/* Mint Button */}
            <Button
              onClick={handleMint}
              disabled={isMinting || !selectedImage || !user?.walletAddress}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-4 text-lg"
            >
              {isMinting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  {mintingSteps[mintingStep]}
                </div>
              ) : (
                <>
                  <Coins className="h-5 w-5 mr-2" />
                  Mint NFT (~0.01 ETH)
                </>
              )}
            </Button>

            {isMinting && (
              <div className="glass-card rounded-xl p-4">
                <div className="space-y-2">
                  {mintingSteps.map((step, index) => (
                    <div
                      key={step}
                      className={`flex items-center space-x-3 ${
                        index <= mintingStep ? 'text-green-400' : 'text-gray-500'
                      }`}
                    >
                      {index < mintingStep ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : index === mintingStep ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-current"></div>
                      )}
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NFTMinting;

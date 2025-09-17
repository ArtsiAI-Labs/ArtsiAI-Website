
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Users,
  Heart,
  MessageCircle,
  Share,
  Trophy,
  Star,
  TrendingUp,
  Clock,
  Award,
  Eye
} from 'lucide-react';

const CommunityHub = () => {
  const [selectedTab, setSelectedTab] = useState('gallery');
  const { toast } = useToast();

  const tabs = [
    { id: 'gallery', label: 'Showcase Gallery' },
    { id: 'challenges', label: 'Challenges & Contests' },
    { id: 'discussions' },
  ];

  const galleryFilters = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'newest', label: 'Newest', icon: Clock },
    { id: 'most-liked', label: 'Most Liked', icon: Star }
  ];

  const mockArtworks = [
    {
      id: 1,
      title: 'Galactic Voyager',
      artist: 'StellarArt',
      image: 'https://picsum.photos/400/500?random=7',
      likes: 1200,
      comments: 89,
      views: 15000
    },
    {
      id: 2,
      title: 'Quantum Bloom',
      artist: 'AI_Alchemist',
      image: 'https://picsum.photos/400/500?random=8',
      likes: 980,
      comments: 65,
      views: 12300
    },
    {
      id: 3,
      title: 'Dream Weaver',
      artist: 'LucidCreator',
      image: 'https://picsum.photos/400/500?random=9',
      likes: 850,
      comments: 42,
      views: 9800
    },
    {
      id: 4,
      title: 'Chrome Jungle',
      artist: 'CyberPunkAI',
      image: 'https://picsum.photos/400/500?random=10',
      likes: 760,
      comments: 33,
      views: 8100
    }
  ];

  const mockChallenges = [
    {
      id: 1,
      title: 'Cyberpunk Cityscapes',
      description: 'Create a breathtaking cyberpunk city. The more neon, the better!',
      prize: '5000 Credits + Featured Artist',
      endsIn: '3 days',
      participants: 124,
      status: 'active'
    },
    {
      id: 2,
      title: 'Mythical Creatures',
      description: 'Bring a creature from mythology to life with AI.',
      prize: '2500 Credits',
      endsIn: '10 days',
      participants: 88,
      status: 'active'
    },
    {
      id: 3,
      title: 'Abstract Emotions',
      description: 'Visualize an emotion (e.g., joy, melancholy) in an abstract form.',
      prize: 'Winner: "Cosmic Serenity"',
      endsIn: 'Ended',
      participants: 210,
      status: 'ended'
    }
  ];

  const handleAction = (action, item) => {
    toast({
      title: `${action} Clicked`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Community Hub - ArtsiAI</title>
        <meta name="description" content="Join the ArtsiAI community. Showcase your art, participate in challenges, and connect with other creators." />
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
              <Users className="h-8 w-8 mr-3 text-blue-400" />
              Community Hub
            </h1>
            <p className="text-gray-300">Showcase art, join challenges, and connect with creators</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
                {tab.label}
              </button>
            ))}
          </div>

          {/* Gallery Content */}
          {selectedTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {galleryFilters.map(filter => (
                  <Button key={filter.id} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <filter.icon className="h-4 w-4 mr-2" />
                    {filter.label}
                  </Button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockArtworks.map((art, index) => (
                  <motion.div
                    key={art.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-xl overflow-hidden hover-lift group"
                  >
                    <div className="relative">
                      <img src={art.image} alt={art.title} className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold text-white truncate">{art.title}</h3>
                        <p className="text-sm text-blue-400">by {art.artist}</p>
                      </div>
                    </div>
                    <div className="p-4 flex justify-between items-center bg-white/5">
                      <div className="flex items-center space-x-4 text-gray-300">
                        <button onClick={() => handleAction('Like', art)} className="flex items-center space-x-1 hover:text-pink-400 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-xs">{art.likes}</span>
                        </button>
                        <button onClick={() => handleAction('Comment', art)} className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-xs">{art.comments}</span>
                        </button>
                      </div>
                      <button onClick={() => handleAction('Share', art)} className="hover:text-white transition-colors text-gray-300">
                        <Share className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges Content */}
          {selectedTab === 'challenges' && (
            <div className="space-y-6">
              {mockChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 flex flex-col md:flex-row items-start gap-6"
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${challenge.status === 'active' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-600'}`}>
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                        <p className="text-gray-300 mb-4">{challenge.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${challenge.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {challenge.status === 'active' ? 'Active' : 'Ended'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-400" />
                        <span>Prize: {challenge.prize}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Ends in: {challenge.endsIn}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{challenge.participants} Participants</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAction('View Challenge', challenge)}
                    className="mt-4 md:mt-0 bg-white/10 text-white hover:bg-white/20"
                  >
                    {challenge.status === 'active' ? 'Join Challenge' : 'View Results'}
                  </Button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Discussions Content */}
          {selectedTab === 'discussions' && (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Discussions Coming Soon</h3>
              <p className="text-gray-400">
                A place to chat with fellow artists, share tips, and discuss the future of AI art.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default CommunityHub;

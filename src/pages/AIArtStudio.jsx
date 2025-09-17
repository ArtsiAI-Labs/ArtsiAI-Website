import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { generateImage } from '@/api/openai';
import { Palette, Wand2, Upload, Download, Sparkles, Settings, Image as ImageIcon, Zap, Coins } from 'lucide-react';

const AIArtStudio = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('cyberpunk');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const styles = [
    { id: 'cyberpunk', name: 'Cyberpunk', preview: 'Neon-lit futuristic cityscape' },
    { id: 'anime', name: 'Anime', preview: 'Japanese animation style artwork' },
    { id: 'photorealistic', name: 'Photorealistic', preview: 'Ultra-realistic digital photography' },
    { id: 'abstract', name: 'Abstract', preview: 'Modern abstract digital art' },
    { id: 'fantasy', name: 'Fantasy', preview: 'Magical fantasy world artwork' },
    { id: 'minimalist', name: 'Minimalist', preview: 'Clean and simple design' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for your artwork.",
        variant: "destructive",
      });
      return;
    }

    if (user?.credits < 10) {
      toast({
        title: "Insufficient Credits",
        description: "You need at least 10 credits to generate artwork.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const imageUrl = await generateImage(prompt, selectedStyle);

      const newImage = {
        id: Date.now(),
        prompt,
        style: selectedStyle,
        url: imageUrl,
        timestamp: new Date().toISOString()
      };
      
      setGeneratedImages(prev => [newImage, ...prev]);
      
      toast({
        title: "Artwork Generated!",
        description: "Your AI artwork has been created successfully.",
      });

    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = () => {
    toast({
      title: "Image Upload",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleDownload = (imageUrl, prompt) => {
    toast({
      title: 'Initiating Download',
      description: 'Your image will begin downloading shortly.'
    });

    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        const safeFilename = prompt.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        a.download = `artsi_${safeFilename}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
      })
      .catch(() => {
        toast({
          title: 'Download Failed',
          description: 'Could not download the image. Please try again.',
          variant: 'destructive',
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>AI Art Studio - ArtsiAI</title>
        <meta name="description" content="Create stunning AI artwork with advanced AI models. Generate, customize, and download your digital art." />
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
              <Palette className="h-8 w-8 mr-3 text-purple-400" />
              AI Art Studio
            </h1>
            <p className="text-gray-300">Create stunning artwork with advanced AI models</p>
          </div>
          
          <div className="mt-4 lg:mt-0 glass-card rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-bold">{user?.credits || 0} Credits</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">10 credits per generation</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generation Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Create Artwork</h2>
              
              <Tabs defaultValue="text-to-image" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5 border border-white/10">
                  <TabsTrigger value="text-to-image">Text to Image</TabsTrigger>
                  <TabsTrigger value="image-to-image">Image to Image</TabsTrigger>
                </TabsList>

                <TabsContent value="text-to-image" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt" className="text-white">Describe your artwork</Label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="A futuristic cityscape with neon lights and flying cars..."
                      className="w-full h-24 bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder:text-gray-400 focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Style Preset</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {styles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            selectedStyle === style.id
                              ? 'border-blue-500 bg-blue-500/20 text-white'
                              : 'border-white/20 bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="font-medium text-sm">{style.name}</div>
                          <div className="text-xs opacity-70">{style.preview}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generate Artwork
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="image-to-image" className="space-y-4">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-4">Upload an image to transform</p>
                    <Button
                      onClick={handleImageUpload}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Choose Image
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Advanced Settings */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Advanced Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-white text-sm">Quality</Label>
                  <select className="w-full mt-1 bg-white/5 border border-white/20 rounded-lg p-2 text-white">
                    <option value="standard">Standard</option>
                    <option value="high">High Quality (+5 credits)</option>
                    <option value="ultra">Ultra HD (+10 credits)</option>
                  </select>
                </div>
                
                <div>
                  <Label className="text-white text-sm">Aspect Ratio</Label>
                  <select className="w-full mt-1 bg-white/5 border border-white/20 rounded-lg p-2 text-white">
                    <option value="1:1">Square (1:1)</option>
                    <option value="16:9">Landscape (16:9)</option>
                    <option value="9:16">Portrait (9:16)</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <ImageIcon className="h-6 w-6 mr-2" />
                Generated Artwork
              </h2>

              {isGenerating && generatedImages.length === 0 && (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/20 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-300">Creating your masterpiece...</p>
                    <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
                  </div>
                </div>
              )}

              {!isGenerating && generatedImages.length === 0 && (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/20 rounded-lg">
                  <div className="text-center">
                    <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300">Your generated artwork will appear here</p>
                    <p className="text-sm text-gray-400 mt-2">Enter a prompt and click generate to start creating</p>
                  </div>
                </div>
              )}

              <div className={`grid md:grid-cols-2 gap-6 ${isGenerating ? 'opacity-50' : ''}`}>
                {isGenerating && generatedImages.length > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 rounded-xl">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                        <p className="text-white">Generating next image...</p>
                      </div>
                  </div>
                )}
                {generatedImages.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative"
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <img class="w-full h-64 object-cover" alt={image.prompt} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleDownload(image.url, image.prompt)}
                          className="bg-white/20 hover:bg-white/30 text-white"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => toast({ title: "Mint NFT", description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                          className="bg-blue-500/80 hover:bg-blue-500 text-white"
                        >
                          <Coins className="h-4 w-4 mr-1" />
                          Mint NFT
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-white font-medium text-sm truncate">{image.prompt}</p>
                      <p className="text-gray-400 text-xs">Style: {image.style}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AIArtStudio;
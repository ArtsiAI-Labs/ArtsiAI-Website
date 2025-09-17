
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { HelpCircle, ChevronDown, Search, FileText, LifeBuoy, MessageSquare } from 'lucide-react';

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="text-lg font-medium text-white">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pb-4 text-gray-300">{children}</div>
      </motion.div>
    </div>
  );
};

const Help = () => {
  const { toast } = useToast();

  const faqs = [
    {
      q: 'What is ArtsiAI?',
      a: 'ArtsiAI is a platform that allows you to generate unique artwork using artificial intelligence, mint them as NFTs on the Ethereum blockchain, and trade them in our marketplace.'
    },
    {
      q: 'How do I get AI credits?',
      a: 'You receive free credits upon signing up. You can purchase more credits using ETH or our upcoming Artsi token. Credits are used for generating artwork in the AI Art Studio.'
    },
    {
      q: 'What is NFT minting?',
      a: 'Minting is the process of turning your digital artwork into a unique, verifiable asset on the blockchain. This makes it a non-fungible token (NFT) that you can own, sell, or trade.'
    },
    {
      q: 'Which blockchain does ArtsiAI use?',
      a: 'We currently support the Ethereum mainnet and various testnets for minting and trading NFTs. We plan to expand to other blockchains in the future.'
    },
    {
      q: 'How do I connect my wallet?',
      a: 'You can connect your wallet on the login page or in your profile settings. We support MetaMask and WalletConnect, allowing you to use a wide range of popular crypto wallets.'
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Our support team will get back to you shortly.",
    });
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>Help & Documentation - ArtsiAI</title>
        <meta name="description" content="Find answers to your questions, read our guides, and get support for ArtsiAI." />
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <HelpCircle className="h-16 w-16 mx-auto mb-4 text-blue-400" />
          <h1 className="text-4xl font-bold text-white mb-2">How can we help?</h1>
          <p className="text-gray-300 text-lg">Find answers, guides, and support.</p>
          
          <div className="relative max-w-2xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help..."
              className="pl-12 py-3 text-lg bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} title={faq.q}>
                    <p>{faq.a}</p>
                  </AccordionItem>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Support & Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Quick Links */}
            <div className="glass-card rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                  <FileText className="h-4 w-4 mr-3" />
                  Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                  <LifeBuoy className="h-4 w-4 mr-3" />
                  Community Support
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Contact Support</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
                <textarea
                  placeholder="Your Message"
                  required
                  className="w-full h-24 bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder:text-gray-400 resize-none"
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Help;

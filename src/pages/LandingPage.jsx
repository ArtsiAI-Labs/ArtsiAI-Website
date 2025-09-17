import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Palette, Coins, Store, Users, ArrowRight, ArrowLeft, Github, Twitter, MessageCircle, Sparkles, Server, Vote, Gift, Menu, X, Zap, ShieldCheck, Heart, Cpu, Layers, BookOpen, Send, Rss, Calendar, Code } from 'lucide-react';
const Carousel = ({
  items
}) => {
  const [index, setIndex] = useState(0);
  const handleNext = () => {
    setIndex(prev => (prev + 1) % items.length);
  };
  const handlePrev = () => {
    setIndex(prev => (prev - 1 + items.length) % items.length);
  };
  const getStyle = itemIndex => {
    const offset = itemIndex - index;
    const absOffset = Math.abs(offset);
    let transform = `translateX(${offset * 30}%) scale(${1 - absOffset * 0.2}) rotateY(${offset * -15}deg)`;
    let zIndex = items.length - absOffset;
    let opacity = absOffset > 2 ? 0 : 1;
    if (absOffset > (items.length - 1) / 2) {
      transform = `translateX(${offset > 0 ? (items.length + offset) * 30 : (offset + items.length) * 30}%) scale(0.6) rotateY(${offset > 0 ? (items.length + offset) * -15 : (offset + items.length) * -15}deg)`;
    }
    return {
      transform,
      zIndex,
      opacity
    };
  };
  return <div className="relative w-full h-[400px] flex items-center justify-center">
      <div className="relative w-[300px] h-[360px] carousel-container">
        {items.map((item, i) => <motion.div key={item.id} className="carousel-item" style={{
        width: '100%',
        height: '100%',
        position: 'absolute'
      }} animate={getStyle(i)} transition={{
        type: 'spring',
        stiffness: 200,
        damping: 25
      }}>
            <div className="w-full h-full p-2 bg-white/10 rounded-3xl border-2 border-white/20 backdrop-blur-sm">
              {i === 0 && <img alt={item.alt} className="w-full h-full object-cover rounded-2xl" src="https://images.unsplash.com/photo-1652116634347-0628306a0aa5" />}
              {i === 1 && <img alt={item.alt} className="w-full h-full object-cover rounded-2xl" src="https://images.unsplash.com/photo-1673526475171-753a32e74535" />}
              {i === 2 && <img alt={item.alt} className="w-full h-full object-cover rounded-2xl" src="https://images.unsplash.com/photo-1581372256755-d4ebf5701966" />}
              {i === 3 && <img alt={item.alt} className="w-full h-full object-cover rounded-2xl" src="https://images.unsplash.com/photo-1600932890180-cc03f766099d" />}
              {i === 4 && <img alt={item.alt} className="w-full h-full object-cover rounded-2xl" src="https://images.unsplash.com/photo-1634640154695-65933c89a704" />}
              {i === 5 && <img alt={item.alt} className="w-full h-full object-cover rounded-2xl" src="https://images.unsplash.com/photo-1588836059243-9afca1d1eb6b" />}
            </div>
          </motion.div>)}
      </div>
      <Button onClick={handlePrev} variant="outline" size="icon" className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white/10 border-white/20 rounded-full w-12 h-12 hover:bg-white/20">
        <ArrowLeft className="w-6 h-6" />
      </Button>
      <Button onClick={handleNext} variant="outline" size="icon" className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white/10 border-white/20 rounded-full w-12 h-12 hover:bg-white/20">
        <ArrowRight className="w-6 h-6" />
      </Button>
    </div>;
};
const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeWorkCategory, setActiveWorkCategory] = useState('Utilities');
  const aboutRef = useRef(null);
  const whatIsRef = useRef(null);
  const tokenRef = useRef(null);
  const reasonsRef = useRef(null);
  const latestWorksRef = useRef(null);
  const ctaRef = useRef(null);
  const navLinks = [{
    name: 'About',
    ref: aboutRef
  }, {
    name: 'What is ArtsiAI',
    ref: whatIsRef
  }, {
    name: 'Token',
    ref: tokenRef
  }, {
    name: 'Why Us',
    ref: reasonsRef
  }, {
    name: 'Works',
    ref: latestWorksRef
  }, {
    name: 'Docs',
    href: 'https://docs.artsiai.art'
  }, {
    name: 'Community',
    ref: ctaRef
  }];
  const scrollTo = ref => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setIsMenuOpen(false);
  };
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  const carouselItems = [{
    id: 1,
    alt: 'Futuristic AI generated portrait',
    description: 'A stunning futuristic portrait of a cyborg with neon highlights'
  }, {
    id: 2,
    alt: 'Surreal AI generated architecture',
    description: 'Impossible architecture floating in a dreamlike sky'
  }, {
    id: 3,
    alt: 'Colorful AI generated landscape',
    description: 'A vibrant, alien landscape with glowing plants and two moons'
  }, {
    id: 4,
    alt: 'Cyberpunk city AI artwork',
    description: 'A rainy cyberpunk city street with holographic ads'
  }, {
    id: 5,
    alt: 'AI art of a cosmic scene',
    description: 'A swirling nebula giving birth to a star'
  }, {
    id: 6,
    alt: 'AI generated underwater world',
    description: 'A fantasy underwater kingdom with bioluminescent creatures'
  }];
  const reasons = [{
    icon: Zap,
    title: "Fast & Seamless",
    description: "Generate art and mint NFTs in seconds with our optimized, user-friendly platform."
  }, {
    icon: ShieldCheck,
    title: "Secure & Verifiable",
    description: "Every creation is a secure, verifiable asset on the Ethereum blockchain, giving you true ownership."
  }, {
    icon: Heart,
    title: "Vibrant Community",
    description: "Join a growing ecosystem of artists and collectors to share, trade, and collaborate."
  }];
  const tokenFeatures = [{
    icon: Gift,
    title: "Staking Rewards",
    description: "Lock your $ARTSI tokens to earn passive rewards and exclusive NFT airdrops from featured artists."
  }, {
    icon: Vote,
    title: "Governance",
    description: "Participate in key platform decisions by voting with your $ARTSI tokens. Shape the future of ArtsiAI."
  }, {
    icon: Store,
    title: "Marketplace Fees",
    description: "Enjoy reduced transaction fees on our NFT marketplace when you pay with $ARTSI tokens."
  }];
  const workCategories = ['Utilities', 'Community', 'Development', 'Marketing', 'Events'];
  const socialLinks = {
    telegram: 'https://t.me/Artsi_ai',
    x: 'https://x.com/ArtsiAI',
    discord: 'https://discord.gg/B7ay4jcf',
    github: 'https://github.com/ArtsiAI-Labs'
  };
  const Sparkle = ({
    top,
    left,
    delay
  }) => <motion.div className="sparkle" style={{
    top,
    left
  }} initial={{
    scale: 0,
    opacity: 0
  }} animate={{
    scale: [0, 1.2, 0.8, 1],
    opacity: [0, 1, 1, 0]
  }} transition={{
    duration: 1.5,
    repeat: Infinity,
    repeatDelay: 3,
    ease: 'easeInOut',
    delay
  }} />;
  return <>
      <Helmet>
        <title>ArtsiAI – Create. Mint. Collect.</title>
        <meta name="description" content="Generate AI art, mint NFTs, and trade them on the Ethereum blockchain with ArtsiAI - the future of digital art creation." />
      </Helmet>

      <div className="relative overflow-hidden text-white min-h-screen bg-[#020102]">
        <div className="bg-pattern"></div>
        <Sparkle top="10%" left="15%" delay={0} />
        <Sparkle top="25%" left="80%" delay={1} />
        <Sparkle top="70%" left="10%" delay={2} />
        <Sparkle top="85%" left="90%" delay={0.5} />


        <header className="fixed top-0 left-0 right-0 z-50 p-4">
          <nav className="container mx-auto flex items-center justify-between p-2 px-4 md:px-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })}>
              <img src="https://horizons-cdn.hostinger.com/c5766eea-0506-44aa-956b-97b153f1895f/f2b3e0317432040a62fdb69ab90e7915.png" alt="ArtsiAI Logo" className="w-10 h-10 object-contain" />
              <span className="hidden sm:block text-2xl font-bold">ArtsiAI</span>
            </div>
            <div className="hidden lg:flex items-center gap-6 bg-black/20 backdrop-blur-md rounded-full py-2 px-8 border border-white/10">
                {navLinks.map(link => link.href ? <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors text-base p-0 h-auto">{link.name}</a> : <Button key={link.name} variant="link" onClick={() => scrollTo(link.ref)} className="text-white/80 hover:text-white transition-colors text-base p-0 h-auto">{link.name}</Button>)}
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/auth')} className="text-white/80 hover:text-white rounded-full">Sign In</Button>
              <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-[#d53bff] to-[#5124ff] text-white font-semibold rounded-full hover:opacity-90 transition-opacity px-6">Get Started Now</Button>
            </div>
            <div className="lg:hidden">
              <Button onClick={() => setIsMenuOpen(true)} variant="ghost" size="icon" className="text-white rounded-full bg-white/10">
                <Menu />
              </Button>
            </div>
          </nav>
        </header>

        <AnimatePresence>
          {isMenuOpen && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] lg:hidden">
              <div className="container mx-auto h-full flex flex-col p-4">
                <div className="flex justify-between items-center mb-16">
                   <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })}>
                    <img src="https://horizons-cdn.hostinger.com/c5766eea-0506-44aa-956b-97b153f1895f/f2b3e0317432040a62fdb69ab90e7915.png" alt="ArtsiAI Logo" className="w-10 h-10 object-contain" />
                    <span className="text-2xl font-bold">ArtsiAI</span>
                  </div>
                  <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="icon" className="text-white rounded-full bg-white/10">
                    <X />
                  </Button>
                </div>
                <nav className="flex flex-col items-center gap-8 text-center">
                  {navLinks.map(link => link.href ? <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-white text-2xl font-bold hover:text-purple-400 transition-colors py-2">{link.name}</a> : <Button key={link.name} variant="link" onClick={() => scrollTo(link.ref)} className="text-white text-2xl font-bold hover:text-purple-400 transition-colors py-2">{link.name}</Button>)}
                </nav>
                <div className="mt-auto flex flex-col gap-4">
                  <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-[#d53bff] to-[#5124ff] text-white font-semibold rounded-full w-full py-6 text-lg">Get Started Now</Button>
                  <Button variant="ghost" onClick={() => navigate('/auth')} className="text-white/80 hover:text-white bg-white/10 rounded-full w-full py-6 text-lg">Sign In</Button>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>

        <main className="relative z-10 pt-32">
          {/* Hero */}
          <section id="hero" className="container mx-auto px-4 py-16 text-center">
            <Button variant="outline" className="rounded-full bg-white/5 border-purple-500/50 text-purple-300 mb-6 hover:bg-white/10 hover:text-purple-300">Infinite Possibilities</Button>
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-4xl md:text-6xl font-bold text-white/90">Create. Mint. Collect. With</motion.h1>
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="text-4xl md:text-6xl font-bold gradient-text-purple my-4">ArtsiAI</motion.h1>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="max-w-xl mx-auto text-white/60 text-lg mb-12">Join the AI Art Revolution – Start Creating Today</motion.p>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }}>
              <Carousel items={carouselItems} />
            </motion.div>
             <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.8
          }} className="flex items-center justify-center gap-4 mt-8">
                <div className="flex -space-x-4">
                    <img className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover" alt="User avatar 1" src="https://images.unsplash.com/photo-1633887091219-265c29eac4cd" />
                    <img className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover" alt="User avatar 2" src="https://images.unsplash.com/photo-1633887091219-265c29eac4cd" />
                    <img className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover" alt="User avatar 3" src="https://images.unsplash.com/photo-1552941405-4a38aaac8576" />
                </div>
                <div className="text-left">
                    <p className="font-bold text-lg text-white">100</p>
                    <p className="text-sm text-white/50">Community</p>
                </div>
             </motion.div>
          </section>

          {/* About Section */}
          <section id="about" ref={aboutRef} className="py-24 container mx-auto px-4 relative z-10">
             <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                <motion.div className="relative w-full h-[450px]" initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true,
              amount: 0.5
            }} transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}>
                  <img class="absolute top-0 left-0 w-2/3 h-2/3 object-cover rounded-3xl z-10 shadow-2xl" alt="AI art in a gallery setting" src="https://images.unsplash.com/photo-1688535867601-7f22aa74d88a" />
                  <img class="absolute bottom-0 right-0 w-3/4 h-3/4 object-cover rounded-3xl" alt="Close up of a digital sculpture" src="https://images.unsplash.com/photo-1692607520478-8f4645adca1a" />
                </motion.div>
                <motion.div className="text-left" initial={{
              opacity: 0,
              x: 50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true,
              amount: 0.5
            }} transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white/90">Find Modern Art on <br /><span className="gradient-text-purple">NFT Platforms</span></h2>
                  <p className="text-lg text-white/60 mb-4">
                    ArtsiAI is a pioneering platform where creativity meets blockchain technology. We empower artists and enthusiasts to generate unique, AI-driven artworks with a simple prompt. 
                  </p>
                  <p className="text-lg text-white/60">
                    Invest in creativity that stands the test of time, uniquely yours in the NFT space.
                  </p>
                </motion.div>
              </div>
          </section>

          {/* What is ArtsiAI */}
          <section id="what-is-artsiai" ref={whatIsRef} className="py-24 container mx-auto px-4 relative z-10">
             <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                <motion.div className="text-left" initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true,
              amount: 0.5
            }} transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white/90">What is <span className="gradient-text-purple">ArtsiAI?</span></h2>
                  <p className="text-lg text-white/60 mb-4">
                    ArtsiAI is the next-generation canvas. We've merged advanced artificial intelligence with the immutable power of the blockchain to create a decentralized ecosystem for digital art.
                  </p>
                  <p className="text-lg text-white/60 mb-6">
                    From a single text prompt, our AI models can generate breathtaking, one-of-a-kind artworks. These creations can then be instantly minted as NFTs on the Ethereum blockchain, securing your ownership and unlocking their true value.
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-white/80"><Cpu className="w-5 h-5 text-purple-400" /> AI Generation</div>
                    <div className="flex items-center gap-2 text-white/80"><Layers className="w-5 h-5 text-purple-400" /> NFT Minting</div>
                  </div>
                </motion.div>
                <motion.div className="relative w-full h-[450px]" initial={{
              opacity: 0,
              x: 50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true,
              amount: 0.5
            }} transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}>
                  <img class="absolute top-0 right-0 w-2/3 h-2/3 object-cover rounded-3xl z-10 shadow-2xl" alt="AI generating abstract patterns" src="https://images.unsplash.com/photo-1677442136019-21780ecad995" />
                  <img class="absolute bottom-0 left-0 w-3/4 h-3/4 object-cover rounded-3xl" alt="A person interacting with a futuristic UI" src="https://images.unsplash.com/photo-1683105255267-a644e6687dd4" />
                </motion.div>
              </div>
          </section>

          {/* $ARTSI Token */}
          <section id="token" ref={tokenRef} className="py-24 container mx-auto px-4">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            amount: 0.5
          }} className="text-4xl md:text-5xl font-bold text-center mb-6 text-white/90">
              The <span className="gradient-text-purple">$ARTSI</span> Token
            </motion.h2>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            amount: 0.5
          }} transition={{
            delay: 0.1
          }} className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-16">
              $ARTSI is the native utility token that powers the entire ArtsiAI ecosystem, unlocking a new level of engagement and rewards for our community.
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8">
                {tokenFeatures.map((feature, i) => <motion.div key={feature.title} className="reason-card text-center" initial={{
              opacity: 0,
              y: 50
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              amount: 0.5
            }} transition={{
              duration: 0.5,
              delay: i * 0.1
            }}>
                        <div className="w-16 h-16 bg-gradient-to-br from-[#d53bff] to-[#5124ff] rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white/90">{feature.title}</h3>
                        <p className="text-white/60">{feature.description}</p>
                    </motion.div>)}
            </div>
          </section>

          {/* Some Reason to Chose Us */}
          <section id="reasons" ref={reasonsRef} className="py-24 container mx-auto px-4">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            amount: 0.5
          }} className="text-4xl md:text-5xl font-bold text-center mb-16 text-white/90">
              Some Reasons to <span className="gradient-text-purple">Choose Us</span>
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
                {reasons.map((reason, i) => <motion.div key={reason.title} className="reason-card text-center" initial={{
              opacity: 0,
              y: 50
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              amount: 0.5
            }} transition={{
              duration: 0.5,
              delay: i * 0.1
            }}>
                        <div className="w-16 h-16 bg-gradient-to-br from-[#d53bff] to-[#5124ff] rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <reason.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white/90">{reason.title}</h3>
                        <p className="text-white/60">{reason.description}</p>
                    </motion.div>)}
            </div>
          </section>

          {/* Our Latest Works */}
          <section id="latest-works" ref={latestWorksRef} className="py-24 container mx-auto px-4">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            amount: 0.5
          }} className="text-4xl md:text-5xl font-bold text-center mb-8 text-white/90">
              Our Latest <span className="gradient-text-purple">Works</span>
            </motion.h2>
            <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
              {workCategories.map(category => <Button key={category} variant={activeWorkCategory === category ? 'default' : 'outline'} onClick={() => setActiveWorkCategory(category)} className={`rounded-full transition-all duration-300 ${activeWorkCategory === category ? 'bg-gradient-to-r from-[#d53bff] to-[#5124ff] border-transparent' : 'bg-white/5 border-purple-500/50 text-purple-300 hover:bg-white/10'}`}>
                  {category}
                </Button>)}
            </div>
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div key={activeWorkCategory} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -20
              }} transition={{
                duration: 0.3
              }}>
                  {activeWorkCategory === 'Utilities' && <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4 text-white/90">ArtsiAI Application Suite</h3>
                      <p className="text-white/60 mb-8 max-w-2xl mx-auto">Explore our core utilities: an AI Art Studio for creation and a decentralized Marketplace for trading.</p>
                      <a href="/studio" target="_blank" rel="noopener noreferrer" className="block nft-card p-4 max-w-3xl mx-auto">
                        <img className="w-full h-auto object-cover rounded-xl" alt="Screenshot of the ArtsiAI application" src="https://images.unsplash.com/photo-1700665653637-9d0c3487c650" />
                        <p className="mt-4 font-bold text-lg text-white">Launch App</p>
                      </a>
                    </div>}
                  {activeWorkCategory === 'Community' && <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                      <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" className="reason-card text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#d53bff] to-[#5124ff] rounded-2xl flex items-center justify-center mx-auto mb-6"><Twitter className="w-8 h-8 text-white" /></div>
                        <h3 className="text-2xl font-bold mb-3 text-white/90">X (Twitter)</h3>
                        <p className="text-white/60">Follow for announcements</p>
                      </a>
                      <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer" className="reason-card text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#d53bff] to-[#5124ff] rounded-2xl flex items-center justify-center mx-auto mb-6"><MessageCircle className="w-8 h-8 text-white" /></div>
                        <h3 className="text-2xl font-bold mb-3 text-white/90">Discord</h3>
                        <p className="text-white/60">Join the conversation</p>
                      </a>
                      <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="reason-card text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#d53bff] to-[#5124ff] rounded-2xl flex items-center justify-center mx-auto mb-6"><Send className="w-8 h-8 text-white" /></div>
                        <h3 className="text-2xl font-bold mb-3 text-white/90">Telegram</h3>
                        <p className="text-white/60">Get live updates</p>
                      </a>
                    </div>}
                  {activeWorkCategory === 'Development' && <div className="max-w-3xl mx-auto">
                      <div className="reason-card p-6 mb-4">
                        <p className="text-sm text-purple-400 mb-1">Version 1.2.0 - {new Date(new Date().setDate(new Date().getDate() - 2)).toLocaleDateString()}</p>
                        <h3 className="text-xl font-bold text-white/90">Enhanced AI Model "Phoenix"</h3>
                        <p className="text-white/60 mt-2">Upgraded our core AI engine for faster generation and improved photorealism.</p>
                      </div>
                      <div className="reason-card p-6 mb-4">
                        <p className="text-sm text-purple-400 mb-1">Version 1.1.5 - {new Date(new Date().setDate(new Date().getDate() - 10)).toLocaleDateString()}</p>
                        <h3 className="text-xl font-bold text-white/90">Gasless Minting Feature</h3>
                        <p className="text-white/60 mt-2">Introduced an option for gas-free NFT minting for verified artists.</p>
                      </div>
                    </div>}
                  {activeWorkCategory === 'Marketing' && <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      <a href="#" className="reason-card">
                        <h3 className="text-xl font-bold text-white/90 mb-2">ArtsiAI featured on TechCrunch</h3>
                        <p className="text-white/60">Read about our journey in revolutionizing the digital art space.</p>
                        <p className="text-sm text-purple-400 mt-4">Press Release</p>
                      </a>
                      <a href="#" className="reason-card">
                        <h3 className="text-xl font-bold text-white/90 mb-2">The Philosophy of AI Art</h3>
                        <p className="text-white/60">Our latest blog post on the intersection of creativity and artificial intelligence.</p>
                        <p className="text-sm text-purple-400 mt-4">Blog Post</p>
                      </a>
                    </div>}
                  {activeWorkCategory === 'Events' && <div className="text-center reason-card max-w-md mx-auto">
                      <Calendar className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                      <h3 className="text-3xl font-bold text-white/90 mb-4">Coming Soon!</h3>
                      <p className="text-white/60">We're planning exciting community events, AMAs, and artist showcases. Stay tuned for announcements!</p>
                    </div>}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* CTA */}
          <section id="cta" ref={ctaRef} className="py-24">
            <div className="container mx-auto px-4 text-center">
              <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true,
              amount: 0.5
            }} transition={{
              duration: 0.8
            }} className="bg-gradient-to-r from-[#d53bff] to-[#5124ff] rounded-3xl p-12 md:p-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Join the Creative Revolution</h2>
                <p className="max-w-2xl mx-auto text-white/80 text-lg mb-8">Your next masterpiece is just a prompt away. Sign up and start exploring the limitless possibilities of AI art.</p>
                <Button size="lg" onClick={() => navigate('/auth')} className="bg-white text-black px-10 py-8 text-xl font-bold rounded-full hover:bg-gray-200">
                  Become a Creator
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="relative z-10 mt-20 border-t border-white/10">
          <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
               <img src="https://horizons-cdn.hostinger.com/c5766eea-0506-44aa-956b-97b153f1895f/f2b3e0317432040a62fdb69ab90e7915.png" alt="ArtsiAI Logo" className="w-8 h-8 object-contain" />
              <span className="text-lg font-bold">ArtsiAI</span>
            </div>
            <div className="flex gap-6 text-white/60">
              <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><MessageCircle className="w-6 h-6" /></a>
              <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Send className="w-6 h-6" /></a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-6 h-6" /></a>
              <a href="https://docs.artsiai.art" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><BookOpen className="w-6 h-6" /></a>
            </div>
            <p className="text-sm text-white/50">&copy; {new Date().getFullYear()} ArtsiAI. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>;
};
export default LandingPage;
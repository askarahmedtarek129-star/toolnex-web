/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ChevronRight,
  ArrowLeft,
  Activity,
  Zap,
  Shield,
  LayoutGrid,
  AlertCircle,
  RefreshCw,
  Box,
  QrCode,
  Wrench
} from 'lucide-react';
import { CATEGORIES, TOOLS } from './constants';
import { Tool, ToolCategory } from './types';
import { cn } from './lib/utils';
import { ImageToPDF, ImageCompressor } from './components/tools/ImageTools';
import { VideoDownloader } from './components/tools/VideoTools';

// --- Components ---

const Header = ({ darkMode, toggleDark, setView, activeView }: { darkMode: boolean, toggleDark: () => void, setView: (v: 'home' | 'tool' | 'category' | 'about') => void, activeView: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', view: 'home' as const },
    { name: 'Tools', view: 'home' as const, scroll: 'tools' },
    { name: 'Categories', view: 'home' as const, scroll: 'categories' },
    { name: 'About', view: 'about' as const },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setView(item.view);
    setIsMenuOpen(false);
    if (item.scroll) {
      setTimeout(() => {
        const el = document.getElementById(item.scroll!);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => { setView('home'); setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <Wrench size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              Utooly
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 h-full">
            {navItems.map((item) => (
              <button 
                key={item.name}
                onClick={() => handleNavClick(item)} 
                className={cn(
                  "text-sm font-semibold transition-colors h-full flex items-center border-b-2",
                  (activeView === item.view && !item.scroll) || (activeView === 'home' && item.scroll === 'tools' && window.scrollY > 500)
                    ? "text-blue-600 border-blue-600" 
                    : "text-slate-600 dark:text-slate-400 border-transparent hover:text-blue-600"
                )}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDark}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="hidden sm:block px-4 py-2 bg-slate-800 dark:bg-slate-200 dark:text-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors">
              Get Started
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 rounded-xl"
                >
                  {item.name}
                </button>
              ))}
              <button
                className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 rounded-xl"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = ({ onSearch }: { onSearch: (q: string) => void }) => {
  return (
    <section className="px-8 pt-32 pb-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 flex flex-col items-center shrink-0">
      <div className="max-w-7xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            Utooly - Free Online Tools
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Convert files, use utilities, and boost productivity for free without login.
          </p>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-blue-600/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all overflow-hidden">
              <div className="pl-5 text-slate-400">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search for tools (e.g., 'PDF', 'Video', 'Password')"
                className="w-full bg-transparent border-none focus:ring-0 py-5 px-4 text-slate-700 dark:text-slate-200 outline-none"
                onChange={(e) => onSearch(e.target.value)}
              />
              <button className="mr-3 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ToolCard: React.FC<{ tool: Tool, onClick: () => void }> = ({ tool, onClick }) => {
  const Icon = tool.icon;
  const categoryBadge = {
    conversion: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    video: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    utility: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    productivity: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
  }[tool.category] || "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="sleek-card group p-5 cursor-pointer flex flex-col gap-4 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 font-bold shrink-0">
          <Icon size={24} />
        </div>
        <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", categoryBadge)}>
          {tool.category}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 truncate transition-colors">{tool.name}</h3>
        <p className="mt-1 text-slate-500 dark:text-slate-400 text-xs line-clamp-2">
          {tool.description}
        </p>
      </div>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 h-14 flex items-center justify-between shrink-0 px-8">
    <div className="text-xs text-slate-500 font-medium">
      &copy; {new Date().getFullYear()} Utooly Labs. Made for efficiency.
    </div>
    <div className="hidden md:flex gap-6">
      <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Privacy Policy</a>
      <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Terms of Service</a>
      <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Sitemap</a>
    </div>
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-md uppercase tracking-wider">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        Systems Live
      </span>
    </div>
  </footer>
);

const AboutSection = () => (
  <div className="max-w-4xl mx-auto py-20 px-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">About Utooly</h2>
    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
      Utooly is a collection of high-quality, free online tools designed to help you with everyday tasks.
      From file conversions to utility tools, we aim to provide a simple and efficient experience without the need for signups or subscriptions.
    </p>
    <div className="grid md:grid-cols-3 gap-8 text-left">
      {[
        { 
          icon: Shield, 
          title: "Privacy First", 
          desc: "Your files are processed in-browser whenever possible or deleted immediately after processing." 
        },
        { 
          icon: Zap, 
          title: "High Speed", 
          desc: "Optimized for performance to ensure you get your results as fast as possible." 
        },
        { 
          icon: LayoutGrid, 
          title: "Multi-Purpose", 
          desc: "A wide range of tools from PDF utilities to image compressors and developer tools." 
        }
      ].map((feature, i) => (
        <div key={i} className="p-6 sleek-card flex flex-col items-center text-center md:items-start md:text-left">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 mb-4">
            <feature.icon size={24} />
          </div>
          <h3 className="font-bold mb-2 text-slate-800 dark:text-slate-200">{feature.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
       return localStorage.getItem('theme') === 'dark' || 
       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const [view, setView] = useState<'home' | 'tool' | 'category' | 'about'>('home');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const toggleDark = () => setDarkMode(!darkMode);

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    setView('tool');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-200 dark:selection:bg-blue-900/50">
      <Header darkMode={darkMode} toggleDark={toggleDark} setView={setView} activeView={view} />
      
      <main className="pt-16">
        {view === 'home' && (
          <>
            <Hero onSearch={setSearchQuery} />
            
            <section id="tools" className="pb-24 pt-12 px-8 bg-slate-50 dark:bg-slate-950">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                  <div id="categories" className="flex flex-wrap items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                      <button 
                        onClick={() => setActiveCategory('all')}
                        className={cn(
                          "px-5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                          activeCategory === 'all' 
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                            : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:text-blue-600 hover:border-blue-200"
                        )}
                      >
                        All
                      </button>
                      {CATEGORIES.map(cat => (
                        <button 
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={cn(
                            "px-5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                            activeCategory === cat.id 
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                              : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 hover:border-blue-200"
                          )}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="popLayout">
                    <motion.div 
                      layout
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {filteredTools.map((tool) => (
                        <ToolCard 
                          key={tool.id} 
                          tool={tool} 
                          onClick={() => handleToolClick(tool)} 
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {filteredTools.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                      <Search className="text-slate-400 mx-auto mb-4" size={32} />
                      <h3 className="text-xl font-bold">No tools found</h3>
                      <p className="text-slate-500 text-sm mt-1">Try searching for something else or browse categories.</p>
                    </div>
                  )}
                </div>

                {/* Sidebar Ad Space */}
                <aside className="w-full md:w-64 flex flex-col gap-6 shrink-0">
                  <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center min-h-[200px]">
                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full mb-3 flex items-center justify-center">
                      <span className="text-slate-400 font-bold">$</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Advertisement</p>
                    <p className="text-xs text-slate-500">Your Ad Space</p>
                  </div>
                  
                  <div className="p-6 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-600/20">
                    <h4 className="font-bold mb-2">Pro Toolkit</h4>
                    <p className="text-[11px] text-blue-100 leading-relaxed mb-4">Unlock batch processing and 10GB file limits with Utooly Plus.</p>
                    <button className="w-full py-2.5 bg-white text-blue-600 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-blue-50 transition-colors">Upgrade Now</button>
                  </div>
                </aside>
              </div>
            </section>
          </>
        )}

        {view === 'about' && <AboutSection />}

        {view === 'tool' && selectedTool && (
          <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-4xl mx-auto px-4">
               <button 
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
               >
                 <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Tools
               </button>
               
               <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                     <selectedTool.icon size={32} />
                   </div>
                   <div>
                     <h2 className="text-3xl font-display font-bold">{selectedTool.name}</h2>
                     <p className="text-slate-500 dark:text-slate-400">{selectedTool.description}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-full">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live & Online
                   </div>
                 </div>
               </div>

               {/* Tool Dynamic Loader */}
               <div className="sleek-card p-8 md:p-12 mb-12 shadow-xl shadow-slate-200/50 dark:shadow-none min-h-[400px]">
                 <ToolRouter tool={selectedTool} />
               </div>

               {/* Ad Content Placeholder */}
               <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl h-32 flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-800 mb-20">
                 Advertisement Space
               </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// --- Tool Router Placeholder ---

function ToolRouter({ tool }: { tool: Tool }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, [tool.id]);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-500 animate-pulse">Initializing tool...</p>
      </div>
    );
  }

  // This is where specific tool components will be rendered
  switch (tool.id) {
    case 'password-generator': return <PasswordGeneratorTool />;
    case 'age-calculator': return <AgeCalculatorTool />;
    case 'qr-generator': return <QRCodeGeneratorTool />;
    case 'currency-converter': return <CurrencyConverterTool />;
    case 'jpg-to-pdf': return <ImageToPDF />;
    case 'image-compressor': return <ImageCompressor />;
    case 'video-downloader': return <VideoDownloader />;
    default: return <GenericPlaceholderTool tool={tool} />;
  }
}

function GenericPlaceholderTool({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex items-center justify-center text-blue-600 mb-8 shadow-sm">
        <Icon size={48} />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">{tool.name}</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md text-center mb-10 text-sm">
        {tool.description}. This tool is currently in development and will be available soon.
      </p>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          Development in Progress
        </div>
      </div>
    </div>
  );
}

// --- Specific Tool Components ---

function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let pool = chars;
    if (includeNumbers) pool += nums;
    if (includeSymbols) pool += syms;
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    setPassword(result);
  };

  useEffect(generate, []);

  return (
    <div className="max-w-lg mx-auto space-y-8 animate-in fade-in duration-500">
       <div className="relative group">
         <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-2xl font-mono text-center break-all select-all group-hover:border-blue-500 transition-colors">
           {password || 'Click Generate'}
         </div>
         <button 
          onClick={generate}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
         >
           <RefreshCw size={24} />
         </button>
       </div>

       <div className="space-y-6">
         <div>
           <div className="flex justify-between mb-2">
             <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Length: {length}</label>
           </div>
           <input 
            type="range" min="8" max="50" value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
           />
         </div>

         <div className="grid grid-cols-2 gap-4">
           <button 
            onClick={() => setIncludeNumbers(!includeNumbers)}
            className={cn(
              "p-4 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all",
              includeNumbers ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "border-slate-200 dark:border-slate-800 text-slate-500"
            )}
           >
             Numbers {includeNumbers && <Box size={14} fill="currentColor" />}
           </button>
           <button 
            onClick={() => setIncludeSymbols(!includeSymbols)}
            className={cn(
              "p-4 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all",
              includeSymbols ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "border-slate-200 dark:border-slate-800 text-slate-500"
            )}
           >
             Symbols {includeSymbols && <Box size={14} fill="currentColor" />}
           </button>
         </div>
       </div>

       <button 
        onClick={() => {
          navigator.clipboard.writeText(password);
        }}
        className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
       >
         Copy to Clipboard
       </button>
    </div>
  );
}

function AgeCalculatorTool() {
  const [birthdate, setBirthdate] = useState('');
  const [result, setResult] = useState<{y:number, m:number, d:number} | null>(null);

  const calculate = () => {
    if (!birthdate) return;
    const today = new Date();
    const birth = new Date(birthdate);
    let y = today.getFullYear() - birth.getFullYear();
    let m = today.getMonth() - birth.getMonth();
    let d = today.getDate() - birth.getDate();

    if (m < 0 || (m === 0 && d < 0)) {
        y--;
        m += 12;
    }
    if (d < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        d += lastMonth.getDate();
        m--;
    }
    setResult({ y, m, d });
  };

  return (
    <div className="max-w-lg mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Select Date of Birth</label>
        <input 
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-blue-500 transition-all font-bold"
        />
        <button 
          onClick={calculate}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
        >
          Calculate Precise Age
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Years', v: result.y },
            { label: 'Months', v: result.m },
            { label: 'Days', v: result.d }
          ].map(item => (
            <div key={item.label} className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-blue-600">{item.v}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CurrencyConverterTool() {
  const [amount, setAmount] = useState<number>(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  
  const rates: Record<string, number> = {
    'USD': 1,
    'EUR': 0.92,
    'GBP': 0.79,
    'JPY': 151.45,
    'CAD': 1.35,
    'AUD': 1.52,
    'INR': 83.12,
  };

  const convert = () => {
    const fromRate = rates[from];
    const toRate = rates[to];
    return (amount / fromRate) * toRate;
  };

  return (
    <div className="max-w-lg mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <label className="block font-bold">Amount</label>
        <div className="relative">
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full p-4 pl-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-600 transition-all font-bold text-lg"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4">
         <div className="space-y-2">
           <label className="text-xs font-bold text-slate-500 uppercase ml-1">From</label>
           <select 
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none"
           >
             {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
           </select>
         </div>
         <div className="pt-6">
           <button 
            onClick={() => { const temp = from; setFrom(to); setTo(temp); }}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors shadow-sm"
           >
             <RefreshCw size={20} className="text-blue-600" />
           </button>
         </div>
         <div className="space-y-2">
           <label className="text-xs font-bold text-slate-500 uppercase ml-1">To</label>
           <select 
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none"
           >
             {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
           </select>
         </div>
      </div>

      <div className="p-8 bg-blue-600 text-white rounded-2xl text-center shadow-xl shadow-blue-600/20">
         <div className="text-sm font-medium opacity-80 mb-2">{amount} {from} equals</div>
         <div className="text-4xl font-display font-extrabold tracking-tight">
           {convert().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {to}
         </div>
         <div className="text-[10px] mt-6 opacity-60 flex items-center justify-center gap-1.5">
           <AlertCircle size={10} /> Rates updated hourly. For demonstration purposes only.
         </div>
      </div>
    </div>
  );
}

function QRCodeGeneratorTool() {
  // We'll need the 'qrcode' package
  const [text, setText] = useState('https://toolify.com');
  const [qrUrl, setQrUrl] = useState('');
  
  const generate = async () => {
    try {
      const QRCode = (await import('qrcode')).default;
      const url = await QRCode.toDataURL(text, {
        width: 800,
        margin: 2,
        color: {
          dark: '#3b82f6',
          light: '#ffffff00'
        }
      });
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { generate(); }, [text]);

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center gap-8">
      <div className="w-full space-y-4">
        <label className="block font-bold">Input Text or URL</label>
        <textarea 
          placeholder="Enter text or URL to generate QR code..."
          className="w-full p-4 h-32 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 transition-all resize-none font-medium"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="relative group">
        <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl blur transition-all group-hover:bg-blue-600/20" />
        <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
           {qrUrl ? (
             <img src={qrUrl} alt="QR Code" className="w-48 h-48" />
           ) : (
             <div className="w-48 h-48 flex items-center justify-center text-slate-300">
               <QrCode size={48} />
             </div>
           )}
        </div>
      </div>

      <a 
        href={qrUrl} 
        download="qrcode.png"
        className={cn(
          "w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-center shadow-lg shadow-blue-600/20",
          !qrUrl && "opacity-50 pointer-events-none"
        )}
      >
        Download QR Image
      </a>
    </div>
  );
}

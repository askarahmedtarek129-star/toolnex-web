/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Download, 
  Youtube, 
  Instagram, 
  Music, 
  Video, 
  Link, 
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function VideoDownloader() {
  const [url, setUrl] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url) return;
    setIsQuerying(true);
    setShowResult(false);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      setIsQuerying(false);
      setShowResult(true);
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsQuerying(false);
      alert("Failed to analyze the link. Please try again.");
    }
  };

  const handleDownload = (formatId: string, formatName: string) => {
    setDownloading(formatName);
    
    // Trigger download via backend
    setTimeout(() => {
      setDownloading(null);
      window.location.href = `/api/download?id=${formatId}`;
    }, 1500);
  };

  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-900 rounded-sm blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
          <div className="relative flex items-center bg-neutral-900 border border-white/10 rounded-sm overflow-hidden transition-all focus-within:border-amber-500/50">
            <Link className="ml-6 text-neutral-600 shrink-0" size={20} />
            <input 
              type="text" 
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-transparent border-none focus:ring-0 py-6 px-6 outline-none text-neutral-100 font-mono text-sm placeholder:text-neutral-700"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <button 
              onClick={handleAnalyze}
              disabled={isQuerying || !url}
              className="px-8 py-6 bg-amber-500 text-black font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-amber-400 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-3 shrink-0"
            >
              {isQuerying ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  Analyzing
                </>
              ) : (
                "Analyze Source"
              )}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {showResult && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
          >
             {/* Preview Thumbnail */}
             <div className="md:col-span-4 relative group">
                <div className="aspect-video bg-neutral-900 border border-white/10 overflow-hidden relative group-hover:border-amber-500/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] uppercase font-bold text-amber-500 tracking-[0.2em] mb-1">Now Previewing</span>
                    <p className="text-sm font-medium leading-tight truncate uppercase tracking-tight text-white mb-2">Amazing Nature Highlights 2024</p>
                    <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-mono">
                      <span>DOC-2024-EXTRACT</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span>16:9</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 text-[10px] font-mono border border-white/10 backdrop-blur-sm text-amber-500">
                    10:04
                  </div>
                </div>
             </div>

             {/* Action Grid */}
             <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleDownload('video_hi', 'MP4 Video')}
                  disabled={!!downloading}
                  className="p-8 bg-neutral-900 border border-white/10 flex flex-col justify-between h-48 group hover:border-amber-500 transition-all text-left disabled:opacity-50"
                >
                   <div>
                     <div className="flex justify-between items-start mb-4">
                       <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-400 transition-colors">MP4 Video</span>
                       <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-sm">1080P FHD</span>
                     </div>
                     <h3 className="text-3xl font-serif italic text-white group-hover:text-amber-50 transition-colors">High Fidelity</h3>
                     <p className="text-[10px] font-mono text-neutral-600 mt-4 uppercase tracking-widest">24.5 MB • 60 FPS • H.264</p>
                   </div>
                   <div className="flex items-center justify-between mt-auto">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 group-hover:text-white transition-colors">
                       {downloading === 'MP4 Video' ? 'Processing...' : 'Initiate Download →'}
                     </span>
                     {downloading === 'MP4 Video' && <Loader2 className="animate-spin text-amber-500" size={14} />}
                   </div>
                </button>

                <button 
                  onClick={() => handleDownload('audio_hi', 'MP3 Audio')}
                  disabled={!!downloading}
                  className="p-8 bg-neutral-900 border border-white/10 flex flex-col justify-between h-48 group hover:border-amber-500 transition-all text-left disabled:opacity-50"
                >
                   <div>
                     <div className="flex justify-between items-start mb-4">
                       <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-400 transition-colors">M4A Audio</span>
                       <span className="text-[10px] font-mono text-neutral-500 bg-white/5 px-2 py-0.5 rounded-sm">320 KBPS</span>
                     </div>
                     <h3 className="text-3xl font-serif italic text-white group-hover:text-amber-50 transition-colors">Pure Sonic</h3>
                     <p className="text-[10px] font-mono text-neutral-600 mt-4 uppercase tracking-widest">4.2 MB • Stereo • 48 kHz</p>
                   </div>
                   <div className="flex items-center justify-between mt-auto">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors">
                       {downloading === 'MP3 Audio' ? 'Extracting...' : 'Extract Audio →'}
                     </span>
                     {downloading === 'MP3 Audio' && <Loader2 className="animate-spin text-amber-500" size={14} />}
                   </div>
                </button>
             </div>

             <div className="md:col-span-12 flex items-center gap-3 p-4 bg-amber-500/5 rounded-sm text-neutral-500 text-[10px] font-mono uppercase tracking-widest border border-amber-500/10">
               <AlertCircle size={14} className="shrink-0 text-amber-600" />
               <p>Tunnel established. Request will be streamed via encrypted channel.</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div className="space-y-4">
          <h5 className="text-xs font-bold flex items-center gap-2 text-white uppercase tracking-[0.2em]">
            <Lock size={14} className="text-amber-500" /> 
            Anonymous Procurement
          </h5>
          <p className="text-sm text-neutral-500 leading-relaxed font-light">
            Each request is routed through a series of transient proxies, ensuring your digital footprint remains invisible. We extract metadata directly from source servers without storing identifying information.
          </p>
        </div>
        <div className="flex flex-col justify-end md:items-end">
          <button className="flex items-center gap-3 text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] group hover:text-amber-400 transition-colors">
            Protocols & Encryption <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

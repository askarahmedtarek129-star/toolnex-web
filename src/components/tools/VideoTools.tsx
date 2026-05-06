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
  ArrowRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function VideoDownloader() {
  const [url, setUrl] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = () => {
    if (!url) return;
    setIsQuerying(true);
    // Simulate API delay
    setTimeout(() => {
      setIsQuerying(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        <label className="block text-center font-display font-bold text-2xl">
          Paste video link below
        </label>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-blue-400 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition" />
          <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2">
            <Link className="ml-4 text-slate-400 shrink-0" size={20} />
            <input 
              type="text" 
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-transparent border-none focus:ring-0 py-4 px-4 outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button 
              onClick={handleAnalyze}
              disabled={isQuerying || !url}
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all disabled:opacity-50 shadow-lg shadow-primary-600/10"
            >
              {isQuerying ? "Analyzing..." : "Download"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 pt-4 grayscale opacity-60">
           <div className="flex items-center gap-2 text-sm font-medium"><Youtube className="text-red-600" size={18} /> YouTube</div>
           <div className="flex items-center gap-2 text-sm font-medium"><Instagram className="text-pink-600" size={18} /> Instagram</div>
           <div className="flex items-center gap-2 text-sm font-medium"><Video className="text-blue-500" size={18} /> TikTok</div>
           <div className="flex items-center gap-2 text-sm font-medium"><Music className="text-slate-900 dark:text-white" size={18} /> Audio</div>
        </div>
      </div>

      {showResult && (
        <div className="glass-card rounded-[2rem] p-8 border-2 border-primary-100 dark:border-primary-900/30 space-y-8">
           <div className="flex flex-col md:flex-row gap-8">
             <div className="w-full md:w-48 aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden group">
                <Video className="text-slate-400" size={32} />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Download className="text-white" size={24} />
                </div>
             </div>
             <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-primary-600 uppercase">
                  <CheckCircle2 size={12} /> Video Found
                </div>
                <h4 className="text-xl font-bold">Awesome Video Content Title</h4>
                <p className="text-sm text-slate-500">Duration: 04:20 • Quality: 1080p Full HD</p>
             </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between hover:border-primary-600 transition-colors cursor-pointer group">
                 <div>
                   <span className="block font-bold">MP4 Video</span>
                   <span className="text-xs text-slate-500">High Quality (1080p) • 24.5 MB</span>
                 </div>
                 <Download size={20} className="text-slate-400 group-hover:text-primary-600" />
              </div>
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between hover:border-primary-600 transition-colors cursor-pointer group">
                 <div>
                   <span className="block font-bold">MP3 Audio</span>
                   <span className="text-xs text-slate-500">Highest Quality (320kbps) • 4.2 MB</span>
                 </div>
                 <Download size={20} className="text-slate-400 group-hover:text-primary-600" />
              </div>
           </div>

           <div className="flex items-center gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-700 dark:text-primary-300 text-sm">
             <AlertCircle size={18} className="shrink-0" />
             <p>This is a functional demo of the Downloader UI. Actual API connection requires server-side processing.</p>
           </div>
        </div>
      )}

      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl space-y-4">
        <h5 className="font-bold flex items-center gap-2">
          <Lock size={18} className="text-primary-600" /> 
          Safe, Anonymous and Secure
        </h5>
        <p className="text-sm text-slate-500 leading-relaxed">
          We don't track your downloads or store your data. Our platform anonymously fetches data from the social platforms and streams it directly to your device.
        </p>
        <button className="flex items-center gap-2 text-primary-600 text-sm font-bold group">
          Learn more about our technology <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

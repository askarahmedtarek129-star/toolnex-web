/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, Download, X, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { cn } from '../../lib/utils';
import confetti from 'canvas-confetti';

export function ImageToPDF() {
  const [images, setImages] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] }
  });

  const removeFile = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    
    try {
      const pdf = new jsPDF();
      
      for (let i = 0; i < images.length; i++) {
        const imgData = await fileToDataUrl(images[i]);
        const props = pdf.getImageProperties(imgData);
        const width = pdf.internal.pageSize.getWidth();
        const height = (props.height * width) / props.width;
        
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
      }
      
      pdf.save('utooly-converted.pdf');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#60a5fa', '#93c5fd']
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div 
        {...getRootProps()} 
        className={cn(
          "relative border-2 border-dashed rounded-3xl p-12 transition-all cursor-pointer text-center",
          isDragActive ? "border-primary-600 bg-primary-50 dark:bg-primary-900/10" : "border-slate-200 dark:border-slate-800 hover:border-primary-400"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600">
            <Upload size={32} />
          </div>
          <div>
            <p className="text-xl font-bold">Drag & drop images here</p>
            <p className="text-slate-500 mt-1">Supports JPG, PNG, up to 10MB per file</p>
          </div>
          <button className="px-6 py-2 bg-primary-600 text-white rounded-xl font-bold mt-2">
            Select Photos
          </button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold">Selected Files ({images.length})</h4>
            <button 
              onClick={() => setImages([])} 
              className="text-sm text-red-500 font-bold hover:underline"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((file, idx) => (
              <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="preview" 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => removeFile(idx)}
                  className="absolute top-2 right-2 p-1 bg-white/90 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <button 
            disabled={isProcessing}
            onClick={generatePDF}
            className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary-600/20 disabled:opacity-50"
          >
            {isProcessing ? (
               <>
                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                 Processing...
               </>
            ) : (
              <>
                 <FileImage size={20} /> Convert to PDF
              </>
            )}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex gap-3">
          <ShieldCheck className="text-green-500 shrink-0" size={20} />
          <div>
            <h5 className="text-sm font-bold">Privacy Guaranteed</h5>
            <p className="text-xs text-slate-500">Your files never leave your browser.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Zap className="text-blue-500 shrink-0" size={20} />
          <div>
            <h5 className="text-sm font-bold">Lightning Fast</h5>
            <p className="text-xs text-slate-500">Processed locally on your device.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <CheckCircle2 className="text-purple-500 shrink-0" size={20} />
          <div>
            <h5 className="text-sm font-bold">High Quality</h5>
            <p className="text-xs text-slate-500">Full resolution output preserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setCompressedUrl(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] }
  });

  const compress = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise(resolve => img.onload = resolve);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      
      const blob = await new Promise<Blob | null>(resolve => 
        canvas.toBlob(resolve, 'image/jpeg', quality)
      );
      
      if (blob) {
        setCompressedUrl(URL.createObjectURL(blob));
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in duration-500">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={cn(
            "relative border-2 border-dashed rounded-3xl p-20 transition-all cursor-pointer text-center",
            isDragActive ? "border-primary-600 bg-primary-50 dark:bg-primary-900/10" : "border-slate-200 dark:border-slate-800 hover:border-primary-400"
          )}
        >
          <input {...getInputProps()} />
          <Upload size={48} className="mx-auto mb-6 text-slate-300" />
          <h3 className="text-xl font-bold">Drop your image here</h3>
          <p className="text-slate-500 mt-2">Single JPG or PNG up to 20MB</p>
        </div>
      ) : (
        <div className="space-y-8">
           <div className="p-6 bg-slate-50 dark:bg-slate-800 border rounded-3xl flex items-center gap-6">
              <img src={URL.createObjectURL(file)} className="w-24 h-24 object-cover rounded-xl" alt="source" />
              <div className="flex-1">
                <p className="font-bold truncate max-w-[200px]">{file.name}</p>
                <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button 
                onClick={() => setFile(null)}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg"
              >
                <X size={20} />
              </button>
           </div>

           <div className="space-y-4">
             <div className="flex justify-between items-center">
               <label className="font-bold text-sm">Compression Level: {Math.round(quality * 100)}%</label>
               <span className="text-xs text-slate-400">Lower quality = smaller file</span>
             </div>
             <input 
              type="range" min="0.1" max="1" step="0.1" value={quality} 
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none accent-primary-600"
             />
           </div>

           {compressedUrl ? (
             <div className="p-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-3xl text-center space-y-6">
                <CheckCircle2 size={48} className="mx-auto text-green-500" />
                <div>
                  <h4 className="text-xl font-bold text-green-700 dark:text-green-400">Compression Complete!</h4>
                  <p className="text-sm text-green-600/80">Your file is ready for download.</p>
                </div>
                <a 
                  href={compressedUrl}
                  download={`compressed-${file.name}`}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-xl shadow-green-600/20"
                >
                  <Download size={20} /> Download Compressed
                </a>
             </div>
           ) : (
             <button 
                onClick={compress}
                disabled={isProcessing}
                className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/15 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Start Compression"}
              </button>
           )}
        </div>
      )}
    </div>
  );
}

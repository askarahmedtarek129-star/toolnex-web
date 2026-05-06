/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  FileText, 
  Image, 
  FileVideo, 
  Settings, 
  Hash, 
  Calendar, 
  Lock, 
  RefreshCw, 
  QrCode, 
  Download,
  Box,
  FileJson,
  Type,
  Maximize,
  Minimize
} from 'lucide-react';
import { Tool, Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'conversion',
    name: 'File Conversion',
    description: 'Convert between PDF, Word, and Images effortlessly.',
    icon: FileText
  },
  {
    id: 'video',
    name: 'Video Tools',
    description: 'Download and convert videos from popular platforms.',
    icon: FileVideo
  },
  {
    id: 'utility',
    name: 'Utility Tools',
    description: 'Quick utilities for daily productivity.',
    icon: Settings
  }
];

export const TOOLS: Tool[] = [
  // Conversion Tools
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Convert PDF pages into high-quality JPG images.',
    icon: Image,
    category: 'conversion',
    slug: 'pdf-to-jpg'
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert images to a single PDF document.',
    icon: FileText,
    category: 'conversion',
    slug: 'jpg-to-pdf'
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Easily turn Word documents into PDF files.',
    icon: FileText,
    category: 'conversion',
    slug: 'word-to-pdf'
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Extract text from PDFs back into Word documents.',
    icon: FileText,
    category: 'conversion',
    slug: 'pdf-to-word'
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce image size without losing quality.',
    icon: Minimize,
    category: 'conversion',
    slug: 'image-compressor'
  },
  // Video Tools
  {
    id: 'video-downloader',
    name: 'Video Downloader',
    description: 'Download videos from YouTube, Instagram, and more.',
    icon: Download,
    category: 'video',
    slug: 'video-downloader'
  },
  {
    id: 'video-to-audio',
    name: 'Video to Audio',
    description: 'Extract high-quality audio from video files.',
    icon: FileVideo,
    category: 'video',
    slug: 'video-to-audio'
  },
  // Utility Tools
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    icon: Calendar,
    category: 'utility',
    slug: 'age-calculator'
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, secure passwords instantly.',
    icon: Lock,
    category: 'utility',
    slug: 'password-generator'
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between world currencies with live rates.',
    icon: RefreshCw,
    category: 'utility',
    slug: 'currency-converter'
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Create customs QR codes for links, text, or Wi-Fi.',
    icon: QrCode,
    category: 'utility',
    slug: 'qr-generator'
  }
];

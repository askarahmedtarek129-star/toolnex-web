/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LucideIcon } from 'lucide-react';

export type ToolCategory = 'conversion' | 'video' | 'utility' | 'productivity';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
  slug: string;
}

export interface Category {
  id: ToolCategory;
  name: string;
  description: string;
  icon: LucideIcon;
}

import { TagColor } from "./board";


export const TAG_COLORS: Record<TagColor, { fg: string; bg: string }> = {
  blue: { fg: '#4F6EF0', bg: '#EAEEFD' },
  purple: { fg: '#8B5CF6', bg: '#F1EBFE' },
  orange: { fg: '#F59E0B', bg: '#FEF3E2' },
  green: { fg: '#1FA774', bg: '#E4F4EE' },
  pink: { fg: '#EF5E78', bg: '#FDECEF' },
  gray: { fg: '#94A3B8', bg: '#F2F4F6' },
};

export const PICKER_COLORS: TagColor[] = ['blue', 'purple', 'orange', 'green', 'pink'];